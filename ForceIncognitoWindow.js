#!/usr/bin/env osascript -l JavaScript

function run(args) {
  while (true) {
    restrictChromeIncognitoWhenRunning();
    delay(1.0);
  }
}

const ui = () => {
  ObjC.import('Cocoa');
  ObjC.registerSubclass({
    name: 'MenuAction',
    methods: {
      'quit': {
        types: ['void', ['id']],
        implementation: (sender) => $.NSApp.terminate(this),
      },
    },
  });
  const menu = $.NSMenu.alloc.init;
  const menuActionQuit = $.MenuAction.alloc.init;
  const menuItemQuit = $.NSMenuItem.alloc.init;
  const statusBar = $.NSStatusBar.systemStatusBar;
  const statusItem = statusBar.statusItemWithLength($.NSVariableStatusItemLength);
  menuItemQuit.title = 'Quit';
  menuItemQuit.target = menuActionQuit;
  menuItemQuit.action = 'quit';
  menu.addItem(menuItemQuit);
  statusItem.title = 'F';
  statusItem.menu = menu;
}

const restrictChromeIncognitoWhenRunning = () => {
  const appName = 'Google Chrome';
  if (!isAppRunning(appName)) {
    return;
  }
  const chrome = Application(appName);
  restrictChromeIncognito(chrome);
}

const isAppRunning = (appName) =>
  Application('System Events').processes[appName].exists();

const restrictChromeIncognito = (chrome) => {
  const urls = pickUpReopenUrls(chrome);
  closeAllNormalWindows(chrome);
  const incognitoWindow = getOrCreateIncognitoWindow(chrome);
  openUrls(chrome, incognitoWindow, urls);
}

const pickUpReopenUrls = (chrome) => {
  const modes = chrome.windows.mode();
  const tabsUrls = chrome.windows.tabs.url();
  const reopenTabsUrls = zip(modes, tabsUrls)
                       .filter(([mode, _]) => mode !== 'incognito')
                       .map(([_, urls]) => urls.filter(isNeededURL));
  return flatten1(reopenTabsUrls);
}

const closeAllNormalWindows = (chrome) =>
  chrome.windows().filter(isNormalWindow).forEach(closeWindow);

const getOrCreateIncognitoWindow = (chrome) => {
  if (!existsIncognitoWindow(chrome)) {
    makeNewIncognitoWindow(chrome);
  }
  return chrome.windows[indexOfIncognitoWindow(chrome)];
}

const existsIncognitoWindow = (chrome) =>
  indexOfIncognitoWindow(chrome) !== -1;

const indexOfIncognitoWindow = (chrome) =>
  chrome.windows.mode().indexOf('incognito');

const makeNewIncognitoWindow = (chrome) =>
  chrome.Window({mode: 'incognito'}).make();

const isNeededURL = (url) =>
  !/^chrome:/.test(url); // chrome:// 系は不要

const openUrls = (chrome, window, urls) =>
  urls.forEach(openUrl.bind(null, chrome, window));

const openUrl = (chrome, window, url) =>
  window.tabs.push(chrome.Tab({url: url}));

const isNormalWindow = (window) =>
  window.mode() !== 'incognito';

const closeWindow = (window) =>
  window.close();

const zip = (a, b) => a.map((x, i) => [x, b[i]]);

const flatten1 = (nestedArray) => [].concat(...nestedArray);

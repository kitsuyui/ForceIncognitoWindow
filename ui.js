const menuLabel = 'F';

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
const menu = $.NSMenu.new;
const menuActionQuit = $.MenuAction.new;
const menuItemQuit = $.NSMenuItem.new;
const statusBar = $.NSStatusBar.systemStatusBar;
const statusItem = statusBar.statusItemWithLength($.NSVariableStatusItemLength);
menuItemQuit.title = 'Quit';
menuItemQuit.target = menuActionQuit;
menuItemQuit.action = 'quit';
menu.addItem(menuItemQuit);
statusItem.title = menuLabel;
statusItem.menu = menu;

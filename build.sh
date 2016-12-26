#!/usr/bin/env bash
set -euo pipefail
builddir='build'
name='ForceIncognitoWindow'
app="$name.app"
src="$name.js"
ui="ui.js"

mkdir -p "$builddir"
cat "$src" "$ui" > "$builddir/$src"
rm -rf "$builddir/$app"
osacompile -o "$builddir/$app" -l JavaScript "$builddir/$src"
plutil -insert LSUIElement -bool YES "$builddir/$app"/Contents/Info.plist
cd "$builddir"
zip -r "$app".zip "$app"

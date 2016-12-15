#!/usr/bin/env bash
builddir='build'
name='ForceIncognitoWindow'
app="$name.app"
src="$name.js"

additional_script() {
  cat <<'EOF'
ui();
EOF
}

additional_script | cat "$src" - > "$builddir/$src"
osacompile -o "$builddir/$app" -l JavaScript "$builddir/$src"
cd "$builddir"
zip -r "$app".zip "$app"

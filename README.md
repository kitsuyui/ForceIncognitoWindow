# ForceIncognitoWindow

Google Chrome の矯正 Incognito Window 化です。
ノーマルなウインドウをみつけると即座にウインドウを閉じて、 Incognito Window で URL を開き直します。

## 使い方

シェルで ForceIncognitoWindow.js を実行しておくだけです。
JXA (JavaScript for AppleScript) になっています。

```console
$ ./ForceIncognitoWindow.js
```

ずっとカレントシェルで立ち上げておくのは面倒です。
nohup で起動したり LaunchDaemons に追加してもよいでしょう。
Automator でアプリケーション化すると非常に取り回しやすいです。

## License

[BSD 2-clause "Simplified" License](https://spdx.org/licenses/BSD-2-Clause)

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

## アプリケーション

macOS のアプリケーション形式でも入手することができます。
起動中はステータスバーに "F" のアイコンで表示されます。

未署名のアプリケーションですので、右クリックで「開く」を選択しないと起動できません。

[こちらから最新版をダウンロードしてください](https://github.com/kitsuyui/ForceIncognitoWindow/releases/tag/1.0.0)

### 自分でアプリケーションをビルドしたい場合

次のコマンドを入力してください。

```console
$ ./build.sh
```

## License

[BSD 2-clause "Simplified" License](https://spdx.org/licenses/BSD-2-Clause)

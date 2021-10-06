<img src="./src/renderer/assets/logo.svg" alt="" width="150" align="left"/>

# Ace By DAISYアプリ

Ace by DAISY Appは、[DAISYコンソーシアム](http://daisy.org)が開発したEPUBアクセシビリティ・チェッカーの公式グラフィカル・ユーザー・インターフェースです。Ace Appは、Windows、MacOS、LinuxのデスクトップOSで利用できます。

<br/>
<br/>

## 最新バージョン

Ace Appの最新バージョンは`v1.1.3`です。詳細は、[リリースページ](https://github.com/daisy/ace-gui/releases/tag/v1.1.3)をご覧ください。

Ace Appは現在、ソフトウェアアップデートの通知システムを備えています。将来のバージョンでは、より洗練された自動更新メカニズムをサポートするかもしれません。それまでは、最新版を手動でダウンロードしてインストールするよう促すメッセージが出ます。

## インストール方法

* **MacOS**: [DMGファイル](https://github.com/daisy/ace-gui/releases/download/v1.1.3/Ace.by.DAISY-1.1.3.dmg)をダウンロードして開き、`Ace by DAISY.app`ファイルをApplicationsフォルダにドラッグします。
* **Windows**: [NSISインストーラー](https://github.com/daisy/ace-gui/releases/download/v1.1.3/Ace.by.DAISY.Setup.1.1.3.exe)をダウンロードして、ステップバイステップの指示に従ってください。
* **Linux**: [AppImageファイル](https://github.com/daisy/ace-gui/releases/download/v1.1.3/Ace.by.DAISY-1.1.3.AppImage)をダウンロードして、アイコンをダブルクリックすると、すぐにアプリケーションを使用できます。また、[Debianパッケージ](https://github.com/daisy/ace-gui/releases/download/v1.1.3/ace-gui_1.1.3_amd64.deb)をダウンロードして、パッケージマネージャーを使ってアプリケーションをインストールすることもできます（例：`sudo apt install ace-gui_1.1.3_amd64.deb`）

## 文書化

ステップバイステップで説明したクイックスタートガイドが[このWikiページ](https://github.com/daisy/ace-gui/wiki/Quick-Start)にあります。将来的には、より詳細なチュートリアルが追加される予定です。

コアプロジェクトに関するドキュメント（コマンドライン、HTTPインターフェースなど）は[Aceのサポートサイト](https://daisy.github.io/ace)にあります。また、[Inclusive Publishing](https://inclusivepublishing.org/toolbox/accessibility-checker/)も有用なガイダンスをまとめてあります。

## 開発計画

Aceアプリは現在、積極的に開発中です。短期的な計画としては、バグの解消、ユーザーインターフェースの応答性とアクセシビリティの向上、ドキュメントとチュートリアルの作成、追加の言語パックの提供などです。

## 言語のノーカライゼーション

ユーザーインターフェースの翻訳については、[このWikiページ](https://github.com/daisy/ace-gui/wiki/Localization)をご覧ください。

## 対象者、デザイン目標

Ace by DAISYの[コマンドラインツール](https://daisy.github.io/ace)は、シェルコマンドや低レベルのファイルシステムアクセスを扱うことに慣れている技術的なユーザー向けに設計されています。一方、Aceアプリは、使い慣れたグラフィカル・ユーザー・インターフェースを提供することで、アクセシビリティ評価ツールが簡単に使えるようになることを目的としています。これには、ファイルのドラッグ＆ドロップ、構造化されたメニュー、ユーザー設定、評価結果のインタラクティブな表示（検索、フィルタ、ソート）、[DAISY Knowledge Base](http://kb.daisy.org/publishing/docs/)との統合、言語のローカライズなどが含まれます。

内部では、Aceアプリは、コマンドラインツールで使用されているのと同じコアコンポーネントを使用しています。デスクトップアプリケーションは、アクセシビリティ評価の結果をリッチでインタラクティブなユーザーインターフェースコントロール（表形式）で表示しますが、上級ユーザーは、コマンドラインツールで生成されたものと同じ形式（HTMLファイルやJSONファイル）でレポートをエクスポートすることができます。

Ace Appは、アクセシビリティ評価ツールの機能を確認したい初心者ユーザーに適しています。それに慣れたら、より高度なコマンドライン使用法（シェルスクリプトを使用した自動処理の実装など）に移行のもよいでしょう。

Ace Appは、連続して多数の出版物のアクセシビリティをチェックしたいユーザーを対象としていません。このようなケースでは、自動化された方法で（つまり、ユーザーの操作を最小限に抑えて）複数回起動できるコマンドラインツールの方が適しています。

## 開発者向けワークフロー

開発者向けの詳細な情報については、[このWikiページ](https://github.com/daisy/ace-gui/wiki/Developer-Workflow)をご覧ください。

## 貢献
このプロジェクトに貢献する方法や、課題やプルリクエストを提出するプロセスの詳細については、 [行動規範](CODE_OF_CONDUCT.md)と[貢献についてのガイドライン](CONTRIBUTING.md)をお読みください。どんな貢献でも歓迎します😊お気軽にご連絡ください。

## ライセンス

このプロジェクトは、MITライセンスの下でライセンスされています。詳細は、[ライセンスファイル](LICENSE.md)をご覧ください。

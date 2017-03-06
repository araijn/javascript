---sample_project---
    |-dist/                     : コンパイルされたjavascriptを配置(レポジトリ保存外)
    |-lib                       : 使用するライブラリのjavascriptを配置(基本はnpmのモジュールとして登録する)
    |-node_modules/             : npmのライブラリを配置(レポジトリ保存外)
    |-package.json              : プロジェクトに必要なライブラリや実行用スクリプトを記述したファイル
    |-src
    |  |-appA                   : appAで使用するjavascriptのソースファイルを配置
    |  |-appB                   : appBで使用するjavascriptのソースファイルを配置
    |  |-common                 : 共通利用する関数を定義したjavascriptのソースファイルを配置
    |-test
    |  |-appA                   : appAのテスト用リソースを配置
    |  |-appB                   : appBのテスト用リソースを配置
    |  |-scripts                : ../dist/scriptへのシンボリックリンク
    |-webpack_appA.config.js    : appAのjavascriptファイルを作成するための定義
    |-webpack_vendor.config.js  : jQueryなどライブラリをまとめたjavascriptファイルを作成するための定義

構築手順
1. Node.jsとnpmをインストールする
$ sudo yum -y install epel-release
$ sudo yum -y install nodejs
$ node -v

2. プロキシの設定をする(必要な場合のみ)
$ npm config set proxy http://hoge.proxy.jp:8080/
$ npm config set https-proxy https://hoge.proxy.jp:8080/
$ npm config set registry http://registry.npmjs.org/  
   → httpsでエラーとなった場合に切り替える
   設定ファイルは~アカウント/.npmrcに保存される

3. 必要なパッケージをダウンロードする
   package.jsonに記録されている依存モジュールをダウンロードする
$ npm install
  → 【node_modules】が作成されここにパッケージがダウンロードされる
  

※ Windows上にvagrantを用いてLinuxVMをインストールして使っている場合の注意点
   sample_projectを/vagrant下(Windowsとの共有フォルダ)に配置して
   npm installしてもbinへのシンボリックリンク作成時にエラーとなってしまう。
   
   その場合はvagrantの設定にて共有フォルダ上にもシンボリックリンクを作成できるように設定する
   ① vagrantの設定ファイルに以下を記述する
     Linux.vm.provider "virtualbox" do |vb|
       vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]
     end

   ② 管理者権限でコマンドプロンプトを立ち上げてから以下のコマンドを実行する
      fsutil behavior set SymlinkEvaluation L2L:1 R2R:1 L2R:1 R2L:1
      
   ③ 管理者権限で立ち上げてコマンドプロンプト上でvagrantを起動する
      ※Vagrantfileがある場所に移動してから実行すること
      ※VMを落とすときも管理者権限で立ち上げたコマンドプロンプト上から行う必要がある。 

4. 追加で必要なモジュールがある場合はインストールする。
   dependencies・devDependenciesには以下のコマンドインストールする
   npm install パッケージ名 --save        実行時に必要な依存モジュール(dependencies)としてpackage.jsonに記録
   npm install パッケージ名 --save-dev    開発時に必要なモジュール(devDependencies)としてpackage.jsonに記録

例) babelをインストールする(ES2015形式でjavascriptを記述したい場合)
    npm install babel-core babel-loader babel-preset-es2015 --save-dev


5. サンプルを作成して起動する
$ pwd → sample_project
$ npm run full_build_appA
$ npm run serve_appA

サンプルにはhttp://192.168.1.10:8080/appA/testPage1.html でアクセス可能

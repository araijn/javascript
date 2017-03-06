import $ from "jquery";

var pageData = {};

// 初期化用関数
// json形式でデータを受け取りpageDataにそれを保存する
function initialize(json) {
  if(json === undefined) {
    return;
  }

  pageData = JSON.parse(json);
}

// 実行用関数
// スクリプトを読み込んだときに実行する内容を記述する
function run() {
  // id="msg"に対する設定
  var $msg = $("#msg");
  $msg.fadeOut(
    "slow",
    function(){
      $msg.text("jQuery")
          .css("color", "red")
          .fadeIn("slow");
    }
  );

  // アクションの設定
  setup_action();
}

// グローバル環境への登録
// このスクリプトを読み込んだページでinitializeとrunを呼び出せるようにする
var PAGE1 = {};
PAGE1.initialize = initialize;
PAGE1.run = run;
window.PAGE1 = PAGE1;

function setup_action() {
  $("#button").click(action_show_alert);
}

function action_show_alert() {
  alert(pageData.message);
}

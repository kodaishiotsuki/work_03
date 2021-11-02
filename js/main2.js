'use strict';
// 入力テキストの配列
  const words = [
    'console.log();',
    'function aaa{}',
    'const bbb=ccc; return bbb;',
    'Math.floor(Math.random()*(max-min+1))+min',
    'alert();',
  ];
//wordsの中からランダムで再代入するための変数セット
  let word;
//クリックした時点の時間を記録するための変数
  let startTime;
// ゲーム中かどうかを変数で管理
  let isplaying = false;
////////////////////////最初の状態/////////////////////////////////////////
// 最初の画面をクリック
  $(document).on('click', function () {
//ゲームが始まった場合
    if (isplaying === true) {
//クリック機能は作動しない
      return;
    }
//ランダム
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
// 【メモ】
// ■splice(変化が開始する位置, 削除数)
// ■末尾の[0]⇨配列を数値に戻す処理
//入力テキストを表示
    $('#target').text(word);//キーボードで入力
//クリック時が現在の時間
    startTime = Date.now();
    // console.log(startTime);
  });

/////////////////////////////////////////////////////////////////////////////
// 何文字目を管理する変数を宣言
  let loc = 0;
//正解数を管理
  let score = 0;
//ミスの数を管理
  let miss = 0;
//////////////////次のテキストに移行した時に入力済みのテキストを削除////////////
//関数setWordを定義
  function setWord() {
// ランダム
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    // console.log(word);
// 【メモ】
// splice(変化が開始する位置, 削除数)
// 末尾の[0]⇨配列を数値に戻す処理

//入力テキストを表示
    $('#target').text(word);//キーボードで入力
//次のテキストに移動したタイミングでリセット
    loc = 0;
  };
/////////////////////////////////////////////////////////////////////////////////
//キーを押したときにイベント発生
  $(document).on('keydown', function (e) {
//タイプしたキーとテキストの文字が同じ場合
    if (e.key === word[loc]) {
//次の文字に進むためにカウンターを＋1
      loc++;
// 正解数1プラス
      score++;
//正解数を表示
      $('#score').text(score);
//正解した文字を🇯🇵に入れ替える
//1: '🇯🇵'ed
//2: '🇯🇵''🇯🇵'd
//3: '🇯🇵''🇯🇵''🇯🇵'
      $('#target').text('🇯🇵'.repeat(loc) + word.substring(loc));
// 【メモ】
///repeat(loc)→locの個数分繋げた文字列を作る
//substring(loc)→loc番目以降の文字を取り出す

//タイプしたキーとテキストの文字が違う場合
    } else {
//ミス数をプラス1
      miss++;
//ミス数を表示
      $('#miss').text(miss);
//不正解なので処理終了
      return;
    }

//正解した文字数と表示テキストの文字数が一致した場合
    if (loc === word.length) {
// words配列からテキストがなくなったとき
      if (words.length === 0) {
//結果を表示
//終了時点からスタート時の時間を引く
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
//終了テキストと時間を表示
        // console.log(`Finished!! ${elapsedTime}seconds!!`)
        $('#result').text(`Finished!! ${elapsedTime}seconds!!`);
//正答率を表示
        $('#result_2').text(`正解率：${((score / (score + miss)) * 100).toFixed()}%`)
//結果とツイートをフェードイン
        $('#replay').fadeIn();
        $('#tweet').fadeIn();
//処理を終了
        return;
      }
// 次のテキストをセット(関数setWordを実行)
      setWord();
    }
  });























// // 入力テキストを準備
// const text = ['aiueo'];
// // 文字列の何番目かを管理
// let loc = 0;
// // 正解数管理
// let score = 0;
// // ミス数を管理
// let miss = 0;
// // 表示エリアを取得
// const target = document.getElementById('target');
// // スコアエリアを取得
// const score = document.getElementById('score');
// // ミスエリアを取得
// const miss = document.getElementById('miss');


// // 入力文字をセット
// target.textContent = text;


// // キーを押す
// window.addEventListener('keydown',function(e) {
//   // console.log(e.key);
//   if () {
    
//   }
//   loc++;

// });

// 入力文字を取得


// 正誤判定
// ①正解
// ・次の文字
// ・スコアカウントプラス
// ②不正解なら
// ・ミスカウントプラス
// ・「ミス」を表示
// スタート
// タイマー機能
// 終了
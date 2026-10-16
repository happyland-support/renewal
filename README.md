# ハッピーランド リニューアルの見本（制作会社に渡すもの）

**カテゴリ**: ハッピーランド（マッチングサイト）・本体の改善

ハッピーランドのリニューアルを制作会社に伝えるための、**押して動かせる HTML の見本**（スマホの画面）。公開先は https://happyland-support.github.io/renewal/index.html （GitHub Pages）。

- GitHub：`happyland-support/renewal`（**ichigo-support ではなく happyland-support のアカウント**。上げるときだけ `gh auth switch -u happyland-support` で切り替え、終わったら `gh auth switch -u ichigo-support` で戻す）。
- このフォルダのコミットの名前は happyland-support（このフォルダだけの設定）。
- 調査・直す候補・守るルールは 100 の README・`サイトの調査.md`・`サイト構築のルール.md`。

## 作り

- 手書きの HTML＋`css/styles.css`＋`js/main.js`（メニューの開け閉め・タブ）。Bootstrap Icons。
- **画面の状態ごとに1ページ**（例：`profile_08.html`＝プロフィール → OK返事受信 → ポイントあり）。`index.html` と、各メニューのページ（`mail.html` など）が目次。
- 1ページの中に「↓」で前後の状態を縦に並べることもある（仮登録の1問ずつの画面など）。

## 状況

- 2025-01 までに約150ページを作り、制作会社に渡した。テストサイト（jjs.bz）の会員画面は、これをもとに作られている。
- 2026-10-16：シニア向けの案を足し始めた。

## 次にやること

- シニア向けの案（文字を大きく・「今やること」・申込みの文例など）を、この形で作って見てもらう → よければ上げる。
- 見本の一番下の「認定番号 54080001000」は、本当は「54080001002」（テストサイトの間違いの元）。直すかユーザーに確かめる。

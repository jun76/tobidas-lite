# tobidas-lite

物語から「飛び出す絵本」ふうのインタラクティブなHTML作品を作るスキルです。Claude Code や Codex をはじめとするAIコーディング環境に読み込ませて使います。

机の上、または海辺や森などの動く景色を背景に本が開き、ページをめくるたびにパーツが立体的に立ち上がります。マウスホイールで先送り・巻き戻しができます。

- 見本: [`themes/storybook/examples/jack/index.html`](themes/storybook/examples/jack/index.html)(ジャックと豆の木、7見開き)と [`themes/storybook/examples/urashima/index.html`](themes/storybook/examples/urashima/index.html)(Urashima Taro、英語、8見開き、海辺の動く背景)をブラウザで開く
- 作例追加: [はなさかじいさん](themes/storybook/examples/hanasaka-jiisan/index.html)(日本語、6見開き、切り紙、見開きごとに書き下ろした背景・和風BGM)。制作: **GPT-6 Astra medium**。桜が枝ごとに咲く仕掛けを収録しています。
- 操作: ホイール=進む/戻る、←→=見開き単位、左下の▶ボタンか Space=音つきの自動再生(どの位置からでも再生できる)、M=音のオン/オフ、D=デバッグ表示、左下のプルダウン=画風の切り替え
- 音: BGMと効果音を、作品定義からブラウザ内で合成します(音声ファイルなし)

## テーマ

見た目と音の素材は「テーマ」というフォルダ単位でまとまっていて、差し替えられます。同梱しているのは `storybook`(童話の絵本)です。

- `storybook`: 画風4種・机9種と動く背景4種(海辺・草原・森・市街)・曲集4種を内蔵。聞き取りで、内蔵から選ぶか作品ごとに書き下ろすかを決めます(見本画像: `themes/storybook/previews/`)

テーマの書式は `references/theme-format.md` にあります。

## 使い方

このフォルダをお使いの環境のスキルとして配置します(Claude Code なら `~/.claude/skills/tobidas-lite/`)。そのうえで「桃太郎を飛び出す絵本にして」のように頼むと、作中の言語・題材・長さ・文体・見せ場と、テーマが定める項目(画風・机や背景・曲)を聞き取り、構成表の承認を経て、HTML一式を作ります。

スクリプトを使うには Node.js と Chrome が必要です。

```bash
cd scripts && npm install
node scripts/new-book.mjs ../my-book --theme storybook        # 作品フォルダを作る
node scripts/check.mjs themes/storybook/examples/jack         # 代表フレームを撮って一覧画像にする
```

## 構成

| 場所 | 内容 |
|---|---|
| `SKILL.md` | スキル本体(進め方) |
| `assets/template/` | 作品のひな形(`index.html` と `engine/`)。エンジンは本の機構・操作・音源で、全テーマ共通 |
| `themes/<テーマ>/` | テーマパック。`theme.js`(画風・机・曲・効果音)、`parts.js`(絵の部品)、資料、見本画像、書き出し、完成見本 |
| `references/` | 全テーマ共通の資料(作品定義の書き方、落とし穴、テーマの書式) |
| `scripts/` | `new-book.mjs`(作品フォルダを作る)、`check.mjs`(静止画チェック)、`gallery.mjs`(画風と机の見本画像)、`embed-audio.mjs`(音声ファイルの埋め込み)、`render-video.mjs`(任意の動画化、要 ffmpeg) |

作品フォルダは `index.html`、`engine/`、`theme/`(選んだテーマのコピー)、`book/`(その作品の絵と定義)でできています。

## しくみ

作品は「時刻 t を渡すと1フレームを描く」決定的な作りです。ホイール操作、静止画チェック、動画化は、どれも同じ描画関数に時刻を渡しているだけです。3D表現は CSS の 3D transform、絵は SVG、音はブラウザ内の合成で、外部ライブラリは使いません。用意した画像・音声ファイルを作品の `assets/` に置いて使うこともできます(`references/assets.md`)。`index.html` はサーバーなしで開けます。

## 範囲外

- 動画ファイル。
- 読み上げ(声)の生成。用意した声の音声ファイルを鳴らすことはできます。後付け用に、現在時刻を通知する `tobidas:time` イベントも用意しています。

## 不具合を見つけたとき

制作中に見つかった不具合は、エージェントが作品側ではその場で直し、完成報告のときにスキルへのフィードバックとして提案します。受け入れた提案だけがスキル本体(エンジン・テーマ・検証スクリプト・資料)に反映されます。手順は `SKILL.md` の「制作中に見つけた不具合」にあります。

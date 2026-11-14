# テーマ「storybook」— 童話の絵本

色紙の工作のような絵と、オルゴールふうの音で作る、子ども向けの絵本。昔話・童話・オリジナルのお話に向く。絵は平塗りの SVG で描き、音はブラウザ内で合成する。ユーザーが用意した画像・音声ファイルを使うこともできる(`references/assets.md`)。

## 聞き取りで決めること

次の3つをそれぞれ「内蔵から選ぶ」か「書き下ろす」かで決める(聞き方は SKILL.md の手順1)。一覧・向く題材・書き下ろしの書き方は `presets.md`。

| 項目 | 内蔵 | 作品定義での書き方 |
|---|---|---|
| **画風** | `kirigami` 切り紙(既定)/ `flat` フラット / `crayon` クレヨン / `vintage` レトロ | `theme: { style: 'kirigami' }` |
| **机・背景** | 机: `wood` 板張り(既定)/ `lightwood` 白木 / `linen` 麻布 / `felt` フェルト / `marble` 大理石 / `grass` 芝生 / `sky` 青空 / `night` 星空 / `mat` カッティングマット。動く背景: `seaside` 海辺 / `meadow` 草原 / `forest` 森 / `town` 市街 | `theme: { desk: 'wood' }` |
| **曲** | 曲集 `musicbox` オルゴール(既定)/ `march` 行進曲 / `lullaby` 子守歌 / `wafu` 和風。音なしも可 | `sound: { set: 'musicbox' }`(音なしは `sound: false`) |

机・背景は内蔵なら全部の見開きで共通。書き下ろすなら、見開きごとにその場面に合う背景を書く(`presets.md`)。

見本画像: `previews/styles.jpg`(画風)、`previews/desks.jpg`(机と動く背景)。動く背景は静止画では動きが伝わらないので、「雲や波がゆっくり動く」と言葉で添える。

## 資料を読む順

`references/book-api.md`(全テーマ共通)を読んだあと、このフォルダの資料を次の順に読む。

1. `presets.md`: 画風・机・曲集の一覧と向く題材、書き下ろすときの書き方
2. `parts.md`: 使える絵の部品(丘・雲・木・家・人物の骨格など)と動きの部品
3. `art-style.md`: 絵の描き方、人物と動物の作り方、大きさの目安、配色
4. `sound.md`: BGMの気分と効果音の一覧
5. `gimmicks.md`: 伸びる・倒れる・積み重ねる・窓ごしに見せる等の定番仕掛け(必要に応じて)

## 見本

- `examples/jack/`: 完成見本「ジャックと豆の木」(7見開き、日本語、切り紙・板張りの机)。`book/art.js` と `book/book.js` が書き方の実例
- `examples/urashima/`: 完成見本「Urashima Taro」(8見開き、英語、クレヨン・動く背景の海辺・和風の曲)。泳ぐ・乗る・せり上がる・受け渡す・煙で変身、の実例
- `examples/alice/`: 完成見本「不思議な国のアリス」(6見開き、日本語、レトロ)。見開きごとに変わる背景と書き下ろしの曲集、裁判から目覚めへの切り替えの実例
- `examples/le-petit-prince/`: 完成見本「Le Petit Prince」(6見開き、フランス語、レトロ)。見開きごとに変わる背景と書き下ろしの曲集、小さな星を浮かべる実例
- `examples/momotaro/`: 完成見本「Momotaro」(6見開き、英語、切り紙)。見開きごとに変わる背景と書き下ろしの曲集(`book/music.js`)の実例
- `examples/hanasaka-jiisan/`: 完成見本「はなさかじいさん」(6見開き、日本語、切り紙)。見開きごとに書き下ろした背景と和風BGM、臼から灰への切り替え、灰をまいて枝ごとに桜が咲く仕掛けの実例。制作: GPT-6 Astra medium
- `starter/book/`: 新しい作品の書き出し(`new-book.mjs` が作品フォルダにコピーする、2見開きの動くひな形)

## このテーマを直したとき

`node scripts/check.mjs themes/storybook/examples/jack` と `…/examples/urashima` で見本を撮って確かめる。画風や机を足した・変えたときは `node scripts/gallery.mjs themes/storybook/examples/jack --out themes/storybook/previews` で見本画像を作り直す。

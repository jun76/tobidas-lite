# テーマ「default」— 童話の絵本

色紙の工作のような絵と、オルゴールふうの音で作る、子ども向けの絵本。昔話・童話・オリジナルのお話に向く。絵は平塗りの SVG で描き、音はブラウザ内で合成する。ユーザーが用意した画像・音声ファイルを使うこともできる(`references/assets.md`)。

## 聞き取りで決めること

次の3つと、作中の部品の使い方(目録の部品だけで組む・目録を使わない・目録を使って、ないものを描く)を聞き取りページで決める(進め方は SKILL.md の手順1)。作中の部品の答えごとの描き方は `parts.md` の「作中の部品の選び方」。机・背景と曲は「内蔵から選ぶ」か「書き下ろす」かを選べる。画風は内蔵から選び、書き下ろすのはユーザーが自分から頼んだときだけにする。一覧・向く題材・書き下ろしの書き方は `presets.md`。

| 項目 | 内蔵 | 作品定義での書き方 |
|---|---|---|
| **画風** | `kirigami` 切り紙(既定)/ `flat` フラット / `crayon` クレヨン / `vintage` レトロ / `neon` ネオン / `riso` リソグラフ / `popart` ポップアート / `mono` モノクロ / `chalk` 黒板 / `pixel` ドット絵 | `theme: { style: 'kirigami' }` |
| **机・背景** | 机: `wood` 板張り(既定)/ `lightwood` 白木 / `linen` 麻布 / `felt` フェルト / `marble` 大理石 / `grass` 芝生 / `sky` 青空 / `night` 星空 / `mat` カッティングマット / `steel` 鉄板。動く背景: `seaside` 海辺 / `meadow` 草原 / `forest` 森 / `town` 市街 / `game` レトロゲーム | `theme: { desk: 'wood' }` |
| **曲** | 曲集 `musicbox` オルゴール(既定)/ `march` 鼓笛隊 / `lullaby` ハープ / `wafu` 和笛 / `chip` チップチューン。音なしも可 | `sound: { set: 'musicbox' }`(音なしは `sound: false`) |

机・背景は内蔵なら全部の見開きで共通。書き下ろすなら、見開きごとにその場面に合う背景を書く(`presets.md`)。

見本画像: `previews/styles.jpg`(画風)、`previews/desks.jpg`(机と動く背景)。聞き取りページは、1種ずつの画像(`previews/style_<名前>.jpg` `previews/desk_<名前>.jpg`)と、選んだ組み合わせを当てはめた見本の絵本(`examples/jack`)を見せる。動く背景と曲は、見本の絵本で実際に動かして確かめてもらえる。

## 資料を読む順

`references/book-api.md`(全テーマ共通)を読んだあと、このフォルダの資料を次の順に読む。

1. `presets.md`: 画風・机・曲集の一覧と向く題材、書き下ろすときの書き方
2. `parts.md`: 使える絵の部品と動きの部品。名前で呼び出す目録の部品(家・木・乗り物・人物・動物・道具など約300点)の一覧は `parts-lib.md`、見た目は `previews/parts/` の画像
3. `art-style.md`: 絵の描き方、人物と動物の作り方、大きさの目安、配色
4. `sound.md`: BGMの気分と効果音の一覧
5. `gimmicks.md`: 伸びる・倒れる・積み重ねる・窓ごしに見せる等の定番仕掛け(必要に応じて)

## 見本

- `examples/jack/`: 完成見本「ジャックと豆の木」(8見開き、日本語、切り紙・板張りの机)。`book/art.js` と `book/book.js` が書き方の実例。伸びる・倒れる・受け渡す・ページの下から登ってくる、の実例
- `examples/urashima/`: 完成見本「Urashima Taro」(8見開き、英語、クレヨン・動く背景の海辺・和風の曲)。泳ぐ・乗る・せり上がる・受け渡す・煙で変身、の実例
- `examples/alice/`: 完成見本「不思議な国のアリス」(6見開き、日本語、レトロ)。見開きごとに変わる背景と書き下ろしの曲集、裁判から目覚めへの切り替えの実例
- `examples/le-petit-prince/`: 完成見本「Le Petit Prince」(6見開き、フランス語、レトロ)。見開きごとに変わる背景と書き下ろしの曲集、小さな星を浮かべる実例
- `examples/momotaro/`: 完成見本「Momotaro」(6見開き、英語、切り紙)。見開きごとに変わる背景と書き下ろしの曲集(`book/music.js`)の実例
- `examples/hanasaka-jiisan/`: 完成見本「はなさかじいさん」(6見開き、日本語、切り紙)。見開きごとに書き下ろした背景と和風BGM、臼から灰への切り替え、灰をまいて枝ごとに桜が咲く仕掛けの実例。制作: GPT-6 Astra medium
- `starter/book/`: 新しい作品の書き出し(`new-book.mjs` が作品フォルダにコピーする、2見開きの動くひな形)

## このテーマを直したとき

`node scripts/check.mjs themes/default/examples/jack` と `…/examples/urashima` で見本を撮って確かめる。画風・机・曲集を足した・変えたときは `node scripts/gallery.mjs themes/default/examples/jack --out themes/default/previews` で見本画像と一覧(`previews/index.json`)を作り直す。聞き取りページはこの一覧を読む。

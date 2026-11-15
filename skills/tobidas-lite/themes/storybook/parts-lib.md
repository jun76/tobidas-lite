# 部品の目録(put / lib で呼び出す絵)

`scripts/parts-sheet.mjs` が作る一覧(手で編集しない)。使い方は `parts.md` の「目録の部品」。見た目は `previews/parts/` の画像で確かめる(1枚に12個)。

全 300 点。「動き」に ○ のある部品は、置くだけで動く(`anim` や `dyn` を渡すと置きかわる)。箱は絵の元サイズ(w0×h0)で、`put` が自動で使う。

## 家

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `house.thatch` | わらぶきの民家 | 420×380 | ○ | night 夜の配色 / fancy 旗飾り | 01.jpg |
| `house.stone` | 洋風の石の家 | 400×380 |  | c 壁 / c2 屋根 / night | 01.jpg |
| `house.log` | 丸太小屋 | 420×340 |  | c 丸太 / c2 屋根 / night | 01.jpg |
| `house.machiya` | 瓦屋根の町家 | 440×360 |  | c 壁 / c2 屋根 / c3 のれん / night | 01.jpg |

## 城

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `castle.west` | 西洋の城 | 520×560 | ○ |  | 01.jpg |
| `castle.japan` | 日本の城 | 500×580 |  | c 壁 / c2 屋根 | 01.jpg |
| `castle.desert` | 砂漠の宮殿 | 540×520 |  | c 壁 / c2 丸屋根 | 01.jpg |
| `castle.ruin` | 荒れた古城 | 500×460 |  | c 石 / c2 つた | 01.jpg |

## 塔

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `tower.watch` | 見張り塔 | 220×540 | ○ | c 石 / c2 屋根 | 01.jpg |
| `tower.clock` | 時計塔 | 240×604 | ○ | c れんが / c2 屋根。針が回る | 01.jpg |
| `tower.lighthouse` | 灯台 | 260×580 | ○ | c 地の色 / c2 しま。光がゆっくり明滅する | 01.jpg |
| `tower.wizard` | 魔法使いの塔 | 260×670 |  | c 塔 / c2 屋根 | 01.jpg |

## 店

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `shop.bakery` | パン屋 | 400×370 |  | c 壁 / c2 日よけ | 02.jpg |
| `shop.stall` | 屋台 | 380×310 |  | c 日よけ | 02.jpg |
| `shop.books` | 本屋 | 380×370 |  | c 壁 | 02.jpg |
| `shop.teahouse` | 茶店 | 440×340 |  | c 屋根 / c2 縁台とのれん | 02.jpg |

## 祈りの場所

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `shrine.torii` | 鳥居と社 | 440×400 |  | c 鳥居 | 02.jpg |
| `shrine.temple` | お寺 | 480×400 |  | c 屋根 | 02.jpg |
| `shrine.church` | 教会 | 380×570 |  | c 壁 / c2 屋根 | 02.jpg |
| `shrine.hokora` | ほこら | 220×270 |  | c 屋根 | 02.jpg |

## 橋

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `bridge.drum` | 太鼓橋 | 620×230 |  | c 橋 | 02.jpg |
| `bridge.arch` | 石のアーチ橋 | 640×250 |  | c 石 | 02.jpg |
| `bridge.rope` | つり橋 | 660×250 |  | c 板 | 02.jpg |
| `bridge.log` | 丸木橋 | 540×120 |  | c 丸太 | 02.jpg |

## 門

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `gate.castle` | 城門 | 460×470 |  | c 石 / c2 屋根 | 03.jpg |
| `gate.mansion` | 屋敷の門 | 520×340 |  | c 屋根 | 03.jpg |
| `gate.arch` | 石のアーチ | 380×400 |  | c 石 | 03.jpg |
| `gate.iron` | 鉄の門 | 440×380 |  | c れんが | 03.jpg |

## 遠くの町並み

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `town.village` | 村 | 760×230 |  | w h で伸び縮み | 03.jpg |
| `town.west` | 西洋の町 | 820×270 |  | w h で伸び縮み | 03.jpg |
| `town.city` | ビル街 | 840×380 |  | w h で伸び縮み / night / seed | 03.jpg |
| `town.japan` | 和の町 | 820×250 |  | w h で伸び縮み | 03.jpg |

## 室内の壁

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `wall.stone` | 石の城の壁 | 1380×520 |  | 窓・旗・たいまつつき | 03.jpg |
| `wall.wood` | 板張りの民家の壁 | 1380×520 |  | c 板 | 03.jpg |
| `wall.paper` | 壁紙の洋間の壁 | 1380×520 |  | c 壁紙 / c2 腰板 / c3 カーテン | 03.jpg |
| `wall.shoji` | 障子とふすまの壁 | 1380×520 |  | c ふすま | 03.jpg |

## 柵・塀

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `fence.wood` | 木の柵 | 440×90 |  | w h で伸び縮み | 04.jpg |
| `fence.stone` | 石垣 | 480×120 |  | w h で伸び縮み / c 石 | 04.jpg |
| `fence.hedge` | 生け垣 | 480×130 |  | w h で伸び縮み / c 葉 | 04.jpg |
| `fence.bamboo` | 竹垣 | 480×140 |  | w h で伸び縮み / c 竹 | 04.jpg |

## 広葉樹

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `tree.round` | 丸いこずえの木 | 300×430 |  | c c2 c3 葉の3色 | 04.jpg |
| `tree.fruit` | 実のなる木 | 300×430 |  | fruit 実の色 / c c2 c3 | 04.jpg |
| `tree.autumn` | 紅葉の木 | 300×430 |  | c c2 c3 | 04.jpg |
| `tree.bare` | 枯れ木 | 300×430 |  | c 幹 | 04.jpg |

## 針葉樹

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `conifer.fir` | もみの木 | 240×430 |  | c 葉 | 04.jpg |
| `conifer.cedar` | 杉 | 200×480 |  | c 葉 | 04.jpg |
| `conifer.pine` | 松 | 360×380 |  | c 葉 | 04.jpg |
| `conifer.snow` | 雪をかぶった木 | 240×430 |  | c 葉 | 04.jpg |

## 特徴のある木

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `tree.sakura` | 桜 | 340×420 |  | c 花 | 05.jpg |
| `tree.willow` | 柳 | 320×440 |  | c 葉 | 05.jpg |
| `tree.palm` | やしの木 | 320×460 |  | c 葉 | 05.jpg |
| `tree.bamboo` | 竹 | 280×480 |  | c 竹 | 05.jpg |

## 茂み

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `bush.round` | 丸い茂み | 260×130 |  | w h で伸び縮み / c c2 | 05.jpg |
| `bush.flower` | 花つきの茂み | 280×120 |  | w h で伸び縮み / c c2 葉 / c3 花 | 05.jpg |
| `bush.berry` | 実つきの茂み | 260×130 |  | w h で伸び縮み / c c2 葉 / c3 実 | 05.jpg |
| `bush.thorn` | いばら | 280×160 |  | w h で伸び縮み / c | 05.jpg |

## 草むら

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `grass.short` | 短い草 | 240×90 |  | w h で伸び縮み / c c2 | 05.jpg |
| `grass.flowers` | 花畑 | 300×100 |  | w h で伸び縮み / fl 花の色の配列 | 05.jpg |
| `grass.susuki` | すすき | 260×230 |  | w h で伸び縮み / c くき / c2 穂 | 05.jpg |
| `grass.reed` | あし | 240×250 |  | w h で伸び縮み / c | 05.jpg |

## 花

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `flower.tulip` | チューリップ | 180×200 |  | fl 花の色の配列 | 06.jpg |
| `flower.sunflower` | ひまわり | 180×310 |  | c 花びら | 06.jpg |
| `flower.rose` | ばら | 200×230 |  | c 花 | 06.jpg |
| `flower.wild` | 野の花 | 240×130 |  | w h で伸び縮み / fl 花の色の配列 | 06.jpg |

## 岩

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `rock.round` | 丸い岩 | 240×160 |  | c 岩 | 06.jpg |
| `rock.sharp` | とがった岩 | 240×280 |  | c 岩 | 06.jpg |
| `rock.moss` | こけむした岩 | 280×180 |  | c こけ | 06.jpg |
| `rock.pile` | 石積み | 240×220 |  | c 石 | 06.jpg |

## 山

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `mountain.gentle` | なだらかな山 | 900×320 |  | w h で伸び縮み / c c2 | 06.jpg |
| `mountain.snow` | 雪の峰 | 900×440 |  | w h で伸び縮み / c | 06.jpg |
| `mountain.volcano` | 火山 | 820×420 | ○ | w h で伸び縮み / c。煙がゆれる | 06.jpg |
| `mountain.fuji` | 富士山の形の山 | 900×400 |  | w h で伸び縮み / c | 06.jpg |

## 丘

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `hill.grass` | 草の丘 | 1400×230 |  | w h で伸び縮み / c 奥 / c2 手前 / seed 形 / f うねり | 07.jpg |
| `hill.sand` | 砂丘 | 1400×230 |  | w h で伸び縮み / c c2 / seed / f | 07.jpg |
| `hill.snow` | 雪の丘 | 1400×230 |  | w h で伸び縮み / c c2 / seed / f | 07.jpg |
| `hill.field` | 畑の丘 | 1400×230 |  | w h で伸び縮み / c c2 / seed / f | 07.jpg |

## 雲

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `cloud.puff` | わた雲 | 260×110 |  | w h で伸び縮み / c c2 / seed。既定で 380 浮く(lift) | 07.jpg |
| `cloud.tower` | 入道雲 | 360×320 |  | c c2。既定で 380 浮く(lift) | 07.jpg |
| `cloud.rain` | 雨雲 | 300×280 | ○ | c 雲。雨つぶが落ちる。既定で 380 浮く(lift) | 07.jpg |
| `cloud.haze` | たなびく雲 | 540×100 |  | w h で伸び縮み / c c2。既定で 380 浮く(lift) | 07.jpg |

## 水辺

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `water.pond` | 池 | 440×160 |  | w h で伸び縮み / c 水。地面に描くなら lib() で | 07.jpg |
| `water.river` | 川 | 720×150 | ○ | w h で伸び縮み / c 水。さざ波がゆれる | 07.jpg |
| `water.fall` | 滝 | 340×540 | ○ | c 水。水が流れ落ちる | 07.jpg |
| `water.wave` | 波 | 560×150 | ○ | w h で伸び縮み / c c2。波がゆれる | 07.jpg |

## 空のもの

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `sky.sun` | 太陽(顔つき) | 200×200 | ○ | 顔のない太陽は A.sunDisc。既定で 420 浮く(lift) | 08.jpg |
| `sky.moon` | 月 | 180×180 |  | crescent 三日月。既定で 420 浮く(lift) | 08.jpg |
| `sky.stars` | 星の群れ | 420×260 | ○ | c 色 / seed 並び。またたく。既定で 420 浮く(lift) | 08.jpg |
| `sky.rainbow` | 虹 | 1060×500 |  | w h で伸び縮み | 08.jpg |

## 車

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `car.sedan` | 乗用車 | 330×170 |  | c 車体 | 08.jpg |
| `car.truck` | トラック | 400×220 |  | c 運転席 / c2 荷台 | 08.jpg |
| `car.bus` | バス | 440×220 |  | c 車体 | 08.jpg |
| `car.classic` | クラシックカー | 360×210 |  | c 車体 | 08.jpg |

## 船

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `ship.sail` | 帆かけ舟 | 320×330 | ○ | c 船体 / c2 帆 | 08.jpg |
| `ship.row` | 手こぎ舟 | 340×130 |  | c 船体 | 08.jpg |
| `ship.liner` | 大型客船 | 660×310 | ○ | c 船体 / c2 煙突 | 08.jpg |
| `ship.pirate` | 海賊船 | 540×460 | ○ | c 船体 / c2 帆 | 08.jpg |

## 引く車

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `cart.coach` | 馬車 | 460×300 |  | c 車体。馬は farm.horse を前に置く | 09.jpg |
| `cart.wagon` | 荷車 | 400×210 |  | c 荷台。干し草を積んでいる | 09.jpg |
| `cart.daihachi` | 大八車 | 420×190 |  | c 木 | 09.jpg |
| `cart.pumpkin` | かぼちゃの馬車 | 440×340 |  | c かぼちゃ | 09.jpg |

## 列車

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `train.steam` | 蒸気機関車 | 460×290 | ○ | c 車体 | 09.jpg |
| `train.coach` | 客車 | 420×230 |  | c 車体 | 09.jpg |
| `train.electric` | 電車 | 460×220 |  | c 車体 / c2 帯 | 09.jpg |
| `train.trolley` | トロッコ | 300×190 |  | c 車体。鉱石を積んでいる | 09.jpg |

## 空の乗り物

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `air.plane` | 飛行機 | 440×210 | ○ | c 機体 / c2 翼。プロペラが回る。既定で 320 浮く(lift) | 09.jpg |
| `air.balloon` | 気球 | 300×440 | ○ | fl 色の配列。ゆっくり上下する。既定で 320 浮く(lift) | 09.jpg |
| `air.rocket` | ロケット | 220×440 | ○ | c 機体 / c2 赤い所。炎がゆれる。既定で 320 浮く(lift) | 09.jpg |
| `air.airship` | 飛行船 | 540×250 | ○ | c 気のう / c2 ゴンドラ。既定で 320 浮く(lift) | 09.jpg |

## 小さな乗り物

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `ride.bicycle` | 自転車 | 320×210 |  | c フレーム | 10.jpg |
| `ride.tricycle` | 三輪車 | 240×180 |  | c フレーム | 10.jpg |
| `ride.motorbike` | バイク | 340×210 |  | c 車体 | 10.jpg |
| `ride.sled` | そり | 340×140 |  | c そり | 10.jpg |

## 机

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `table.wood` | 木の机 | 700×200 |  | w h で伸び縮み | 10.jpg |
| `table.chabudai` | ちゃぶ台 | 320×120 |  | c 木 | 10.jpg |
| `table.dining` | 食卓(テーブルクロスつき) | 540×230 |  | c 布 / c2 もよう | 10.jpg |
| `table.work` | 作業台 | 460×230 |  | c 木 | 10.jpg |

## いす

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `chair.wood` | 木のいす | 170×270 |  | c 木 | 10.jpg |
| `chair.throne` | 玉座 | 260×400 |  | c 布 | 10.jpg |
| `chair.bench` | ベンチ | 380×180 |  | c 板 | 10.jpg |
| `chair.zabuton` | ざぶとん | 220×80 |  | c 布 | 10.jpg |

## 寝床

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `bed.bed` | ベッド | 480×270 |  | c ふとん | 11.jpg |
| `bed.futon` | ふとん | 460×120 |  | c 掛けぶとん | 11.jpg |
| `bed.cradle` | ゆりかご | 320×240 | ○ | c かご / c2 ふとん。ゆれる | 11.jpg |
| `bed.hammock` | ハンモック | 540×300 |  | c 布 / c2 しま | 11.jpg |

## 明かり

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `light.street` | 街灯 | 140×460 |  | c 柱 / night: false で消灯 | 11.jpg |
| `light.chochin` | ちょうちん | 150×320 |  | c 色 | 11.jpg |
| `light.candle` | ろうそく | 110×200 | ○ | c ろう。炎がゆれる | 11.jpg |
| `light.lamp` | ランプ | 150×250 | ○ | c 金具。炎がゆれる | 11.jpg |

## 子ども

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `kid.boy` | 男の子 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 11.jpg |
| `kid.girl` | 女の子 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 11.jpg |
| `kid.kimono` | 着物の子 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 11.jpg |
| `kid.baby` | 赤ん坊 | 130×130 |  | skin 肌 / top 服 / hairC 髪 | 11.jpg |

## 町の人

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `folk.man` | 洋服の男 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 12.jpg |
| `folk.woman` | 洋服の女 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 12.jpg |
| `folk.kimonoMan` | 着物の男 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 12.jpg |
| `folk.kimonoWoman` | 着物の女 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 12.jpg |

## 年寄り

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `elder.jiji` | おじいさん(和) | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 12.jpg |
| `elder.baba` | おばあさん(和) | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 12.jpg |
| `elder.grandpa` | おじいさん(洋) | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 12.jpg |
| `elder.grandma` | おばあさん(洋) | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 12.jpg |

## 王族

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `royal.king` | 王 | 120×230 |  | 上の余白 4。skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 12.jpg |
| `royal.queen` | 女王 | 120×230 |  | 上の余白 4。skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 12.jpg |
| `royal.prince` | 王子 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 12.jpg |
| `royal.princess` | 姫 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 12.jpg |

## 働く人

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `worker.farmer` | 農夫 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 13.jpg |
| `worker.fisher` | 漁師 | 120×240 |  | 上の余白 14。skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 13.jpg |
| `worker.merchant` | 商人 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 13.jpg |
| `worker.soldier` | 兵士 | 120×270 |  | 上の余白 44。skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 13.jpg |

## ふしぎな人

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `magic.wizard` | 魔法使い | 120×264 |  | 上の余白 38。skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 13.jpg |
| `magic.witch` | 魔女 | 120×264 |  | 上の余白 38。skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 13.jpg |
| `magic.fairy` | 妖精 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 13.jpg |
| `magic.tennyo` | 天女 | 120×232 |  | 上の余白 6。skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 13.jpg |

## 敵役

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `foe.oni` | 鬼 | 150×283 |  | 肌の色は skin(青鬼は #58a6d6) | 13.jpg |
| `foe.giant` | 巨人 | 216×407 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 13.jpg |
| `foe.pirate` | 海賊 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 13.jpg |
| `foe.thief` | どろぼう | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 13.jpg |

## 現代の人

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `modern.office` | 会社員 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 14.jpg |
| `modern.doctor` | 医者 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 14.jpg |
| `modern.police` | 警官 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 14.jpg |
| `modern.captain` | 船長 | 120×226 |  | skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ | 14.jpg |

## 犬

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `dog.shiba` | 柴犬 | 230×168 | ○ | c 体の色 | 14.jpg |
| `dog.spot` | ぶちの犬 | 240×168 | ○ | c 体の色 | 14.jpg |
| `dog.big` | 大型犬 | 300×222 | ○ | c 体の色 | 14.jpg |
| `dog.puppy` | 子犬 | 180×140 | ○ | c 体の色 | 14.jpg |

## 猫

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `cat.calico` | 三毛猫 | 215×162 | ○ | c 体の色 | 14.jpg |
| `cat.black` | 黒猫 | 215×162 | ○ | c 体の色 | 14.jpg |
| `cat.tabby` | しま猫 | 215×162 | ○ | c 体の色 | 14.jpg |
| `cat.kitten` | 子猫 | 160×130 | ○ | c 体の色 | 14.jpg |

## 鳥

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `bird.small` | 小鳥 | 130×110 |  | c 体の色 | 15.jpg |
| `bird.crow` | からす | 170×150 |  | c 体の色 | 15.jpg |
| `bird.dove` | はと | 170×130 |  | c 体の色。小枝をくわえている | 15.jpg |
| `bird.crane` | つる | 230×320 |  | c 体の色 | 15.jpg |

## 家畜

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `farm.cow` | 牛 | 300×210 | ○ |  | 15.jpg |
| `farm.horse` | 馬 | 350×300 | ○ | c 体の色 | 15.jpg |
| `farm.pig` | ぶた | 250×170 | ○ | c 体の色 | 15.jpg |
| `farm.sheep` | ひつじ | 250×195 | ○ |  | 15.jpg |

## 森の小さな動物

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `wood.rabbit` | うさぎ | 175×175 | ○ | c 体の色 | 15.jpg |
| `wood.fox` | きつね | 255×164 | ○ | c 体の色 | 15.jpg |
| `wood.tanuki` | たぬき | 225×170 | ○ | c 体の色 | 15.jpg |
| `wood.squirrel` | りす | 175×160 | ○ | c 体の色 | 15.jpg |

## 大きな獣

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `beast.bear` | くま | 320×245 | ○ | c 体の色 | 16.jpg |
| `beast.wolf` | おおかみ | 290×200 | ○ | c 体の色 | 16.jpg |
| `beast.deer` | しか | 280×310 | ○ | c 体の色 | 16.jpg |
| `beast.boar` | いのしし | 285×195 | ○ | c 体の色 | 16.jpg |

## 水の生き物

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `sea.fish` | 魚 | 190×120 | ○ | c 体の色。尾をふる | 16.jpg |
| `sea.turtle` | かめ | 250×150 | ○ | c 体 / c2 こうら | 16.jpg |
| `sea.octopus` | たこ | 240×230 | ○ | c 体の色。足がゆれる | 16.jpg |
| `sea.whale` | くじら | 480×260 | ○ | c 体の色。潮をふく | 16.jpg |

## 小さな生き物

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `tiny.butterfly` | ちょう | 44×40 | ○ | c 羽の色。ひらひら舞わせるなら fly()。既定で 70 浮く(lift) | 16.jpg |
| `tiny.dragonfly` | とんぼ | 120×80 | ○ | c 体の色。既定で 90 浮く(lift) | 16.jpg |
| `tiny.frog` | かえる | 150×110 |  | c 体の色 | 16.jpg |
| `tiny.mouse` | ねずみ | 150×95 | ○ | c 体の色 | 16.jpg |

## 遠い国の動物

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `wild.lion` | ライオン | 320×235 | ○ | c 体の色 | 17.jpg |
| `wild.elephant` | ぞう | 420×320 | ○ | c 体の色 | 17.jpg |
| `wild.giraffe` | きりん | 290×450 | ○ |  | 17.jpg |
| `wild.monkey` | さる | 200×210 | ○ | c 体の色 | 17.jpg |

## 空想の生き物

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `myth.dragon` | 竜 | 440×340 | ○ | c 体 / c2 つばさ | 17.jpg |
| `myth.unicorn` | ユニコーン | 350×310 | ○ | c 体の色 | 17.jpg |
| `myth.mermaid` | 人魚 | 220×260 | ○ | skin 肌 / hairC 髪 / c 尾。岩に座っている | 17.jpg |
| `myth.ghost` | おばけ | 160×200 | ○ | c 色。ふわふわ浮く。既定で 60 浮く(lift) | 17.jpg |

## 屋外の物

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `out.well` | 井戸 | 230×270 |  | c 屋根 | 17.jpg |
| `out.windmill` | 風車 | 340×470 | ○ | c 壁。羽根が回る | 17.jpg |
| `out.watermill` | 水車小屋 | 400×310 | ○ | c 壁。水車が回る | 17.jpg |
| `out.scarecrow` | かかし | 220×310 |  | c 服 | 17.jpg |
| `out.postbox` | 郵便ポスト | 120×230 |  | c 色 | 18.jpg |
| `out.signpost` | 道しるべ | 200×250 |  | c 板 | 18.jpg |
| `out.fountain` | 噴水 | 340×300 | ○ | 水がふき出す | 18.jpg |
| `out.statue` | 銅像 | 180×340 |  | c 像 | 18.jpg |
| `out.tent` | テント | 320×230 | ○ | c 布 | 18.jpg |
| `out.kamakura` | かまくら | 320×210 |  | 中に明かりがともっている | 18.jpg |
| `out.grave` | 墓石 | 160×190 |  | c 石 | 18.jpg |
| `out.cave` | ほら穴の入口 | 380×270 |  | c 岩 | 18.jpg |
| `out.stairs` | 石段 | 320×210 |  | c 石 | 18.jpg |
| `out.pier` | 桟橋 | 440×170 |  | c 板 | 18.jpg |
| `out.signal` | 信号機 | 120×320 |  |  | 18.jpg |

## 家の中

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `room.fireplace` | 暖炉 | 340×310 | ○ | c れんが。火がゆれる | 18.jpg |
| `room.kamado` | かまど | 280×220 | ○ | c 土。火がゆれる | 19.jpg |
| `room.irori` | いろり | 340×260 | ○ | 上からなべをつるしている。火がゆれる | 19.jpg |
| `room.chest` | たんす | 250×290 |  | c 木 | 19.jpg |
| `room.bookshelf` | 本棚 | 270×350 |  | c 木 | 19.jpg |
| `room.clock` | 柱時計 | 160×390 | ○ | c 木。ふりこがゆれる | 19.jpg |
| `room.mirror` | 鏡 | 180×340 |  | c わく | 19.jpg |
| `room.window` | 窓 | 250×270 |  | c わく / c2 カーテン | 19.jpg |
| `room.door` | 扉 | 190×330 |  | c 板 | 19.jpg |
| `room.curtain` | カーテン | 320×330 |  | c 布 | 19.jpg |
| `room.piano` | ピアノ | 340×270 |  | c 木 | 19.jpg |
| `room.phone` | 電話 | 160×140 |  | c 色 | 19.jpg |
| `room.tv` | テレビ | 250×240 |  | c 箱 | 19.jpg |
| `room.picture` | 額入りの絵 | 210×180 |  | c わく | 20.jpg |
| `room.vase` | 花びん | 140×240 |  | c 花びん | 20.jpg |

## 道具

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `tool.axe` | おの | 120×210 |  |  | 20.jpg |
| `tool.hoe` | くわ | 130×270 |  |  | 20.jpg |
| `tool.rod` | 釣りざお | 280×270 |  |  | 20.jpg |
| `tool.net` | 網 | 140×290 |  |  | 20.jpg |
| `tool.basket` | かご | 200×160 |  | c 色 | 20.jpg |
| `tool.bucket` | おけ | 160×170 |  | c 木。水が入っている | 20.jpg |
| `tool.barrel` | たる | 180×210 |  | c 木 | 20.jpg |
| `tool.pot` | つぼ | 170×200 |  | c 色 | 20.jpg |
| `tool.usu` | 臼ときね | 310×220 |  | もちが入っている | 20.jpg |
| `tool.ladder` | はしご | 140×390 |  |  | 20.jpg |
| `tool.rope` | 縄 | 180×130 |  |  | 21.jpg |
| `tool.umbrella` | 傘 | 240×260 |  | c 色 | 21.jpg |
| `tool.broom` | ほうき | 120×290 |  |  | 21.jpg |
| `tool.bag` | かばん | 190×180 |  | c 色 | 21.jpg |
| `tool.furoshiki` | ふろしき包み | 190×160 |  | c 布 | 21.jpg |

## 食べ物

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `food.onigiri` | おにぎり | 130×120 |  |  | 21.jpg |
| `food.bread` | パン | 190×120 |  |  | 21.jpg |
| `food.apple` | りんご | 110×120 |  | c 色 | 21.jpg |
| `food.peach` | 桃 | 140×140 |  | c 色 | 21.jpg |
| `food.pumpkin` | かぼちゃ | 180×150 |  | c 色 | 21.jpg |
| `food.mushroom` | きのこ | 140×150 |  | c かさ | 21.jpg |
| `food.cake` | ケーキ | 200×200 |  | c クリーム | 21.jpg |
| `food.dango` | 団子 | 80×190 |  |  | 22.jpg |
| `food.nabe` | 鍋 | 240×170 | ○ | 湯気がゆれる | 22.jpg |
| `food.teacup` | 茶わんと湯のみ | 200×120 |  |  | 22.jpg |
| `food.feast` | ごちそうの大皿 | 300×160 |  |  | 22.jpg |
| `food.bottle` | びんとコップ | 160×200 |  | c びん | 22.jpg |

## 宝・ふしぎな物

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `item.chest` | 宝箱 | 230×200 |  | c 木。ふたが開いて金貨が見えている | 22.jpg |
| `item.coins` | 金貨の山 | 240×140 |  | w h で伸び縮み | 22.jpg |
| `item.crown` | 王冠 | 160×130 |  | c 色 | 22.jpg |
| `item.sword` | 剣 | 100×290 |  | 剣先が上 | 22.jpg |
| `item.shield` | 盾 | 160×190 |  | c 色 | 22.jpg |
| `item.wand` | 魔法のつえ | 90×210 |  |  | 22.jpg |
| `item.crystal` | 水晶玉 | 160×200 |  | c 色 | 22.jpg |
| `item.lamp` | 魔法のランプ | 240×150 |  | c 色 | 23.jpg |
| `item.scroll` | 巻物 | 200×120 |  | c 色 | 23.jpg |
| `item.book` | 本 | 200×160 |  | c 表紙 | 23.jpg |
| `item.key` | 鍵 | 90×190 |  | c 色 | 23.jpg |
| `item.tamatebako` | 玉手箱 | 200×160 |  | c ふた | 23.jpg |
| `item.kozuchi` | 打ち出の小づち | 170×190 |  | c 色 | 23.jpg |

## 楽器・遊び

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `play.drum` | 太鼓 | 190×190 |  | c 胴 | 23.jpg |
| `play.flute` | 笛 | 230×50 |  | c 色 | 23.jpg |
| `play.guitar` | ギター | 150×340 |  | c 胴 | 23.jpg |
| `play.trumpet` | ラッパ | 250×130 |  | c 色 | 23.jpg |
| `play.ball` | ボール | 120×120 |  | c 色 | 23.jpg |
| `play.kite` | たこ | 180×340 | ○ | c 色。空でゆれる。既定で 360 浮く(lift) | 23.jpg |
| `play.balloon` | 風船 | 110×260 | ○ | c 色。ふわふわ浮く。既定で 200 浮く(lift) | 24.jpg |
| `play.plush` | ぬいぐるみ | 160×190 |  | c 色 | 24.jpg |

## 行事・飾り

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `fest.xmastree` | クリスマスツリー | 270×420 |  | c 葉 | 24.jpg |
| `fest.gift` | 贈り物の箱 | 160×160 |  | c 箱 / c2 リボン | 24.jpg |
| `fest.flag` | 旗 | 200×340 | ○ | c 色。はためく | 24.jpg |
| `fest.nobori` | のぼり | 130×410 | ○ | c 色。はためく | 24.jpg |
| `fest.kadomatsu` | 門松 | 180×270 |  |  | 24.jpg |
| `fest.koinobori` | こいのぼり | 340×430 | ○ | 風になびく | 24.jpg |
| `fest.snowman` | 雪だるま | 190×270 |  |  | 24.jpg |
| `fest.bonfire` | たき火 | 240×250 | ○ | 火がゆれる | 24.jpg |

## 現象

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `fx.smoke` | 煙・土ぼこり | 240×110 |  | w h で伸び縮み / seed | 24.jpg |
| `fx.fire` | 炎 | 170×210 | ○ | ゆれる | 24.jpg |
| `fx.rain` | 雨 | 420×320 | ○ | c 色 / seed。降りつづける。既定で 200 浮く(lift) | 25.jpg |
| `fx.snow` | 雪 | 420×320 | ○ | seed。舞いおちる。既定で 200 浮く(lift) | 25.jpg |
| `fx.lightning` | 稲妻 | 170×340 |  | c 色。既定で 200 浮く(lift) | 25.jpg |
| `fx.splash` | 水しぶき | 240×160 |  | c 色 | 25.jpg |
| `fx.lightbeam` | 光の柱 | 260×520 |  | c 色。半透明 | 25.jpg |
| `fx.surprise` | 驚きのしるし | 120×160 |  | q: true で「?」 / c 色。既定で 200 浮く(lift) | 25.jpg |

## 現代の小物

| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |
|---|---|---|---|---|---|
| `now.pc` | パソコン | 240×180 |  | c 色 | 25.jpg |
| `now.phone` | スマートフォン | 100×180 |  | c 色 | 25.jpg |
| `now.camera` | カメラ | 190×140 |  | c 色 | 25.jpg |
| `now.letter` | 手紙 | 180×130 |  | c 色 | 25.jpg |
| `now.newspaper` | 新聞 | 200×150 |  |  | 25.jpg |
| `now.watch` | 懐中時計 | 130×170 | ○ | c 色。針が回る | 25.jpg |

import { en } from './en'
import { discoverJa } from './discover'

export const ja = {
  ...en,
  meta: { title: 'パノラマ360°・4つの場所' }, brand: { title: 'パノラマ360°', subtitle: '場所の間を歩く' },
  intro: { title: '4つの場所に立ってみよう', body: '360°パノラマで4つの場所を探索できます。ライン川岸には4つの視点がつながっています。画面の矢印またはW/Sで移動し、A/Dで回転、iで詳細を表示します。', loading: '画像を読み込み中…', start: '探索を始める' },
  controls: { autoRotate: '自動回転', theme: 'ライト・ダークテーマ切替', fullscreen: '全画面', ai: 'AIガイドに質問', autoTour: '自動ツアー', narration: '英語ナレーション', ambience: '環境音', planet: 'リトルプラネット表示', forward: '前進', backward: '後退', left: '左回転', right: '右回転', language: '言語', close: '閉じる', send: '送信' },
  status: { single: '1つの視点・ドラッグして見回す', point: '視点 {{current}}/{{total}}', photo: '写真', source: '出典' },
  toasts: { single: 'この場所には視点が1つだけです', turn: '進行方向へ回転中', tourEnd: 'ツアー終了', chooseRhine: '自動ツアーを始めるにはライン川岸を選択してください', tourOn: '自動ツアー：画像をドラッグするか再度選択して停止', narrationOn: '英語ナレーション：オン', narrationUnsupported: 'このブラウザはナレーションに対応していません', ambienceDisclosure: '環境音は現地収録ではなく合成音です' },
  ai: { title: 'AIガイド', suggestionSpecial: 'この場所の特別な点は？', suggestionSeason: '訪れるのに最適な季節は？', placeholder: '表示中の場所について質問…', greeting: 'こんにちは！AIガイドです。{{place}}について何を知りたいですか？', rateLimited: '質問が速すぎます。数秒後にもう一度お試しください。', permission: 'AIガイドへの許可がありません。', unavailable: '現在回答できません。後でもう一度お試しください。' },
  destinations: { jelgava: { name: 'イェルガヴァ宮殿', location: 'イェルガヴァ、ラトビア', description: '18世紀にラストレッリが設計したバルト地域最大のバロック宮殿で、現在は大学として使われています。' }, ruins: { name: '公園の遺跡', location: 'アルダラ、ラトビア', description: 'ラトビアの公園で、主要な道から離れた木々の中に残る石塔です。' }, texel: { name: 'テセル島の海岸', location: 'テセル島、オランダ', description: '潮の満ち引きが砂に波模様を描く、テセル島の広い砂浜です。' }, rhine: { name: 'ライン川岸', location: 'ケルン・ローデンキルヒェン・4つの視点', description: 'ケルン中心部の南、ローデンキルヒェンにある砂浜と川沿いの森です。矢印またはW/Sで4つの視点を移動し、A/Dで回転します。' } },
  viewpoints: { jelgava: { title: 'イェルガヴァ宮殿' }, ruins: { title: '公園の遺跡' }, texel: { title: 'テセル島の海岸' }, rhineSand: { title: '砂浜と大きな木' }, rhineRiver: { title: '川岸に沿って' }, rhineCanopy: { title: '木々の下' }, rhineTrail: { title: '森の小道' } },
  navigation: { alongRiver: '川に沿って', backToSand: '砂浜へ戻る', underTrees: '木々の下へ', toRiver: '川岸へ', forestTrail: '森の小道', backToCanopy: '木々の下へ戻る' },
  hotspots: { jelgava: { arch: { title: '中央アーチ', description: '赤レンガと白い縁取りのファサードの間から中庭へ続きます。' }, east: { title: '東棟', description: 'アーチ窓が整然と並ぶ長い建物です。' } }, ruins: { tower: { title: '残された石塔', description: '数階分の高さの石壁が木々に囲まれています。' }, stones: { title: '遺跡周辺の石', description: '塔の足元に自然石が散らばり、歩きにくくなっています。' } }, texel: { dunes: { title: '遠くの砂丘', description: '低い砂丘が地平線に沿って続きます。' }, waves: { title: '海の波', description: '小さな波が絶えず砂浜へ届きます。' } }, rhine: { tree: { title: '川辺の大木', description: '広い樹冠の一本の木が砂浜に立っています。' }, water: { title: 'ライン川', description: '川は右へ伸び、遠くの対岸は緑に覆われています。' }, houses: { title: '川辺の家', description: '小さな家々が水辺から少し離れた草地の後ろにあります。' }, surface: { title: 'ライン川の水面', description: '穏やかな水面の向こうに濃緑の対岸が見えます。' }, trees: { title: '岸辺の木々', description: '高い木々が水際に育ち、浜の一部に影を落としています。' }, trunk: { title: '古い木の幹', description: '視点のすぐそばに大きな幹があり、枝が空を覆っています。' }, bike: { title: '小道の自転車', description: '森を通る砂の小道の横に自転車が置かれています。' } } },
  discover: discoverJa,
}

// data/characters.ts

export interface Character {
  id: string;
  name: string;
  catchphrase: string; // キャッチコピー/一言紹介
  description: string; // 性格や特徴のまとめ（キャラクター説明文）
  image?: string; // 全身立ち絵
  thumbnail?: string; // 顔グラ（一覧用）
  // ★ここから新しい項目を追加するよ！
  gender?: '男性' | '女性' | '不明' | 'その他';
  occupation?: string; // 職業
  birthday?: string; // 誕生日 (例: '05/05' の形式で)
  age?: number | '不明'; // 年齢（数字）または「不明」
  colorcode?: string; // カラーコード（キャラクターの色を表すコード）
  height?: string; // 身長 (例: '175cm')
  weight?: string; // 体重 (例: '65kg')
  likes?: string[]; // 好きなもの/こと (例: ['歌', 'ダンス', '甘いもの'])
  dislikes?: string[]; // 苦手なもの/こと (例: ['お昼寝', '怖い話'])
  specialSkill?: string; // 特技/能力
  quirk?: string; // 一人称
  origin?: string; // 出身地/生い立ち (※クリックで表示される形式も検討)
  relatedCharacters?: string[]; // 関連キャラクターのIDリスト (例: ['char002'])
  appearingWorks?: string; // 登場作品 (例: 'オリジナル小説「夜鍋物語」')
  trivia?: string; // 豆知識/裏話 (※クリックで表示される形式（タブ、アコーディオンなど）)
  expressions?: { // 表情差分（複数可）
    name: string; // 表情の名前 (例: '笑顔', '怒り', '驚き')
    src: string;  // 画像のパス (例: '/images/char001-smile.png')
  }[]; // 複数の表情差分を持つリストだよ
  // ★ここまで追加だよ！
}

// 次に、既存のキャラクターデータにも、これらの新しい情報を追加していこう！
// 自分で作ったキャラクターに合わせて、情報を埋めてみてね！
export const characters: Character[] = [
  {
    id: 'char001',
    name: '高槻 隼人（たかつき はやと）',
    catchphrase: '「演劇だけが、退屈な僕の世界を照らす光だったんだ。」',
    description: '演劇が大好きな男の子。役者になるために、日々奮闘中。自分の過去も、現在も未来も不安だらけだ。それでも、悩みもがいた日々は決して無駄じゃない。それこそが、生きるということなのだから。「好き」という気持ちで前に進んだ彼の瞳には、もう迷いなど映らないだろう。',
    image: '/images/hayato-tachie.png', // 全身立ち絵
    thumbnail: '/images/hayato01.png', // 顔グラ
    gender: '男性',
    occupation: '俳優',
    birthday: '05/05',
    age: 17,
    colorcode: ['#7aadc8'],
    height: '176cm',
    weight: '62kg',
    likes: ['演劇'],
    dislikes: ['???????'],
    specialSkill: 'どんな時でも笑顔',
    quirk: '僕',
    origin: '遠い宇宙のキラキラ星から、笑顔を届けるために地球にやってきた。',
    relatedCharacters: ['char002'], // ハナちゃんと関連があることにしてみよう
    appearingWorks: 'キラキラ星物語',
    trivia: '実は早起きが苦手で、朝はいつもふしぎな森のハナに起こしてもらっている。',
    expressions: [ // 表情差分も追加してみよう！
      { name: '通常', src: '/images/hayato-tachie.png' }, // 通常の立ち絵を最初の表情に
      { name: '笑顔', src: '/images/hayato01.png' }, // 笑顔のイラストを準備してね
      { name: '驚き', src: '/images/hayato02.png' }, // 驚きのイラストを準備してね
    ],
  },
  {
    id: 'char002',
    name: 'ふしぎな森のハナ',
    catchphrase: '森の秘密は私の心の中',
    description: '物静かで、ちょっぴり恥ずかしがり屋の女の子。動物たちと話すことができる不思議な力を持っている。',
    image: '/images/char002-full.png',
    thumbnail: '/images/char002-face.png',
    gender: '女性',
    occupation: '森の守り人',
    birthday: '08/10',
    age: 16,
    height: '145cm',
    weight: '40kg',
    likes: ['森の散歩', '小鳥のさえずり', 'ベリー'],
    dislikes: ['大きな音', '人混み'],
    specialSkill: '動物と会話',
    quirk: '「しーっ、森が聞こえているよ」',
    origin: '森の奥深くで生まれた。植物や動物たちに囲まれて育ったため、人間社会には疎い。',
    relatedCharacters: ['char001'], // タロウくんと関連があることにしてみよう
    appearingWorks: '森のささやき',
    trivia: '実はキラキラ星のタロウの歌が大好きで、こっそり木陰で聞いている。',
    expressions: [
      { name: '通常', src: '/images/char002-full.png' },
      { name: 'はにかみ', src: '/images/char002-shy.png' },
    ],
  },

  {
    id: 'char003',
    name: 'ふしぎな森のハナ',
    catchphrase: '森の秘密は私の心の中',
    description: '物静かで、ちょっぴり恥ずかしがり屋の女の子。動物たちと話すことができる不思議な力を持っている。',
    image: '/images/char002-full.png',
    thumbnail: '/images/char002-face.png',
    gender: '女性',
    occupation: '森の守り人',
    birthday: '08/10',
    age: 16,
    height: '145cm',
    weight: '40kg',
    likes: ['森の散歩', '小鳥のさえずり', 'ベリー'],
    dislikes: ['大きな音', '人混み'],
    specialSkill: '動物と会話',
    quirk: '「しーっ、森が聞こえているよ」',
    origin: '森の奥深くで生まれた。植物や動物たちに囲まれて育ったため、人間社会には疎い。',
    relatedCharacters: ['char001'], // タロウくんと関連があることにしてみよう
    appearingWorks: '森のささやき',
    trivia: '実はキラキラ星のタロウの歌が大好きで、こっそり木陰で聞いている。',
    expressions: [
      { name: '通常', src: '/images/char002-full.png' },
      { name: 'はにかみ', src: '/images/char002-shy.png' },
    ],
  },
  // 他のキャラクターも、上記のように新しい項目に情報を追加してみてね！
  // 特に表情差分の画像ファイルは、public/imagesフォルダにちゃんと置いてね！
];
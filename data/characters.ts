// data/characters.ts

// ここで、キャラクター一人の情報の「設計図」を作ろう！
// これを「インターフェース (interface)」って呼ぶんだ。
// 「Character」っていう名前の自己紹介カードは、こんな項目を持ってて、こんな種類の情報が入るよ！って決めるんだ。
export interface Character {
    id: string; // キャラクターの識別番号。これは「文字（string）」だよ
    name: string; // キャラクターの名前も「文字（string）」だよ
    catchphrase: string; // 一言紹介も「文字（string）」だよ
    description: string; // 性格や特徴も「文字（string）」だよ
    // 「?」がついている項目は、今は無くてもOKだよ、って意味だよ。
    // 後で画像を用意するときに使うから、先に入れておこうね。
    image?: string; // 全身イラストの場所（今は無くてもOK）
    thumbnail?: string; // サムネイルイラストの場所（今は無くてもOK）
  
    // 他にも「サイトに載せたいキャラクター情報」の項目を、ここに型として追加していけるよ！
    // 例:
    // height?: string;    // 身長は「文字」でいいかな？
    // birthday?: string;  // 誕生日も「文字」でいいかな？
    // likes?: string[];   // 好きなものは複数あるかもしれないから、「文字のリスト（配列）」にするよ
    // dislikes?: string[]; // 苦手なものも「文字のリスト」にするよ
    // specialSkill?: string; // 特技は「文字」かな
    // catchphrase?: string; // 口癖も「文字」
    // origin?: string; // 出身地も「文字」
    // relatedCharacters?: string[]; // 関連キャラクターは「キャラクターIDのリスト」にする？
  }
  
  // これは、キャラクターの情報をたくさん入れる箱だよ
  // この箱の中には、「Character」っていう設計図に合った自己紹介カードだけが入るよ！ってことを教えてあげるんだ。
  // 「: Character[]」が「Characterの設計図に合うカードのリストだよ」っていう意味なんだ。
  export const characters: Character[] = [
    {
      id: 'char001', // idはさっき決めた設計図通り「文字」だね
      name: 'キラキラ星のタロウ', // nameも「文字」だね
      catchphrase: 'みんなに笑顔を届けたい！', // catchphraseも「文字」
      description: 'いつも明るく元気な男の子。困っている人がいたら放っておけない優しい心を持っているよ。歌とダンスが大好き！', // descriptionも「文字」
       image: '/images/hayato01.png', // まだ画像がなくても、設計図では「無くてもOK」にしてあるからエラーにならないよ
       thumbnail: '/images/hayato02.png',
    },
    // もし、もう一人キャラクターがいるなら、こんな風にカンマで区切って追加していくんだ
    // {
    //   id: 'char002',
    //   name: 'ふしぎな森のハナ',
    //   catchphrase: '森の秘密は私の心の中',
    //   description: '物静かで、ちょっぴり恥ずかしがり屋の女の子。動物たちと話すことができる不思議な力を持っている。',
    // },
  ];
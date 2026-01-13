// data/galleryImages.ts

// ギャラリー画像一人の情報の「設計図」を作ろう！
export interface GalleryImage {
    id: string; // 画像の識別番号
    src: string; // 画像のパス
    alt: string; // 画像が表示されないときの文字
    width: number; // 画像の元の幅（ピクセル数）
    height: number; // 画像の元の高さ（ピクセル数）
  }
  
  // ギャラリー画像をたくさん入れる箱だよ
  export const galleryImages: GalleryImage[] = [
    {
      id: 'gal001',
      src: '/images/top.jpeg', // ★君が置いたパスとファイル名に合わせてね！
      alt: 'サイトトップ画像',
      width: 1920, // 例: 画像の実際の幅
      height: 1080, // 例: 画像の実際の高さ
    },
    {
      id: 'gal002',
      src: '/gallery/01.png',
      alt: '志海未來',
      width: 600,
      height: 900, // これは縦長の画像の例
    },
    {
      id: 'gal003',
      src: '/gallery/02.jpeg',
      alt: '高槻隼人「ずうっといっしょ！」パロ',
      width: 1000,
      height: 750,
    },
    {
      id: 'gal004',
      src: '/gallery/03.png',
      alt: '舞台の上',
      width: 1000,
      height: 750,
    },
    // もっとたくさん画像があれば、カンマで区切って追加していこう！
  ];
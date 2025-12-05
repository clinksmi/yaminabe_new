// src/app/layout.tsx

// グローバルCSSをインポートする場所だよ
import './globals.css';

// ★フォントをインポート
import { Megrim, Zen_Kaku_Gothic_Antique } from 'next/font/google';

// Sidebarコンポーネントをインポートするよ！
import Sidebar from '../components/Sidebar'; // ★ここを追加！
import ScrollToTop from '../components/ScrollToTop'; // ★ScrollToTopを追加！
import Footer from '../components/Footer'; // ★Footerを追加！

// ★Megrimの設定（スタイリッシュなフォント、サイドバーとフッターに使用）
const megrimFont = Megrim({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-megrim',
  display: 'swap',
});

// ★Zen Kaku Gothic Antiqueの設定（日本語用、本文に使用）
const zenKakuGothicAntique = Zen_Kaku_Gothic_Antique({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-zen-kaku',
  display: 'swap',
});

// メタデータの設定。サイトのタイトルとか説明とかを書くところだよ
export const metadata = {
  title: 'やみなべっ！',
  description: 'クトゥルフ神話TRPGの通りすがり探索者たちのキャラクターアーカイブサイト',
};

// これは、サイト全体の共通レイアウトを作るための「お店」だよ
export default function RootLayout({
  children, // childrenは、各ページ（page.tsx）の中身がここに入るよ、という意味だよ
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${megrimFont.variable} ${zenKakuGothicAntique.variable}`}>
      <body className={zenKakuGothicAntique.className}>
        {/* ★ここからSidebarを配置するよ！ */}
        <Sidebar />
        {/* children（各ページの内容）を、Sidebarの隣に表示させるために、
            少し右にずらすためのdivで囲むよ。w-64はSidebarの幅と同じにしているんだ。 */}
        <div className="ml-64"> {/* Sidebarの幅（w-64）分だけ右にマージンを作るよ */}
          <div className="backdrop-blur-custom min-h-screen">
            {children}
          </div>
          {/* ★Footerを追加 */}
          <Footer />
        </div>
        {/* ★ScrollToTopボタンを追加 */}
        <ScrollToTop />
        {/* ★ここまで追加だよ */}
      </body>
    </html>
  );
}
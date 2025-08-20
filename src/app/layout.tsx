// src/app/layout.tsx

// グローバルCSSをインポートする場所だよ
import './globals.css';

// Sidebarコンポーネントをインポートするよ！
import Sidebar from '../components/Sidebar'; // ★ここを追加！

// メタデータの設定。サイトのタイトルとか説明とかを書くところだよ
export const metadata = {
  title: 'やみなべ！', // ここを君のサイトのタイトルに変えてもいいよ！
  description: '私のオリジナルキャラクターの情報を集めたサイトです。',
};

// これは、サイト全体の共通レイアウトを作るための「お店」だよ
export default function RootLayout({
  children, // childrenは、各ページ（page.tsx）の中身がここに入るよ、という意味だよ
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja"> {/* 日本語サイトだよ、って意味だよ */}
      <body>
        {/* ★ここからSidebarを配置するよ！ */}
        <Sidebar />
        {/* children（各ページの内容）を、Sidebarの隣に表示させるために、
            少し右にずらすためのdivで囲むよ。w-64はSidebarの幅と同じにしているんだ。 */}
        <div className="ml-64"> {/* Sidebarの幅（w-64）分だけ右にマージンを作るよ */}
          {children}
        </div>
        {/* ★ここまで追加だよ */}
      </body>
    </html>
  );
}
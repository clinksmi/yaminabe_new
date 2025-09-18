// src/components/Sidebar.tsx

// リンクをNext.jsの魔法のリンクにするためにインポートするよ
import Link from 'next/link';

// これは、サイトのメニューを作るための「部品」だよ
const Sidebar = () => {
  return (
    // サイドバー全体を入れる大きな箱（divタグ）
    // Tailwind CSSで、左側に固定して、背景色をつけ、影をつけるよ
    // w-64 は幅のサイズ。fixedは画面に固定。left-0は左端にくっつける。
    // h-screenは画面の高さ全体。bg-gray-800は濃い灰色。text-whiteは文字を白に。
    // p-4は内側の余白。shadow-lgは大きな影。z-10は他の要素より手前に表示させるための層の深さ。
    <div className="w-64 fixed left-0 top-0 h-screen bg-gray-800 text-white p-4 shadow-lg z-10">
      <h2 className="text-3xl font-bold mb-8 text-center">メニュー</h2> {/* サイドバーのタイトル */}
      <nav>
        <ul className="space-y-4"> {/* メニュー項目間の隙間を作るよ */}
          <li>
            {/* Linkタグを使って、各ページへのリンクを作るよ */}
            <Link href="/" className="block p-2 rounded hover:bg-gray-700 transition-colors">
              TOP
            </Link>
          </li>
          <li>
            <Link href="/characters" className="block p-2 rounded hover:bg-gray-700 transition-colors">
              キャラクター一覧
            </Link>
          </li>
          <li>
            <Link href="/line-log" className="block p-2 rounded hover:bg-gray-700 transition-colors">
              ルームログ一覧
            </Link>
          </li>
          <li>
            {/* まだ作ってないページだけど、とりあえずリンクだけ作っておこう！ */}
            <Link href="/gallery" className="block p-2 rounded hover:bg-gray-700 transition-colors">
              ギャラリー
            </Link>
          </li>
          <li>
            {/* まだ作ってないページだけど、とりあえずリンクだけ作っておこう！ */}
            <Link href="/search" className="block p-2 rounded hover:bg-gray-700 transition-colors">
              検索
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

// この部品を他のファイルで使えるようにするおまじない
export default Sidebar;
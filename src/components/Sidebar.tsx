// src/components/Sidebar.tsx

'use client';

// リンクをNext.jsの魔法のリンクにするためにインポートするよ
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// これは、サイトのメニューを作るための「部品」だよ
const Sidebar = () => {
  const pathname = usePathname(); // 現在のパスを取得

  // メニュー項目の配列
  const menuItems = [
    { href: '/', label: 'Top' },
    { href: '/about', label: 'About' },
    { href: '/characters', label: 'Character' },
    { href: '/line-log', label: 'Log' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/search', label: 'Search' },
  ];

  return (
    <div className="w-64 fixed left-0 top-0 h-screen text-gray-800 p-6 shadow-lg z-10" style={{ backgroundColor: '#e7e7e7' }}>
      {/* ロゴとメニュータイトル */}
      <Link href="/" className="mb-10 flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
        <Image
          src="/rogo/chaos-yaminabe-logo.png"
          alt="カオス！やみなべっ！ロゴ"
          width={48}
          height={48}
          className="inline-block"
        />
        <h2 className="text-2xl font-bold font-[family-name:var(--font-megrim)]" style={{ color: '#080eb4' }}>Menu</h2>
      </Link>

      {/* ナビゲーション */}
      <nav>
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    button-neomorphism
                    font-[family-name:var(--font-megrim)]
                    ${isActive ? 'button-neomorphism-active' : ''}
                  `}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

// この部品を他のファイルで使えるようにするおまじない
export default Sidebar;
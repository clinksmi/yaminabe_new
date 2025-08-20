// src/app/page.tsx

'use client';

import { Character, characters } from '../../data/characters';
import Link from 'next/link'; // ★これだけ追加するよ！

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">キャラクター一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character: Character) => (
          <div key={character.id} className="border p-4 rounded-lg shadow-md">
               {character.thumbnail && ( // thumbnailがある時だけ表示するよ
              <img
                src={character.thumbnail} // サムネイル画像のパス
                alt={`${character.name}のサムネイル`} // 画像が表示されないときの文字
                className="w-24 h-24 object-cover rounded-full mb-4 shadow-sm" // Tailwind CSSで丸くして影をつける
              />
            )}
            <h2 className="text-2xl font-semibold mb-2">{character.name}</h2>
            {character.catchphrase && (
              <p className="text-gray-600 italic">{character.catchphrase}</p>
            )}
            <p className="mt-4 text-blue-500 hover:underline">
              {/* ★ここを<a>タグからLinkコンポーネントに変えるよ！ */}
              {/* Linkのhrefには、個別ページのURLを渡してあげるんだ */}
              <Link href={`/characters/${character.id}`}>詳細を見る</Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
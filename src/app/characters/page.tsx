// src/app/characters/page.tsx (新しく作るファイル)

'use client';

// ここにキャラクターデータとLink, Imageコンポーネントをインポートするよ！
// src/app/characters/page.tsx から見ると、dataフォルダーは ../../data になるよ
import { Character, characters } from '../../../data/characters'; // ★パスを調整！
import Link from 'next/link';
import Image from 'next/image';

const CharactersListPage = () => { // ページの名前をCharactersListPageにしたよ
  return (
    <div className="container mx-auto p-4">
      {/* ここに見出しを追加するよ */}
      <h1 className="text-4xl font-bold text-center my-8">キャラクター一覧</h1>

      {/* さっき src/app/page.tsx から切り取ったコードをここに貼り付けるよ！ */}
      <div className="flex flex-wrap justify-center gap-6 pb-8">
        {characters.map((character: Character) => (
          <div key={character.id} className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center text-center">
            {character.thumbnail && (
              <Image
                src={character.thumbnail}
                alt={`${character.name}のサムネイル`}
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded-full mb-4 shadow-sm"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{character.name}</h2> {/* h2に変更 */}
            {character.catchphrase && (
              <p className="text-gray-600 text-sm italic mb-4">{character.catchphrase}</p>
            )}
            <p className="mt-auto text-blue-500 hover:underline">
              <Link href={`/characters/${character.id}`}>詳細を見る</Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharactersListPage; // ページの名前をエクスポートするよ
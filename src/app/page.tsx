// src/app/page.tsx

// ★ここだよ！一番上に移動させるんだ！★
'use client'; // この魔法の言葉が一番上に来るようにするよ

// その後にimport文が続くんだ
import { Character, characters } from '../../data/characters';

// これは、サイトのトップページを作るための「お店」みたいなものだよ
const HomePage = () => {
  return (
    // ...（この下は変更なし）
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">キャラクター一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character: Character) => (
          <div key={character.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{character.name}</h2>
            {character.catchphrase && (
              <p className="text-gray-600 italic">{character.catchphrase}</p>
            )}
            <p className="mt-4 text-blue-500 hover:underline">
              <a href={`/characters/${character.id}`}>詳細を見る</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

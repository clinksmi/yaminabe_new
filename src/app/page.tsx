// src/app/page.tsx

'use client';

// ★キャラクターデータとキャラクターの設計図をインポートするよ！
import { Character, characters } from '../../data/characters';
import Link from 'next/link';
import Image from 'next/image';

// ★ここに、キャラクターのリストからランダムに指定の数を取る魔法の関数を作るよ！
const getRandomCharacters = (allCharacters: Character[], count: number): Character[] => {
  // まずは、元のリストをコピーして、ごちゃ混ぜにする準備をするよ。
  // `Math.random() - 0.5` を使うと、ランダムに並べ替えることができるんだ。
  const shuffled = [...allCharacters].sort(() => 0.5 - Math.random());
  // 並べ替えたリストの最初から、指定された数（count）だけ取り出すよ。
  return shuffled.slice(0, count);
};

const HomePage = () => {
  // ★ここでランダムなキャラクターを3人選ぶよ！
  const randomCharacters = getRandomCharacters(characters, 3);

  return (
    <div className="container mx-auto p-4">
      <section className="text-center my-8">
        <Image
          src="/images/image-kari.jpeg"
          alt="サイトのメインビジュアル"
          width={1920}
          height={1080}
          className="w-full h-80 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-lg mb-8 mx-auto"
        />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">ようこそ、混沌の円卓へ。</h1>
        <p className="text-xl text-gray-600 mb-8">
          通りすがり探索者まとめサイト「やみなべ」です
        </p>
      </section>

      {/* ★ここから、ランダムに選ばれたキャラクターを表示する部分を追加するよ！ */}
      <h2 className="text-4xl font-bold text-center my-8">やみなべの仲間たち</h2>

      {/* キャラクターカードのレイアウトは、前のキャラクター一覧ページと同じようにするよ */}
      {/* ただし、ここでは常に3枚表示させたいので、横幅の指定を少し調整するね。 */}
      <div className="flex flex-wrap justify-center gap-6 pb-8">
        {/* mapするデータが characters から randomCharacters に変わるよ！ */}
        {randomCharacters.map((character: Character) => (
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
            <h3 className="text-xl font-semibold mb-2">{character.name}</h3>
            {character.catchphrase && (
              <p className="text-gray-600 text-sm italic mb-4">{character.catchphrase}</p>
            )}
            <p className="mt-auto text-blue-500 hover:underline">
              <Link href={`/characters/${character.id}`}>詳細を見る</Link>
            </p>
          </div>
        ))}
        {/* ★ここまで追加だよ！ */}
      </div>
    </div>
  );
};

export default HomePage;
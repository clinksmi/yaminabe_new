// src/app/page.tsx

'use client';

// ★キャラクターデータとキャラクターの設計図をインポートするよ！
import { Character, characters } from '../../data/characters';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// ★ここに、キャラクターのリストからランダムに指定の数を取る魔法の関数を作るよ！
const getRandomCharacters = (allCharacters: Character[], count: number): Character[] => {
  // まずは、元のリストをコピーして、ごちゃ混ぜにする準備をするよ。
  // `Math.random() - 0.5` を使うと、ランダムに並べ替えることができるんだ。
  const shuffled = [...allCharacters].sort(() => 0.5 - Math.random());
  // 並べ替えたリストの最初から、指定された数（count）だけ取り出すよ。
  return shuffled.slice(0, count);
};

const HomePage = () => {
  // ★ここでランダムなキャラクターを3人選ぶよ！（初期値は空配列）
  const [randomCharacters, setRandomCharacters] = useState<Character[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isReload, setIsReload] = useState(false);

  // リロード検知
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('isReloading', 'true');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // クライアントサイドでのみランダム選択を実行
  useEffect(() => {
    // 初回訪問時またはリロード時のみローディングアニメーションを表示
    const isFirstVisit = !localStorage.getItem('hasVisited');
    const isReloading = sessionStorage.getItem('isReloading') === 'true';
    
    if (isReloading) {
      sessionStorage.removeItem('isReloading');
      setIsReload(true);
    }
    
    if (isFirstVisit || isReloading) {
      setShowLoading(true);
      
      // 初回訪問時のローディングアニメーション
      const welcomeTimer = setTimeout(() => {
        setShowWelcome(true);
      }, 500);

      const logoTimer = setTimeout(() => {
        setShowLogo(true);
      }, 3000);

      const contentTimer = setTimeout(() => {
        setShowContent(true);
        // 初回訪問フラグを設定
        localStorage.setItem('hasVisited', 'true');
      }, 4000);

      setRandomCharacters(getRandomCharacters(characters, 3));

      return () => {
        clearTimeout(welcomeTimer);
        clearTimeout(logoTimer);
        clearTimeout(contentTimer);
      };
    } else {
      // 通常の遷移の場合は即座にコンテンツを表示
      setShowContent(true);
      setRandomCharacters(getRandomCharacters(characters, 3));
    }
  }, []);

  // ローディング画面を表示（初回訪問時またはリロード時のみ）
  if (showLoading && !showContent) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 text-white z-50">
        <div className="text-center">
          {/* 両目がぱちぱちするアニメーション */}
          <div className="mb-8">
            <div className="eyes-container">
              <div className="eye relative">
                <div className="lid"></div>
              </div>
              <div className="eye relative">
                <div className="lid"></div>
              </div>
            </div>
          </div>
          
          {/* ようこそメッセージ */}
          <div className="welcome-message">
            <h1 className="text-4xl font-extrabold mb-4">ようこそ！</h1>
          </div>
        </div>
      </div>
    );
  }

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
        {randomCharacters.length > 0 ? (
          randomCharacters.map((character: Character) => (
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
          ))
        ) : (
          // ローディング状態
          <div className="w-full text-center py-8">
            <p className="text-gray-500">キャラクターを読み込み中...</p>
          </div>
        )}
        {/* ★ここまで追加だよ！ */}
      </div>
    </div>
  );
};

export default HomePage;
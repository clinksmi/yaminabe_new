// src/app/characters/[characterId]/page.tsx

'use client';

import { useState, useEffect } from 'react'; // useStateとuseEffectも使うよ
import { Character, characters } from '../../../../data/characters';
import Image from 'next/image';
import Link from 'next/link';

interface CharacterPageProps {
  params: {
    characterId: string;
  };
}

const CharacterPage = ({ params }: CharacterPageProps) => {
  const { characterId } = params;
  const character = characters.find((char) => char.id === characterId);

  // キャラクターの表情差分を管理するためのState
  const [currentExpression, setCurrentExpression] = useState(
    character?.expressions?.[0]?.src || character?.image || '' // 最初の表情差分がなければ全身絵をデフォルトにする
  );
  // アニメーション用のState
  const [animateImage, setAnimateImage] = useState(false);

  // アコーディオンの開閉状態を管理するState
  const [isOriginOpen, setIsOriginOpen] = useState(false); // 出身地/生い立ち
  const [isTriviaOpen, setIsTriviaOpen] = useState(false); // 豆知識/裏話


  // ページ読み込み時にアニメーションを開始
  useEffect(() => {
    setAnimateImage(true);
    // クリーンアップ関数: ページがアンマウントされる時にアニメーション状態をリセット
    return () => {
      setAnimateImage(false);
    };
  }, []); // ページ読み込み時に一度だけ実行


  if (!character) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">キャラクターが見つかりません...</h1>
        <p className="mt-4">ごめんね、そのIDのキャラクターはまだ登録されていないみたいだよ。</p>
        <p className="mt-8 text-blue-500 hover:underline">
          <Link href="/characters">一覧ページに戻る</Link> {/* /characters に戻るように変更 */}
        </p>
      </div>
    );
  }

  // 関連キャラクターの情報を取得するよ
  const relatedChars = character.relatedCharacters
    ? characters.filter(c => character.relatedCharacters?.includes(c.id))
    : [];


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8 mb-8">{character.name}</h1>
      <p className="text-xl text-center text-gray-700 mb-6 italic">{character.catchphrase}</p>

      {/* キャラクター詳細情報のメインレイアウト */}
      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-lg shadow-lg">
        {/* 左側: キャラクター立ち絵と表情差分 */}
        <div className="md:w-1/2 flex flex-col items-center">
          {currentExpression && (
            <Image
              src={currentExpression}
              alt={`${character.name}の立ち絵`}
              width={500} // 画像の最適な幅をここで指定 (君の画像に合わせて調整してね)
              height={800} // 画像の最適な高さをここで指定 (君の画像に合わせて調整してね)
              // アニメーションとレスポンシブ対応
              className={`w-full h-auto object-contain rounded-lg shadow-md mb-4
                          transform transition-transform duration-500 ease-out 
                          ${animateImage ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
                          delay-300`}
            />
          )}

          {/* 表情差分ギャラリー */}
          {character.expressions && character.expressions.length > 0 && (
            <div className="flex justify-start flex-wrap gap-2 mt-4 w-full pl-4">
              {character.expressions.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentExpression(exp.src)}
                  className={`border-2 p-1 rounded-lg transition-colors duration-200 
                              ${currentExpression === exp.src ? 'border-blue-500' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  <Image
                    src={exp.src}
                    alt={exp.name || '表情差分'}
                    width={100} // サムネイルの幅
                    height={100} // サムネイルの高さ
                    className="object-cover w-24 h-24 rounded"
                  />
                  {exp.name && <p className="text-sm mt-1 text-gray-700">{exp.name}</p>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 右側: 説明文と詳細情報 */}
        <div className="md:w-1/2">
          {/* プロフィール詳細 */}
          <h2 className="text-3xl font-bold mb-3">プロフィール</h2>
          {/* ここをグリッドレイアウトで全てのプロフィール項目を並べるよ！ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg mb-6">
            {character.gender && <p><strong>性別:</strong> {character.gender}</p>}
            {character.occupation && <p><strong>職業ベース:</strong> {character.occupation}</p>}
            {character.birthday && <p><strong>誕生日:</strong> {character.birthday}</p>}
            {character.age !== undefined && character.age !== null && <p><strong>年齢:</strong> {character.age}</p>}
            {character.height && <p><strong>身長:</strong> {character.height}</p>}
            {character.weight && <p><strong>体重:</strong> {character.weight}</p>}
            {character.specialSkill && <p><strong>特技:</strong> {character.specialSkill}</p>}
            {character.quirk && <p><strong>一人称:</strong> {character.quirk}</p>}
            {character.appearingWorks && <p><strong>登場作品:</strong> {character.appearingWorks}</p>}
            {character.likes && character.likes.length > 0 && <p><strong>好きなもの:</strong> {character.likes.join(', ')}</p>}
            {character.dislikes && character.dislikes.length > 0 && <p><strong>苦手なもの:</strong> {character.dislikes.join(', ')}</p>}
            
            {/* ★イメージカラーをここに移動するよ！苦手なものの右隣になるように！ */}
            {character.colorcode && ( // colorCodeプロパティを使用
              <p className="flex items-center"> {/* flexとitems-centerで内容を横並び中央揃えにする */}
                <strong>イメージカラー:</strong>
                <span className="inline-flex items-center ml-2"> {/* インライン要素で横並び、左に少し余白 */}
                  <span
                    className="w-6 h-6 rounded-full border border-gray-300 inline-block align-middle mr-2" // 小さめの丸い色ブロック
                    style={{ backgroundColor: character.colorcode }} // カラーコードを背景色に設定
                  ></span>
                  {character.colorcode} {/* カラーコードの文字列も表示 */}
                </span>
              </p>
            )}
          </div>
          
          {/* キャラクター説明文 */}
          <h2 className="text-3xl font-bold mb-3">キャラクター説明</h2>
          <p className="text-gray-800 mb-6 whitespace-pre-line">{character.description}</p>
          
          {/* 出身地/生い立ちのアコーディオン */}
          {character.origin && (
            <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
              <h3
                className="text-xl font-bold p-4 bg-gray-100 cursor-pointer flex justify-between items-center hover:bg-gray-200 transition-colors"
                onClick={() => setIsOriginOpen(!isOriginOpen)}
              >
                生い立ちを見る
                <span className="text-2xl transform transition-transform duration-200">
                  {isOriginOpen ? '▲' : '▼'}
                </span>
              </h3>
              {isOriginOpen && (
                <p className="p-4 text-gray-700 whitespace-pre-line">{character.origin}</p>
              )}
            </div>
          )}

          {/* 豆知識/裏話のアコーディオン */}
          {character.trivia && (
            <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
              <h3
                className="text-xl font-bold p-4 bg-gray-100 cursor-pointer flex justify-between items-center hover:bg-gray-200 transition-colors"
                onClick={() => setIsTriviaOpen(!isTriviaOpen)}
              >
                裏話を見る
                <span className="text-2xl transform transition-transform duration-200">
                  {isTriviaOpen ? '▲' : '▼'}
                </span>
              </h3>
              {isTriviaOpen && (
                <p className="p-4 text-gray-700 whitespace-pre-line">{character.trivia}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 関連キャラクター (個別ページ下部に表示) */}
      {relatedChars.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">関連キャラクター</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {relatedChars.map((relChar) => (
              <Link key={relChar.id} href={`/characters/${relChar.id}`} className="block">
                <div className="w-40 p-3 border border-gray-200 rounded-lg shadow-sm flex flex-col items-center text-center hover:bg-gray-50 transition-colors">
                  {relChar.thumbnail && (
                    <Image
                      src={relChar.thumbnail}
                      alt={relChar.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-full mb-2"
                    />
                  )}
                  <p className="font-semibold text-lg">{relChar.name}</p>
                  {relChar.catchphrase && <p className="text-sm text-gray-500">{relChar.catchphrase}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 一覧ページに戻るリンク */}
      <p className="mt-8 text-blue-500 hover:underline text-center">
        <Link href="/characters">一覧ページに戻る</Link>
      </p>
    </div>
  );
};

export default CharacterPage;
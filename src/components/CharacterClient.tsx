'use client';

import { useState } from 'react';
import { Character, characters } from '../../data/characters';
import Image from 'next/image';
import Link from 'next/link';
import RadarChart from './RadarChart';

// ログがあるキャラクターのリストとログ一覧でのタブ名の対応
const charactersWithLogs: { [key: string]: string } = {
  'char001': 'hayato', // 高槻隼人
  'char002': 'shion',  // 大田志音
  'char003': 'miku',   // 志海未來
  'char006': 'shion'   // 見酉玲夜（志音のログ一覧に遷移）
};

interface CharacterClientProps {
  character: Character;
  characterId: string;
}

export default function CharacterClient({ character, characterId }: CharacterClientProps) {
  // キャラクターの表情差分を管理するためのState
  const [currentExpression, setCurrentExpression] = useState(
    character?.expressions?.[0]?.src || character?.image || '' // 最初の表情差分がなければ全身絵をデフォルトにする
  );

  // アコーディオンの開閉状態を管理するState
  const [isAccordion1Open, setIsAccordion1Open] = useState(false); // 通過したシナリオ詳細
  const [isAccordion2Open, setIsAccordion2Open] = useState(false); // 過去のCS
  const [isAccordion3Open, setIsAccordion3Open] = useState(false); // 登場作品

  // 関連キャラクターの情報を取得するよ
  const relatedChars = character.relatedCharacters
    ? characters.filter(c => character.relatedCharacters?.includes(c.id))
    : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold my-8 text-custom-blue">Character</h1>

      {/* キャラクター詳細情報のメインレイアウト */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左側: キャラクター立ち絵と表情差分 */}
        <div className="md:w-1/2 flex flex-col items-center">
          {currentExpression && (
            <Image
              src={currentExpression}
              alt={`${character.name}の立ち絵`}
              width={500}
              height={800}
              className="w-full h-auto object-contain rounded-lg shadow-md mb-4"
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
                              ${currentExpression === exp.src ? 'border-custom-blue' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  <Image
                    src={exp.src}
                    alt={exp.name || '表情差分'}
                    width={100}
                    height={100}
                    className="object-cover w-24 h-24 rounded"
                  />
                  {exp.name && <p className="text-sm mt-1 text-gray-700">{exp.name}</p>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 右側: 情報エリア - 全体を1つの大きな枠で囲む */}
        <div className="md:w-1/2">
          <div className="border-4 border-custom-blue p-6 bg-white">
            {/* 上段: 名前+ステータスとレーダーチャート */}
            <div className="flex items-start gap-8 mb-6">
              {/* 左側: 名前とステータス */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4 text-custom-blue">{character.name}</h2>
                
                {/* ステータス欄 - 2列に分割 */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-base">
                  {/* 左列 */}
                  <div className="space-y-2">
                    {character.gender && <p><strong>性別:</strong> {character.gender}</p>}
                    {character.occupation && <p><strong>職業:</strong> {character.occupation}</p>}
                    {character.birthday && <p><strong>誕生日:</strong> {character.birthday}</p>}
                    {character.age !== undefined && character.age !== null && <p><strong>年齢:</strong> {character.age}</p>}
                    {character.height && <p><strong>身長:</strong> {character.height}</p>}
                  </div>
                  
                  {/* 右列 */}
                  <div className="space-y-2">
                    {character.weight && <p><strong>体重:</strong> {character.weight}</p>}
                    {character.quirk && <p><strong>一人称:</strong> {character.quirk}</p>}
                    {character.specialSkill && <p><strong>特技:</strong> {character.specialSkill.join('、')}</p>}
                    {character.likes && character.likes.length > 0 && <p><strong>好き:</strong> {character.likes.join('、')}</p>}
                    {character.dislikes && character.dislikes.length > 0 && <p><strong>苦手:</strong> {character.dislikes.join('、')}</p>}
                  </div>
                </div>
              </div>
              
              {/* 右側: レーダーチャート */}
              {character.stats && character.stats.length > 0 && (
                <div className="flex flex-col items-center">
                  <p className="text-sm mb-2">レーダーチャート</p>
                  <RadarChart stats={character.stats} />
                </div>
              )}
            </div>

            {/* 中段: 説明文 */}
            <div className="mb-6 border-t-2 border-custom-blue pt-6">
              <h3 className="text-lg font-bold mb-3 text-custom-blue">説明文</h3>
              <div className="text-sm whitespace-pre-line leading-relaxed">
                <p className="mb-3 italic text-gray-700">{character.catchphrase}</p>
                <p>{character.description}</p>
              </div>
            </div>

            {/* 下段: 3つのアコーディオン */}
            <div className="grid grid-cols-3 gap-4 border-t-2 border-custom-blue pt-6">
              {/* アコーディオン1: 通過したシナリオ詳細 */}
              {character.trivia && (
                <div className="border-2 border-custom-blue bg-white">
                  <button
                    onClick={() => setIsAccordion1Open(!isAccordion1Open)}
                    className="w-full p-3 text-center text-sm font-bold text-custom-blue hover:bg-gray-100 transition-colors"
                  >
                    通過したシナリオ詳細
                  </button>
                  {isAccordion1Open && (
                    <div className="p-3 border-t-2 border-custom-blue text-xs whitespace-pre-line max-h-60 overflow-y-auto">
                      {character.trivia}
                    </div>
                  )}
                </div>
              )}
              
              {/* アコーディオン2: 過去のCS */}
              {character.origin && (
                <div className="border-2 border-custom-blue bg-white">
                  <button
                    onClick={() => setIsAccordion2Open(!isAccordion2Open)}
                    className="w-full p-3 text-center text-sm font-bold text-custom-blue hover:bg-gray-100 transition-colors"
                  >
                    過去のCS・裏話
                  </button>
                  {isAccordion2Open && (
                    <div className="p-3 border-t-2 border-custom-blue text-xs whitespace-pre-line max-h-60 overflow-y-auto">
                      {character.origin}
                    </div>
                  )}
                </div>
              )}
              
              {/* アコーディオン3: 登場作品 */}
              {character.appearingWorks && character.appearingWorks.length > 0 && (
                <div className="border-2 border-custom-blue bg-white">
                  <button
                    onClick={() => setIsAccordion3Open(!isAccordion3Open)}
                    className="w-full p-3 text-center text-sm font-bold text-custom-blue hover:bg-gray-100 transition-colors"
                  >
                    登場作品
                  </button>
                  {isAccordion3Open && (
                    <div className="p-3 border-t-2 border-custom-blue text-xs max-h-60 overflow-y-auto">
                      <div className="space-y-1">
                        {character.appearingWorks.map((work, index) => (
                          <p key={index}>・{work}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ログ一覧と関連キャラクターを横並びに */}
          {(charactersWithLogs[characterId] || relatedChars.length > 0) && (
            <div className="mt-6 grid grid-cols-2 gap-6">
              {/* ログ一覧ボタン（ログがあるキャラクターのみ） */}
              {charactersWithLogs[characterId] && (
                <div className="border-4 border-custom-blue p-6 bg-white">
                  <h2 className="text-2xl font-bold mb-4 text-custom-blue">ログ一覧</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {characterId === 'char006' 
                      ? '見酉玲夜のTRPGログを確認できます（志音のログに参加）'
                      : `${character.name}のTRPGログを確認できます`
                    }
                  </p>
                  <Link 
                    href={`/line-log?tab=${charactersWithLogs[characterId]}`}
                    className="inline-block w-full text-center text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                    style={{ backgroundColor: '#080eb4' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0610a0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#080eb4'}
                  >
                    {characterId === 'char006' ? '志音のログ一覧を見る' : 'ログ一覧を見る'}
                  </Link>
                </div>
              )}

              {/* 関連キャラクター */}
              {relatedChars.length > 0 && (
                <div className="border-4 border-custom-blue p-6 bg-white">
                  <h2 className="text-2xl font-bold mb-4 text-custom-blue">関連キャラクター</h2>
                  <div className="flex flex-wrap gap-4">
                    {relatedChars.map((relChar) => (
                      <Link key={relChar.id} href={`/characters/${relChar.id}`} className="block">
                        <div className="w-32 p-3 border-2 border-gray-300 rounded-lg flex flex-col items-center text-center hover:border-custom-blue hover:bg-gray-50 transition-all">
                          {relChar.thumbnail && (
                            <Image
                              src={relChar.thumbnail}
                              alt={relChar.name}
                              width={64}
                              height={64}
                              className="w-16 h-16 object-cover rounded-full mb-2"
                            />
                          )}
                          <p className="font-semibold text-sm">{relChar.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 一覧ページに戻るリンク */}
      <p className="mt-8 text-blue-500 hover:underline text-center">
        <Link href="/characters">一覧ページに戻る</Link>
      </p>
    </div>
  );
}

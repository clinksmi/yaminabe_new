// src/app/characters/page.tsx

'use client';

import { Character, characters } from '../../../data/characters';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const CharactersListPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isScrolling) return;
    
    setIsScrolling(true);
    
    if (e.deltaY > 0) {
      setCurrentIndex((prev) => (prev + 1) % characters.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + characters.length) % characters.length);
    }
    
    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // 左右矢印キーでのブラウザの戻る/進むを無効化
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // タッチスクロールでのブラウザの戻る/進むを無効化
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // タッチ移動でのブラウザの戻る/進むを無効化
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // タッチ終了でのブラウザの戻る/進むを無効化
    e.preventDefault();
  };

  const handlePrevious = () => {
    if (isScrolling) return;
    setIsScrolling(true);
    setCurrentIndex((prev) => (prev - 1 + characters.length) % characters.length);
    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  const handleNext = () => {
    if (isScrolling) return;
    setIsScrolling(true);
    setCurrentIndex((prev) => (prev + 1) % characters.length);
    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  const getVisibleCards = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + characters.length) % characters.length;
      visible.push({ character: characters[index], index, position: i });
    }
    return visible;
  };

  return (
    <div className="bg-transparent flex flex-col h-full">
      {/* サイドバー */}
      
      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col">
        {/* ヘッダー部分 */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-megrim)]" style={{ color: '#080eb4' }}>Character</h1>
        </div>

        {/* カルーセルエリア - サイドバーを考慮した中央配置 */}
        <div 
          className="flex-1 flex items-center justify-center touch-none relative" 
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          tabIndex={0}
          style={{ touchAction: 'none' }}
        >
          {/* 左矢印ボタン */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 z-10 w-12 h-12 bg-white/80 hover:bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            disabled={isScrolling}
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* 右矢印ボタン */}
          <button
            onClick={handleNext}
            className="absolute right-4 z-10 w-12 h-12 bg-white/80 hover:bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            disabled={isScrolling}
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex gap-8 items-center justify-center">
          {getVisibleCards().map(({ character, position }) => (
            <Link 
              key={`${character.id}-${position}`} 
              href={`/characters/${character.id}`}
              className={`w-[26rem] h-[85vh] bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl flex-shrink-0 flex flex-col cursor-pointer group transition-all duration-500 ease-in-out ${
                position === 0 
                  ? 'scale-100 opacity-100 hover:scale-105 hover:-translate-y-2' 
                  : 'scale-90 opacity-70'
              }`}
              style={{
                transform: position === 0 
                  ? 'scale(1) translateY(0px)'
                  : position === -1
                  ? 'scale(0.9) translateX(-20px) translateY(10px)'
                  : 'scale(0.9) translateX(20px) translateY(10px)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* キャラクター画像エリア */}
              <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg flex items-center justify-center overflow-hidden relative">
                {character.thumbnail ? (
                  <Image
                    src={character.thumbnail}
                    alt={`${character.name}の画像`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-lg">キャラクター画像</div>
                )}
                
                {/* キャラクター名の帯状オーバーレイ */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white text-center py-4 px-6">
                    {character.name}
                  </h3>
                </div>
              </div>
              
              {/* キャラクター詳細エリア */}
              <div className="p-6 flex-shrink-0 bg-white rounded-b-lg">
                {character.catchphrase && (
                  <p className="text-sm text-gray-600 italic text-center line-clamp-3 leading-relaxed">
                    {character.catchphrase}
                  </p>
                )}
              </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharactersListPage;
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { characters } from '../../data/characters';

interface AnimatedMessageProps {
  message: {
    speaker: string;
    content: string;
    isKP: boolean;
    isDiceRoll: boolean;
    isSystemMessage: boolean;
  };
  index: number;
}

// 話者名からキャラクターを取得する関数
const getCharacterBySpeaker = (speaker: string) => {
  const speakerToCharacter: { [key: string]: string } = {
    // 高槻隼人
    '高槻　隼人（たかつき　はやと）': 'char001',
    '高槻 隼人（たかつき はやと）': 'char001',
    
    // 大田志音
    '大田　志音（おおた　しおん）': 'char002',
    '大田 志音(おおた しおん)': 'char002',
    
    // 志海未來
    '志海　未來(しうみ　みく)': 'char003',
    '志海 未來(しうみ みく)': 'char003',
    
    // イフ
    'イフ(いふ)': 'char004',
    
    // 姫島ノエル
    '姫島　ノエル(ひめじま　ノエル)': 'char005',
    '姫島 ノエル(ひめじま ノエル)': 'char005',
    
    // 見酉玲夜
    '見酉 玲夜(みとり れいや)': 'char006',
    '見酉　玲夜(みとり　れいや)': 'char006'
  };
  
  const characterId = speakerToCharacter[speaker];
  return characterId ? characters.find(char => char.id === characterId) : null;
};

export default function AnimatedMessage({ message, index }: AnimatedMessageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  
  // 話者に対応するキャラクターを取得
  const character = getCharacterBySpeaker(message.speaker);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 一度表示されたら監視を停止
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.8, // 80%見えたら発火
        rootMargin: '0px 0px -50px 0px', // 下部に50pxのマージンを追加
      }
    );

    if (messageRef.current) {
      observer.observe(messageRef.current);
    }

    return () => {
      if (messageRef.current) {
        observer.unobserve(messageRef.current);
      }
    };
  }, []);

  return (
    <div className={`mb-6 flex ${
      message.isDiceRoll || message.isSystemMessage
        ? 'justify-center' 
        : message.isKP 
          ? 'justify-start' 
          : 'justify-end'
    }`}>
      <div className="relative">
        {/* キャラクターアイコン（吹き出しの外側） */}
        {character && character.thumbnail && !message.isDiceRoll && !message.isSystemMessage && (
          <div className={`absolute ${
            message.isKP ? '-left-3 -top-3' : '-right-3 -top-3'
          } z-10 transform transition-all duration-500 ease-out ${
            isVisible ? 'animate-fade-in-up scale-100' : 'opacity-0 scale-75'
          }`}>
            <Image
              src={character.thumbnail}
              alt={character.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-md hover:scale-110 transition-transform duration-200"
            />
          </div>
        )}
        
        <div 
          ref={messageRef}
          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg transform transition-all duration-500 ease-out hover:scale-110 hover:shadow-xl hover:-translate-y-1 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          } ${
            message.isDiceRoll
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200 hover:border-yellow-400'
              : message.isSystemMessage
                ? 'bg-purple-100 text-purple-800 border border-purple-300 hover:bg-purple-200 hover:border-purple-400'
                : message.isKP 
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-gray-300' 
                  : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-blue-300'
          }`} 
          style={{ animationDelay: isVisible ? '0ms' : '0ms' }}
        >
          <div className="text-xs opacity-70 mb-1">{message.speaker}</div>
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
      </div>
    </div>
  );
}

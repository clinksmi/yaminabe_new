'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import SpoilerWarningModal from '../../components/SpoilerWarningModal';

// データを直接定義（タイトルは動的に取得）
const characterLogData = {
  hayato: [
    { id: 'episode1', title: 'エピソード1', filePath: '/line-logs/hayato/episode1.html' },
    { id: 'episode2', title: 'エピソード2', filePath: '/line-logs/hayato/episode2.html' },
    { id: 'episode3', title: 'エピソード3', filePath: '/line-logs/hayato/episode3.html' },
    { id: 'episode5', title: 'エピソード5', filePath: '/line-logs/hayato/episode5.html' },
    { id: 'episode6', title: 'エピソード6', filePath: '/line-logs/hayato/episode6.html' },
    { id: 'room_0_11_A', title: 'ルーム0_11_A', filePath: '/line-logs/hayato/Room_0_11.A_.html' },
    { id: '1', title: 'ログ1', filePath: '/line-logs/hayato/1.html' },
    { id: 'byouin', title: '病院', filePath: '/line-logs/hayato/byouin.html' },
    { id: 'sinnzitu', title: '真実', filePath: '/line-logs/hayato/sinnzitu.html' },
    { id: 'youandi', title: 'ログ', filePath: '/line-logs/hayato/youandi.html' },
  ],
  miku: [
    { id: '1', title: 'ミクのログ1', filePath: '/line-logs/miku/1.html' },
  ],
  shion: [
    { id: '2', title: 'シオンのログ2', filePath: '/line-logs/shion/2.html' },
    { id: 'youandi', title: 'ログ', filePath: '/line-logs/shion/youandi.html' },
  ],
} as const;

// 型ガード関数（安全にキーかどうかチェックする魔法の関数！）
const isValidCharacterKey = (key: string | null): key is keyof typeof characterLogData => {
  return key !== null && key in characterLogData;
};

// HTMLファイルからタイトルを抽出する関数
const extractTitleFromHTML = async (filePath: string): Promise<string> => {
  try {
    // 特定のファイルのタイトルを固定
    if (filePath.includes('sinnzitu.html')) {
      return 'クトゥルフ神話TRPG「真実と懺悔録」';
    }
    if (filePath.includes('youandi.html')) {
      return 'クトゥルフ神話TRPG「通過点、きみのはなし　あなたのはなし」';
    }
    
    const response = await fetch(filePath);
    const html = await response.text();
    
    // 正規表現でKPの最初の発言を抽出
    const pTagRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
    let match;
    
    while ((match = pTagRegex.exec(html)) !== null) {
      const pContent = match[1];
      const fullPTag = match[0];
      
      // KPかどうかを判定
      const isKP = fullPTag.includes('#888888') || 
                  fullPTag.includes('#9e9e9e') || 
                  pContent.includes('まりも') ||
                  pContent.includes('KP') || 
                  pContent.includes('system');
      
      if (isKP) {
        // <span>タグを抽出（改行や空白を含む）
        const spanRegex = /<span[^>]*>([\s\S]*?)<\/span>/g;
        const spans: string[] = [];
        let spanMatch;
        
        while ((spanMatch = spanRegex.exec(pContent)) !== null) {
          spans.push(spanMatch[1].trim());
        }
        
        if (spans.length >= 3) {
          let content = spans[2].trim();
          
          // <br>タグを改行に置換
          content = content.replace(/<br\s*\/?>/gi, ' ');
          // HTMLタグを除去
          content = content.replace(/<[^>]*>/g, '');
          // 余分な空白を整理
          content = content.replace(/\s+/g, ' ').trim();
          
          // タイトルとして適切かチェック
          if (content && 
              content !== '' && 
              !content.includes('CCB<=') && 
              !content.includes('【') && 
              !content.includes('SAN :') &&
              !content.startsWith('▼') &&
              !content.startsWith('初めまして') &&
              !content.includes('あなたの名前を教えてください')) {
            console.log(`Extracted title for ${filePath}: ${content}`);
            return content;
          }
        }
      }
    }
    
    return 'タイトル不明';
  } catch (error) {
    console.error('Failed to extract title:', error);
    return 'タイトル不明';
  }
};

function LineLogContent() {
  const [activeTab, setActiveTab] = useState<keyof typeof characterLogData | ''>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<{characterName: string, logId: string, title: string} | null>(null);
  const [logTitles, setLogTitles] = useState<{[key: string]: string}>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    if (characterLogData && Object.keys(characterLogData).length > 0) {
      // URLパラメータからタブを取得
      const tabParam = searchParams.get('tab');
      // 型ガードを使って安全にチェック！🛡️
      if (isValidCharacterKey(tabParam)) {
        setActiveTab(tabParam);
      } else {
        // デフォルトは'hayato'を明示的に指定（安全！）🛡️
        setActiveTab('hayato');
      }
    }
  }, [searchParams]);

  // タイトルを動的に取得
  useEffect(() => {
    const fetchTitles = async () => {
      const titles: {[key: string]: string} = {};
      
      for (const characterName in characterLogData) {
        // 型ガードを使って安全にチェック！🛡️
        if (isValidCharacterKey(characterName)) {
          for (const log of characterLogData[characterName]) {
            const key = `${characterName}_${log.id}`;
            const title = await extractTitleFromHTML(log.filePath);
            titles[key] = title;
          }
        }
      }
      
      setLogTitles(titles);
    };
    
    fetchTitles();
  }, []);

  const handleLogClick = (characterName: string, logId: string, title: string) => {
    setSelectedLog({ characterName, logId, title });
    setModalOpen(true);
  };

  const handleConfirm = () => {
    if (selectedLog) {
      window.location.href = `/logs/${selectedLog.characterName}/${selectedLog.logId}`;
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedLog(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 font-[family-name:var(--font-megrim)]" style={{ color: '#080eb4' }}>Log</h1>

      <div className="flex border-b border-gray-200 mb-6">
        {Object.keys(characterLogData).map((characterName) => {
          // キャラクター名のマッピング
          const characterDisplayNames = {
            'hayato': '高槻隼人',
            'miku': '志海未來',
            'shion': '大田志音'
          };
          
          return (
            <button
              key={characterName}
              className={`py-2 px-4 text-sm font-medium focus:outline-none ${
                activeTab === characterName
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => {
                if (isValidCharacterKey(characterName)) {
                  setActiveTab(characterName);
                }
              }}
            >
            {isValidCharacterKey(characterName) 
              ? characterDisplayNames[characterName] 
              : characterName}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab &&
          characterLogData[activeTab].map((log) => {
            const titleKey = `${activeTab}_${log.id}`;
            const displayTitle = logTitles[titleKey] || log.title;
            
            return (
              <div key={log.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-2">{displayTitle}</h2>
                <button
                  onClick={() => handleLogClick(activeTab, log.id, displayTitle)}
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  ログを見る
                </button>
              </div>
            );
          })}
      </div>

      <SpoilerWarningModal
        isOpen={modalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        logTitle={selectedLog?.title || ''}
      />
    </div>
  );
}

export default function LineLogPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-4">読み込み中...</div>}>
      <LineLogContent />
    </Suspense>
  );
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import AnimatedMessage from '../../../../components/AnimatedMessage';

// データを直接定義
const characterLogData: Record<string, Array<{ id: string; title: string; filePath: string }>> = {
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
};

interface LogPageProps {
  params: Promise<{
    characterName: string;
    logId: string;
  }>;
}

export default async function LogPage({ params }: LogPageProps) {
  const { characterName, logId } = await params;

  const characterLogs = characterLogData[characterName];

  if (!characterLogs) {
    notFound();
  }

  const logEntry = characterLogs.find((log) => log.id === logId);

  if (!logEntry) {
    notFound();
  }

  let htmlContent = '';
  try {
    const publicDirPath = path.join(process.cwd(), 'public');
    const fullPath = path.join(publicDirPath, logEntry.filePath);
    htmlContent = await fs.readFile(fullPath, 'utf-8');
  } catch (error) {
    console.error(`Failed to read log file: ${logEntry.filePath}`, error);
    notFound();
  }

  // HTMLを解析して発言を抽出（正規表現を使用）
  const parseMessages = (html: string) => {
    const messages: Array<{
      speaker: string;
      content: string;
      isKP: boolean;
      isDiceRoll: boolean;
      isSystemMessage: boolean;
    }> = [];

    // <p>タグを抽出する正規表現
    const pTagRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
    let match;

    while ((match = pTagRegex.exec(html)) !== null) {
      const pContent = match[1];
      
      // <span>タグを抽出（改行や空白を含む）
      const spanRegex = /<span[^>]*>([\s\S]*?)<\/span>/g;
      const spans: string[] = [];
      let spanMatch;
      
      while ((spanMatch = spanRegex.exec(pContent)) !== null) {
        spans.push(spanMatch[1].trim());
      }
      
      if (spans.length >= 3) {
        const channel = spans[0]; // [メイン]
        const speaker = spans[1];
        const content = spans[2];
        
        if (content) {
          // 空のspeakerの場合は「　　」として扱う
          const displaySpeaker = speaker && speaker.trim() !== '' ? speaker : '　　';
          
          // <br>タグを改行に置換し、その他のHTMLタグを除去
          const cleanContent = content
            .replace(/<br\s*\/?>/gi, '\n')  // <br>を改行に置換
            .replace(/<[^>]*>/g, '')        // その他のHTMLタグを除去
            .replace(/\s+/g, ' ')           // 連続する空白を1つに
            .trim();
          
          // キャラクター名のリスト（右に配置されるべき発言者）
          const characterNames = ['高槻隼人', '大田志音', '姫島ノエル', 'ミク', 'ノエル', '隼人', '志音'];
          
          // キャラクター名かどうかを判定
          const isCharacter = characterNames.includes(speaker);
          
          // 丸数字を含む発言者かどうかを判定
          const hasCircleNumber = /[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿]/.test(speaker);
          
          // KPかどうかを発言者名で判定（より包括的に）
          const isKP = (!isCharacter || hasCircleNumber) && (  // キャラクター名でない場合、または丸数字を含む場合
                      speaker === 'KP' || 
                      speaker === 'まりも' ||
                      speaker === 'system' ||
                      speaker.includes('KP') ||
                      speaker.includes('まりも') ||
                      speaker === '　　' ||  // 空のspeaker（システムメッセージなど）
                      speaker.trim() === '' ||  // 空白のみのspeaker
                      speaker.startsWith('自分自身') ||  // 自分自身で始まる発言者
                      speaker.startsWith('風呂敷') ||  // 風呂敷で始まる発言者
                      speaker.startsWith('本') ||  // 本で始まる発言者
                      speaker.startsWith('切符') ||  // 切符で始まる発言者
                      speaker.startsWith('渡す') ||  // 渡すで始まる発言者
                      /[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿]/.test(speaker) ||  // 発言者が丸数字を含む
                      /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿]/.test(speaker) ||  // 発言者が丸数字で始まる
                      /^[0-9]+/.test(speaker) ||  // 発言者が数字で始まる
                      cleanContent.startsWith('▼') ||  // ▼で始まるメッセージ
                      cleanContent.includes('始まり') ||
                      cleanContent.includes('準備') ||
                      cleanContent.includes('シナリオ') ||
                      cleanContent.includes('TRPG') ||
                      cleanContent.includes('クトゥルフ') ||
                      /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿]/.test(cleanContent) ||  // 丸数字で始まる
                      /^[0-9]+[\.\)]/.test(cleanContent) ||  // 数字+ピリオド/括弧で始まる
                      /^[0-9]+[\.\)]/.test(speaker));  // 発言者が数字+ピリオド/括弧
          
          // ダイスロールかどうかを判定（より厳密に）
          const isDiceRoll = cleanContent.startsWith('CCB<=') || 
                            (cleanContent.includes('【') && cleanContent.includes('】') && 
                             !cleanContent.match(/^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿]/) &&  // 丸数字で始まらない
                             !cleanContent.match(/^[0-9]+[\.\)]/) &&  // 数字+ピリオド/括弧で始まらない
                             !speaker.startsWith('風呂敷') &&  // 風呂敷で始まらない
                             !speaker.startsWith('自分自身') &&  // 自分自身で始まらない
                             !speaker.startsWith('本') &&  // 本で始まらない
                             !speaker.startsWith('切符') &&  // 切符で始まらない
                             !speaker.startsWith('渡す'));  // 渡すで始まらない
          
          // ▼で始まるメッセージ（システムメッセージ）かどうかを判定
          const isSystemMessage = cleanContent.startsWith('▼');
          
          messages.push({
            speaker: displaySpeaker,
            content: cleanContent,
            isKP,
            isDiceRoll,
            isSystemMessage
          });
        }
      }
    }
    return messages;
  };

  const messages = parseMessages(htmlContent);

  // HTMLからタイトルを抽出
  const extractTitleFromHTML = (html: string): string => {
    // 特定のファイルのタイトルを固定
    if (logId === 'sinnzitu') {
      return 'クトゥルフ神話TRPG「真実と懺悔録」';
    }
    if (logId === 'youandi') {
      return 'クトゥルフ神話TRPG「通過点、きみのはなし　あなたのはなし」';
    }
    
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
            return content;
          }
        }
      }
    }
    
    return logEntry.title; // フォールバック
  };

  const displayTitle = extractTitleFromHTML(htmlContent);

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6">{displayTitle}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <AnimatedMessage key={index} message={message} index={index} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link 
          href="/line-log" 
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          ログ一覧に戻る
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const params: { characterName: string; logId: string }[] = [];

  for (const characterName in characterLogData) {
    characterLogData[characterName].forEach((log) => {
      params.push({ characterName, logId: log.id });
    });
  }

  return params;
}

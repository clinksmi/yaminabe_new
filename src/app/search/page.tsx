// src/app/search/page.tsx

'use client';

import { useState } from 'react';
import { Character, characters } from '../../../data/characters';
import Link from 'next/link';
import Image from 'next/image';

const SearchPage = () => {
  // 並べ替えモーダルの状態
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState<string>('登録順');

  // 絞り込みのための新しいState
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  // どの絞り込み項目（性別、職業など）が選択されたかを覚える変数だよ (例: 'gender', 'occupation')
  const [currentFilterKey, setCurrentFilterKey] = useState<string | null>(null); // currentFilterTypeからcurrentFilterKeyに変更
  // 実際に選択された絞り込み条件を覚える変数だよ (例: { gender: '男性', occupation: 'アイドル' })
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string | string[]>>({});

  // 検索キーワードのためのState
  const [searchKeyword, setSearchKeyword] = useState<string>(''); // 検索キーワードを保存する変数だよ


  // キャラクターのリストを準備するよ。
  let processedCharacters = [...characters]; // charactersをコピーしておく


  // ★★★ここから並べ替え、絞り込み、検索のロジックをまとめるよ！★★★

  // 1. まず、並べ替えをするよ
  if (selectedSortOption === '名前順') {
    processedCharacters.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
  } else if (selectedSortOption === '誕生日順') {
    processedCharacters.sort((a, b) => {
      // 誕生日がないキャラクターは最後に集める
      if (!a.birthday || !b.birthday) {
        if (a.birthday && !b.birthday) return -1;
        if (!a.birthday && b.birthday) return 1;
        return 0; // 両方ないか、同じ場合は順序を変えない
      }
      // 'MM/DD' 形式を数値に変換して比較
      const [aMonth, aDay] = a.birthday.split('/').map(Number);
      const [bMonth, bDay] = b.birthday.split('/').map(Number);
      if (aMonth !== bMonth) {
        return aMonth - bMonth;
      }
      return aDay - bDay;
    });
  } else if (selectedSortOption === '年齢順') {
    processedCharacters.sort((a, b) => {
      // 年齢データがない場合（不明）は最後にまとめる
      if (a.age === undefined || a.age === null || a.age === '不明') return 1; // aが不明ならbより後
      if (b.age === undefined || b.age === null || b.age === '不明') return -1; // bが不明ならaより後

      // 年齢を数値として比較 (ageがstring型の場合も考慮してparseIntを使う)
      const ageA = typeof a.age === 'number' ? a.age : parseInt(a.age as string);
      const ageB = typeof b.age === 'number' ? b.age : parseInt(b.age as string);

      // 数値に変換できなかった場合も考慮
      if (isNaN(ageA) && isNaN(ageB)) return 0;
      if (isNaN(ageA)) return 1;
      if (isNaN(ageB)) return -1;
      
      return ageA - ageB;
    });
  }


  // 2. 次に、絞り込みをするよ（選択されたフィルターに基づいて、processedCharactersをさらに絞り込む）
  Object.keys(selectedFilters).forEach(filterKey => {
    const filterValue = selectedFilters[filterKey];
    
    // filterValue が文字列の場合（性別、職業、誕生月、年齢）
    if (typeof filterValue === 'string') {
      processedCharacters = processedCharacters.filter(char => {
        if (filterKey === 'birthday') { // 誕生月の絞り込み
          const charMonth = char.birthday?.split('/')[0];
          const filterMonthNum = parseInt(filterValue.replace('月', ''), 10);
          const filterMonthStr = filterMonthNum < 10 ? `0${filterMonthNum}` : `${filterMonthNum}`;
          return charMonth === filterMonthStr;
        } else if (filterKey === 'age') { // 年齢の絞り込み
          const charAge = char.age;
          if (filterValue === '不明') { 
            return charAge === '不明' || charAge === undefined || charAge === null;
          }
          if (charAge === undefined || charAge === null || charAge === '不明') return false; 
          
          const ageNum = typeof charAge === 'number' ? charAge : parseInt(charAge as string);
          if (filterValue === '10代') return ageNum >= 10 && ageNum < 20;
          if (filterValue === '20代') return ageNum >= 20 && ageNum < 30;
          if (filterValue === '30代') return ageNum >= 30 && ageNum < 40;
          if (filterValue === '40代以上') return ageNum >= 40;
          return false; 
        }
        // その他の文字列フィルター（gender, occupation）は、直接一致するか確認
               // その他の文字列フィルター（gender, occupation）
               if (filterKey === 'gender') {
                return char.gender === filterValue;
              }
              if (filterKey === 'occupation') {
                return char.occupation === filterValue;
              }
              return false;
      });
    }
    // 後で「好きなもの」のように複数選択可能なフィルターの場合は、Array.isArray(filterValue) で分岐するよ
  });

  // 3. 最後に、検索キーワードによる絞り込みを追加するよ！
  if (searchKeyword) { // もし検索キーワードが入力されていたら
    const lowercasedKeyword = searchKeyword.toLowerCase(); // キーワードを小文字にしておく（大文字小文字を区別しない検索のため）
    processedCharacters = processedCharacters.filter(char => {
      // キャラクターの名前、キャッチコピー、説明文にキーワードが含まれているかチェックするよ
      return (
        char.name.toLowerCase().includes(lowercasedKeyword) ||
        char.catchphrase?.toLowerCase().includes(lowercasedKeyword) ||
        char.description?.toLowerCase().includes(lowercasedKeyword)
      );
    });
  }

  // 最終的に表示するキャラクターリストを決定する
  const displayedCharacters = processedCharacters;
  // ★★★ここまで並べ替え、絞り込み、検索のロジックだよ！★★★


  // 絞り込みモーダルの開閉と、どのボタンが押されたかを処理する関数だよ！
  const openFilterModal = (key: string) => { // keyはデータキー名（gender, occupationなど）を受け取るよ
    setCurrentFilterKey(key); 
    setIsFilterModalOpen(true); 
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false); 
    setCurrentFilterKey(null); 
  };

  // 絞り込み条件が選択されたときに呼ばれる関数だよ
  const handleFilterSelect = (key: string, value: string) => { // keyはデータキー名を受け取るよ
    setSelectedFilters(prevFilters => ({
      ...prevFilters, 
      [key]: value,  
    }));
    closeFilterModal(); 
  };

  // 絞り込み条件を解除する関数だよ
  const handleClearFilter = (key: string) => { // keyはデータキー名を受け取るよ
    setSelectedFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      delete newFilters[key]; 
      return newFilters;
    });
    closeFilterModal(); 
  };

  // 選択された絞り込み条件に基づいて、モーダルに表示する選択肢を動的に生成するよ
  // ここに各絞り込みタイプの選択肢を定義するんだ (キーはデータキー名にする！)
  const filterOptions: Record<string, string[]> = {
    'gender': ['男性', '女性', 'その他', '不明'], // キーを'gender'に変更
    'occupation': ['俳優', 'ミュージシャン', 'ハルモロイド', '小学生', '高校生'], 
    'birthday': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    'age': ['10代', '20代', '30代', '40代以上', '不明'], // キーを'age'に変更
  };

  // データキー名（gender, occupationなど）を、UI表示名（性別、職業など）に変換するヘルパー関数だよ
  const getDisplayKey = (dataKey: string | null): string => { // dataKeyという引数名に変更
    if (dataKey === 'gender') return '性別';
    if (dataKey === 'occupation') return '職業';
    if (dataKey === 'birthday') return '誕生月';
    if (dataKey === 'age') return '年齢';
    return ''; 
  };

  // UI表示名（性別、職業など）を、ボタンのテキストとして表示するヘルパー関数だよ
  const getFilterButtonText = (dataKey: string, defaultText: string) => { // dataKeyという引数名に変更
    const value = selectedFilters[dataKey]; // selectedFiltersのチェックもdataKeyで行う
    if (value && typeof value === 'string') {
      if (dataKey === 'birthday') { 
        const monthNum = parseInt(value.replace('月', ''), 10);
        return `${defaultText}: ${monthNum}月`; 
      }
      return `${defaultText}: ${value}`; 
    }
    return defaultText; 
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold my-8 font-[family-name:var(--font-megrim)]" style={{ color: '#080eb4' }}>Search</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        {/* 検索窓と並べ替えボタンのエリア */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-6 gap-4">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="検索窓：自由に入れて検索できる"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchKeyword} 
              onChange={(e) => setSearchKeyword(e.target.value)} 
            />
          </div>
          <button
            className="w-full md:w-1/5 py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => setIsSortModalOpen(true)}
          >
            並べ替え: {selectedSortOption}
          </button>
        </div>

        {/* 絞り込みボタンのエリア */}
        <div className="p-4 rounded-lg">
          <p className="text-lg font-semibold mb-3">絞り込み条件:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button
              className={`py-2 px-4 border rounded-lg hover:bg-gray-100 transition-colors ${selectedFilters['gender'] ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
              onClick={() => openFilterModal('gender')} // openFilterModalにはデータキー名('gender')を渡す
            >
              {getFilterButtonText('gender', '性別')} {/* getFilterButtonTextにもデータキー名('gender')を渡す */}
            </button>
            <button
              className={`py-2 px-4 border rounded-lg hover:bg-gray-100 transition-colors ${selectedFilters['occupation'] ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
              onClick={() => openFilterModal('occupation')} // データキー名('occupation')を渡す
            >
              {getFilterButtonText('occupation', '職業')}
            </button>
            <button
              className={`py-2 px-4 border rounded-lg hover:bg-gray-100 transition-colors ${selectedFilters['age'] ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
              onClick={() => openFilterModal('age')} // データキー名('age')を渡す
            >
              {getFilterButtonText('age', '年齢')}
            </button>
            <button
              className={`py-2 px-4 border rounded-lg hover:bg-gray-100 transition-colors ${selectedFilters['birthday'] ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
              onClick={() => openFilterModal('birthday')} // データキー名('birthday')を渡す
            >
              {getFilterButtonText('birthday', '誕生月')}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            ここを絞り込みボタン押すとポップアップが出てきて条件で絞り込めます。（まだ未実装）
          </p>
        </div>
      </div>

      {/* キャラクターたちがソートされて表示されるエリア */}
      <h2 className="text-2xl font-bold my-8" style={{ color: '#080eb4' }}>Character List</h2>
      {displayedCharacters.length > 0 ? (
        // ★ここを、以前使っていたシンプルなgridレイアウトに戻すよ！
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8">
          {displayedCharacters.map((character: Character) => (
            // キャラクターカードの幅は、gridのcol-spanで自動調整されるので、w-fullなどの個別指定は不要になるよ
            <div
              key={character.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center text-center"
            >
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
        </div>
      ) : (
        <p className="text-center text-gray-500 w-full">条件に合う子は見つからないみたい......。</p>
      )}

      {/* 並べ替えモーダル（ポップアップ） */}
      {isSortModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
          onClick={() => setIsSortModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg p-6 w-full max-w-[480px]" // ポップアップの幅はそのまま
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSortModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 text-3xl hover:text-gray-700"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">並べ替え</h2>

            <div className="space-y-4">
              {/* 「男女別」と「職業別」を削除し、「年齢順」がある */}
              {['登録順', '名前順', '誕生日順', '年齢順'].map((option) => (
                <button
                  key={option}
                  className={`w-full py-3 px-4 rounded-lg text-lg transition-colors
                              ${selectedSortOption === option ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  onClick={() => {
                    setSelectedSortOption(option);
                    setIsSortModalOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
              {selectedSortOption !== '登録順' && (
                <button
                  className="w-full py-3 px-4 rounded-lg text-lg transition-colors bg-red-500 text-white hover:bg-red-600"
                  onClick={() => {
                    setSelectedSortOption('登録順');
                    setIsSortModalOpen(false);
                  }}
                >
                  選択解除
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 絞り込みモーダル（ポップアップ） */}
      {isFilterModalOpen && currentFilterKey && ( // currentFilterKeyがある時だけ表示
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
          onClick={closeFilterModal} // 背景をクリックしたらモーダルが閉じる
        >
          <div
            className="relative bg-white rounded-lg p-6 w-full max-w-[480px]" // ポップアップの幅はそのまま
            onClick={(e) => e.stopPropagation()} // モーダルの白い枠の中をクリックしても閉じない
          >
            {/* 閉じるボタン */}
            <button
              onClick={closeFilterModal}
              className="absolute top-2 right-2 text-gray-500 text-3xl hover:text-gray-700"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">
              {getDisplayKey(currentFilterKey)}で絞り込み {/* データキー名からUI表示名に変換 */}
            </h2>

            {/* 絞り込み選択肢のボタンの並び方を調整 */}
            <div className={
              currentFilterKey === 'gender' || currentFilterKey === 'age' // 性別か年齢なら横並びに近い形
                ? 'flex flex-wrap justify-center gap-2' // flex-wrap と gap を追加
                : 'grid grid-cols-3 gap-4' // それ以外（職業、誕生月）はグリッド
            }>
              {/* filterOptionsから、現在のcurrentFilterKeyに合う選択肢をmapしてボタンにするよ */}
              {filterOptions[currentFilterKey]?.map((option) => (
                <button
                  key={option}
                  // selectedFiltersのチェックもcurrentFilterKey（データキー名）で比較
                  className={`w-full py-3 px-4 rounded-lg text-lg transition-colors
                              ${(selectedFilters[currentFilterKey] === option) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
                              ${currentFilterKey === 'gender' || currentFilterKey === 'age' ? 'w-auto px-6' : ''}`} // 性別と年齢のボタンは幅を自動調整
                  onClick={() => handleFilterSelect(currentFilterKey, option)} // handleFilterSelectにはcurrentFilterKey（データキー名）を渡す
                >
                  {option}
                </button>
              ))}
            </div>
            {/* 選択解除ボタン */}
            {selectedFilters[currentFilterKey] && ( // selectedFiltersのチェックもcurrentFilterKeyで
              <div className="mt-6 text-center">
                <button
                  className="py-3 px-8 rounded-lg text-lg transition-colors bg-red-500 text-white hover:bg-red-600"
                  onClick={() => handleClearFilter(currentFilterKey)} // handleClearFilterにはcurrentFilterKey（データキー名）を渡す
                >
                  選択解除
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
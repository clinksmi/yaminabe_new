// src/app/characters/[characterId]/page.tsx

import { characters } from '../../../../data/characters';
import CharacterClient from '../../../components/CharacterClient';

interface CharacterPageProps {
  params: {
    characterId: string;
  };
}

const CharacterPage = async ({ params }: CharacterPageProps) => {
  const { characterId } = await params;
  const character = characters.find((char) => char.id === characterId);

  if (!character) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">キャラクターが見つかりません...</h1>
        <p className="mt-4">ごめんね、そのIDのキャラクターはまだ登録されていないみたいだよ。</p>
        <p className="mt-8 text-blue-500 hover:underline">
          <a href="/characters">一覧ページに戻る</a>
        </p>
      </div>
    );
  }

  return <CharacterClient character={character} characterId={characterId} />;
};

export default CharacterPage;
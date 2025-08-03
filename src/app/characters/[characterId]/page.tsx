// src/app/characters/[characterId]/page.tsx

// このページも、ユーザーが触れる部分があるから「クライアントコンポーネント」にするおまじないだよ
'use client';

// キャラクターのデータと設計図を持ってくるよ
import { Character, characters } from '../../../../data/characters'; // ★dataへのパスがさらに深くなるよ！

// Next.jsのApp Routerでは、URLの中のカギカッコの部分（今回は [characterId]）の情報を
// 「params」という特別な箱に入れて、このページに渡してくれるんだ。
// そのparamsの型（設計図）も教えてあげよう
interface CharacterPageProps {
  params: {
    characterId: string; // URLの [characterId] の部分には文字（string）が入るよ
  };
}

// これは、キャラクター個別ページを作るための「お店」だよ
// propsっていう箱の中に、URLから取ってきた情報（params）が入ってるんだ。
const CharacterPage = ({ params }: CharacterPageProps) => {
  // params.characterId で、URLのキャラクターID（例: "char001"）が手に入るんだ！
  const { characterId } = params;

  // キャラクターのリスト（characters）の中から、URLのIDと同じIDを持つキャラクターを探すよ！
  // 「find」は、リストの中から条件に合うものを一つだけ見つける魔法の呪文なんだ。
  const character = characters.find((char) => char.id === characterId);

  // もし、そのIDのキャラクターが見つからなかったら、エラーメッセージを表示するよ
  if (!character) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">キャラクターが見つかりません...</h1>
        <p className="mt-4">ごめんね、そのIDのキャラクターはまだ登録されていないみたいだよ。</p>
        {/* トップページに戻るリンク */}
        <p className="mt-8 text-blue-500 hover:underline">
          <a href="/">一覧ページに戻る</a>
        </p>
      </div>
    );
  }

  // キャラクターが見つかったら、その情報を表示するよ！
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">{character.name}</h1>
      <p className="text-xl text-center text-gray-700 mb-6 italic">{character.catchphrase}</p>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* ここにイラストを入れる場所を作っておこう。まだなくても大丈夫だよ。 */}
        {character.image && (
          <img
            src={character.image} // ここに画像のアドレスを入れるよ
            alt={character.name} // 画像がもし表示されなかったときに表示される文字だよ
            className="w-full max-w-md mx-auto mb-6 rounded-lg shadow-md"
          />
        )}

        <h2 className="text-2xl font-semibold mb-3">プロフィール</h2>
        <p className="mb-4">{character.description}</p>

        {/* 他にも情報を追加していくなら、こんな風に書けるよ */}
        {/* {character.height && <p><strong>身長:</strong> {character.height}</p>} */}
        {/* {character.birthday && <p><strong>誕生日:</strong> {character.birthday}</p>} */}
        {/* {character.likes && <p><strong>好きなもの:</strong> {character.likes.join(', ')}</p>} */}
      </div>

      {/* トップページに戻るリンク */}
      <p className="mt-8 text-blue-500 hover:underline text-center">
        <a href="/">一覧ページに戻る</a>
      </p>
    </div>
  );
};

// このページを、Next.jsの個別ページとして使えるようにするおまじない
export default CharacterPage;
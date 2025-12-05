// src/app/about/page.tsx
'use client';

const AboutPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 font-[family-name:var(--font-megrim)]" style={{ color: '#080eb4' }}>About</h1>
      
      <div className="max-w-3xl mx-auto">
        {/* このサイトについて */}
        <details className="accordion-007">
        <summary>このサイトについて</summary>
        <div className="accordion-content">
          <p className="mb-3">
            このサイトは、クトゥルフ神話TRPGの通りすがり探索者たちの冒険と軌跡を記録し、共有するためのファンサイトです。
          </p>
          <p className="mb-3">
            セッションで生まれたキャラクターたちの魅力、忘れられないシーン、そして彼らが紡いだ物語を、
            より多くの人と分かち合うために作られました。
          </p>
          <p>
            ここでは、各探索者のプロフィール、ルームログ、ギャラリーなどを通じて、
            やみなべの仲間たちの世界をお楽しみいただけます。
          </p>
        </div>
      </details>

      {/* クトゥルフ神話TRPGとは */}
      <details className="accordion-007">
        <summary>クトゥルフ神話TRPGとは</summary>
        <div className="accordion-content">
          <p>
            クトゥルフ神話TRPG（Call of Cthulhu、通称CoC）は、プレイヤーが探偵や学者、記者など「探索者」を演じ、不可解な事件や古代の秘密を調べる協力型のテーブルトークRPG（TRPG）です。進行役である「キーパー」（Keeper）が舞台や謎、非人間的な存在を用意し、プレイヤーは会話とサイコロ判定で行動を決め、物語を共同で紡いでいきます。特徴は「調査（インベスティゲーション）」と「心理的恐怖（ホラー）」が中心で、戦うよりも真相を突き止めたり、逃げたりする判断が重視されます。
          </p>
        </div>
      </details>

      {/* 基本構造 */}
      <details className="accordion-007">
        <summary>基本構造</summary>
        <div className="accordion-content">
          <h5 className="font-bold mb-2">役割</h5>
          <ul className="list-disc list-inside mb-4 ml-2">
            <li><strong>キーパー（Keeper）</strong>: 物語の進行役・審判。シナリオを準備し、状況描写や敵の行動を管理します。</li>
            <li><strong>プレイヤー</strong>: 各自の探索者（PC）を操作し、情報収集や交渉、行動を行います。</li>
          </ul>
          
          <h5 className="font-bold mb-2">セッションの流れ（ざっくり）</h5>
          <ol className="list-decimal list-inside ml-2 space-y-1">
            <li><strong>シナリオ準備（キーパー）</strong> — 舞台設定・手がかり・敵などを用意。</li>
            <li><strong>キャラクター作成（プレイヤー）</strong> — 能力値や技能を決定。</li>
            <li><strong>探索フェーズ</strong> — 手がかりを集め、推理する。</li>
            <li><strong>対峙（遭遇）フェーズ</strong> — 危険な存在や事件に直面。判断や戦闘、逃走を行う。</li>
            <li><strong>結末と後処理</strong> — 真相が明かされるか否か、正気度の変化などを記録。</li>
          </ol>
        </div>
      </details>

      {/* キャラクターと基礎能力（ステータス） */}
      <details className="accordion-007">
        <summary>キャラクターと基礎能力（ステータス）</summary>
        <div className="accordion-content">
          <p className="mb-3">
            探索者は「基礎能力値（ステータス）」で性能が決まります。代表的なものは以下の8種です（英語名／意味）。
          </p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li><strong>STR（Strength／筋力）</strong>: 物理的な力</li>
            <li><strong>CON（Constitution／体力）</strong>: 体の丈夫さ</li>
            <li><strong>POW（Power／精神力）</strong>: 意志力・精神の強さ</li>
            <li><strong>DEX（Dexterity／敏捷性）</strong>: 動きの器用さ・反応</li>
            <li><strong>APP（Appearance／外見）</strong>: 見た目・第一印象</li>
            <li><strong>SIZ（Size／体格）</strong>: 体の大きさ</li>
            <li><strong>INT（Intelligence／知性）</strong>: 推理力・理解力</li>
            <li><strong>EDU（Education／教養）</strong>: 学識・学歴</li>
          </ul>
        </div>
      </details>

      {/* 正気度（SAN）と物語への影響 */}
      <details className="accordion-007">
        <summary>正気度（SAN）と物語への影響</summary>
        <div className="accordion-content">
          <p>
            CoCで特に重要なのが「正気度（SAN）」の概念です。恐ろしい場面や超常現象に遭遇するとSANが減少し、長期間の低下で人格や行動に変化（恐怖症や狂気）をきたすことがあります。これによりゲームは単なる謎解きではなく心理ドラマの側面を持ちます。
          </p>
        </div>
      </details>

      {/* 探索者とは */}
      <details className="accordion-007">
        <summary>探索者とは</summary>
        <div className="accordion-content">
          <p className="mb-3">
            探索者（たんさくしゃ、Player Character = PC）は、プレイヤーが演じるキャラクターのこと。探偵、学者、記者、警察官、医師など、物語の舞台で調査や行動を行う役割を持ちます。クトゥルフTRPGでは「普通の人」が危険な真実に触れていく点が魅力です。
          </p>
          <p>
            探索者とは、あなたが演じる「普通の人」でありながら危険な真実に触れていく役割です。探索・交渉・推理を通して手がかりを集め、仲間と協力して事件の核心へと迫ります。
          </p>
        </div>
      </details>

      {/* シナリオとは */}
      <details className="accordion-007">
        <summary>シナリオとは</summary>
        <div className="accordion-content">
          <p className="mb-4">
            シナリオは「キーパーが用意する物語の枠組み」で、事件の導入、登場人物、手がかり、敵、結末の流れが含まれます。プレイヤーはその中で自由に行動し、物語を完成させます。
          </p>
          
          <h5 className="font-bold mb-2">シナリオの基本構造（4フェーズで考えると分かりやすい）</h5>
          <ul className="list-disc list-inside ml-2 space-y-2">
            <li><strong>導入（フック）</strong>: プレイヤーを物語に引き込む場面。依頼、奇妙な事件の発生、古文書の発見など。</li>
            <li><strong>調査（探索）</strong>: 手がかり収集と推理。場所移動、聞き込み、資料調査が中心。</li>
            <li><strong>対峙（クライマックス）</strong>: 真相に近づいたときに発生する危機。怪異との遭遇や追跡、罠など。</li>
            <li><strong>結末（後処理）</strong>: 真相の解明、未解決の余地、キャラクターの帰結（SANの変動など）。</li>
          </ul>
        </div>
      </details>

      </div>
    </div>
  );
};

export default AboutPage;


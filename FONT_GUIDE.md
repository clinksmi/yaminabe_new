# フォント使用ガイド

## 使用フォント

### 1. Megrim（スタイリッシュなディスプレイフォント）
- **用途**: 見出し、ロゴ、タイトル、ボタン、フッター
- **特徴**: 細身でスタイリッシュ、モダンな雰囲気
- **言語**: 英語・日本語対応
- **適用箇所**: 
  - サイドバーの「Menu」タイトル
  - サイドバーのメニューボタン（Top, About, Character, Log, Gallery, Search）
  - 各ページの大見出し（h1）
  - トップページの「ようこそ、混沌の円卓へ。」
  - フッターのリンクとコピーライト

### 2. Zen Kaku Gothic Antique（日本語・本文用）
- **用途**: 本文、説明文、全般的なテキスト
- **特徴**: 落ち着いた雰囲気のあるゴシック体、高い可読性
- **言語**: 日本語・英語対応
- **ウェイト**: 400/500/700/900

---

## 使い方

### 見出しにMegrimを適用

```tsx
<h1 className="font-[family-name:var(--font-megrim)]">
  ようこそ、混沌の円卓へ。
</h1>
```

### ボタンにフォントを適用

```tsx
<button className="font-[family-name:var(--font-megrim)]">
  Top
</button>
```

### 本文は自動的にZen Kaku Gothic Antique

```tsx
<p>
  これは自動的にZen Kaku Gothic Antiqueで表示されます。
  特別な指定は不要です。
</p>
```

### ページタイトル

```tsx
<h1 className="font-[family-name:var(--font-megrim)] text-4xl">
  About
</h1>
```

---

## フォントウェイトの使い分け（Zen Kaku Gothic Antique）

```tsx
{/* 通常のテキスト */}
<p className="font-normal">これは400（レギュラー）</p>

{/* 少し強調 */}
<p className="font-medium">これは500（ミディアム）</p>

{/* 見出しなど */}
<h2 className="font-bold">これは700（ボールド）</h2>

{/* 超強調 */}
<h1 className="font-black">これは900（ブラック）</h1>
```

---

## 実装例

### トップページの見出し
```tsx
<h1 className="text-5xl font-extrabold text-gray-800 mb-4 font-[family-name:var(--font-megrim)]">
  ようこそ、混沌の円卓へ。
</h1>
```

### サイドバーのボタン
```tsx
<Link className="button-neomorphism font-[family-name:var(--font-megrim)]">
  About
</Link>
```

### フッターのリンク
```tsx
<Link href="/about" className="footer-001__link font-[family-name:var(--font-megrim)]">
  About
</Link>
```

### セクションタイトル
```tsx
<h2 className="text-4xl font-bold text-center my-8 font-[family-name:var(--font-megrim)]">
  やみなべの仲間たち
</h2>
```

---

## 技術詳細

### layout.tsx での設定

```typescript
import { Megrim, Noto_Sans_JP } from 'next/font/google';

const megrimFont = Megrim({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-megrim',
  display: 'swap',
});

const zenKakuGothicAntique = Zen_Kaku_Gothic_Antique({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-zen-kaku',
  display: 'swap',
});
```

### globals.css での設定

```css
@theme inline {
  --font-sans: var(--font-zen-kaku), system-ui, sans-serif;
  --font-megrim: var(--font-megrim), cursive;
}
```

---

## フォント選定の理由

### Megrim
- 細身でスタイリッシュな印象
- モダンで洗練された雰囲気
- 青/白/黒のカラーパレットに最適
- 見出しやボタンに使うことで、サイト全体にクールな印象を与える
- クトゥルフTRPGの「ミステリアス」な雰囲気とマッチ

### Zen Kaku Gothic Antique
- 落ち着いた雰囲気のあるゴシック体
- 高い可読性で長文にも適している
- 多様なウェイトで表現力が豊か（400/500/700/900）
- Google Fontsで無料、商用利用可能
- Megrimとの組み合わせで、スタイリッシュさと落ち着きのバランスが取れる

---

## 参考リンク

- **Megrim**: https://fonts.google.com/specimen/Megrim
- **Zen Kaku Gothic Antique**: https://fonts.google.com/specimen/Zen+Kaku+Gothic+Antique
- **Next.js Font Optimization**: https://nextjs.org/docs/app/building-your-application/optimizing/fonts

---

## 適用箇所一覧

### Megrim が適用されている箇所

1. **サイドバー（Sidebar.tsx）**
   - 「Menu」タイトル
   - ナビゲーションボタン（Top, About, Character, Log, Gallery, Search）

2. **フッター（Footer.tsx）**
   - フッターのリンク（Top, About, Character, Log, Gallery, Search）
   - コピーライト「© 2025 やみなべ All rights reserved.」

3. **トップページ（page.tsx）**
   - 「ようこそ、混沌の円卓へ。」
   - 「通りすがり探索者まとめサイト「やみなべっ！」です」
   - 「やみなべの仲間たち」

4. **各ページの大見出し（h1）**
   - Aboutページ: 「About」
   - Characterページ: 「Character」
   - Galleryページ: 「Gallery」
   - Searchページ: 「Search」
   - Logページ: 「Log」

### Zen Kaku Gothic Antique が適用されている箇所

- 上記以外のすべての本文、説明文、キャラクター名、カード内のテキストなど
- キャラクター詳細ページの本文
- 検索結果のテキスト
- アバウトページの説明文
- すべてのボタンやリンクのテキスト（Megrim指定がないもの）

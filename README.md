# DIALOGUE＋ Musiclist

DIALOGUE＋の楽曲ランキング作成・セットリスト作成を、曲名などのテキスト情報だけで楽しむファンツールです。

> 重要: このリポジトリには音源データ、動画データ、ジャケット画像、歌詞は一切含めません。mp3 / mp4 / wav / m4a / 画像素材などの著作物ファイルも使用しません。

## できること

- 好きな楽曲ランキングを作る
  - 2曲を比較して好きな方を選びます。
  - 引き分け、戻る、リセットに対応しています。
  - 全組み合わせ比較ではなく、二分挿入ソートでスマホでも現実的な比較回数にしています。
  - 完成後、順位一覧をテキストでコピーできます。
- 俺だけのセットリストを作る
  - 曲名検索、タップ追加、同じ曲の複数追加ができます。
  - 曲順の上下移動、削除、MAIN / ENCORE 切り替えができます。
  - セットリストをテキストでコピーできます。
- 楽曲データを確認する
  - 作品単位で曲名、発売日、公式ディスコグラフィURL、除外理由を確認できます。

ランキング途中経過とセットリストは、ブラウザのローカルストレージに自動保存されます。

## 技術構成

- Vite
- React
- TypeScript
- スマホファーストUI
- GitHub Pages向け設定済み
  - このリポジトリ名に合わせて `vite.config.ts` の `base` は `/DIALOGUE-Musiclist/` です。

## ローカルでの起動方法

初心者向けの手順です。

### 1. Node.jsを用意する

Node.js が入っていない場合は、公式サイトから LTS 版をインストールしてください。

- <https://nodejs.org/>

### 2. 依存パッケージをインストールする

ターミナルでこのリポジトリのフォルダを開き、次を実行します。

```bash
npm install
```

### 3. 開発サーバーを起動する

```bash
npm run dev
```

表示されたURL（例: `http://localhost:5173/`）をブラウザで開くと確認できます。

### 4. 公開前のビルド確認

```bash
npm run build
```

`dist` フォルダが作られれば、GitHub Pagesで公開できる静的ファイルの生成に成功しています。

## GitHub Pagesでの公開方法

このリポジトリは、`main` ブランチに push / merge されたときに GitHub Actions で自動ビルドし、生成された `dist` フォルダを GitHub Pages に公開する方式です。`Deploy from a branch` で `main` / `root` を直接公開する方式は使いません。

### 初回だけ行うGitHub側の設定

1. GitHubのリポジトリ画面を開きます。
2. `Settings` → `Pages` を開きます。
3. `Build and deployment` の `Source` を `GitHub Actions` にします。
4. 設定を保存します。

### 自動デプロイの流れ

1. 変更を `main` ブランチに push、または pull request を `main` に merge します。
2. `.github/workflows/deploy.yml` のワークフローが自動で起動します。
3. GitHub Actions上で `npm install` が実行され、依存パッケージがインストールされます。
4. 続けて `npm run build` が実行され、Viteが公開用ファイルを `dist` フォルダに生成します。
5. `dist` フォルダだけが GitHub Pages にアップロードされ、Webアプリとして公開されます。

### 公開URL

このアプリは `vite.config.ts` で `base: '/DIALOGUE-Musiclist/'` を設定済みなので、GitHub PagesのURLが次の形でも動くようになっています。

```text
https://ユーザー名.github.io/DIALOGUE-Musiclist/
```

### 公開時の注意

- このアプリはスマホアプリではなく、ブラウザで開くWebアプリです。
- GitHub Pagesに公開されるのは、ビルド後の静的ファイルだけです。
- 音源データ、動画データ、ジャケット画像、歌詞は含めない方針を維持してください。
- `vite.config.ts` の `base` は `/DIALOGUE-Musiclist/` のまま変更しないでください。

## 新曲追加方法

アプリ本体を修正せず、楽曲データだけ追加すれば反映されます。

編集するファイルは次だけです。

```text
src/data/releases.ts
```

### 作品を追加する例

`releases` 配列に、次の形で作品を1つ追加します。

```ts
{
  id: 'new-single-id',
  title: '16th Single「新曲タイトル」',
  releaseDate: '2026-12-01',
  sourceUrl: 'https://dialogue-music.jp/discography/xxxx/',
  songs: [
    {
      id: 'new-song-id',
      title: '新曲タイトル',
      excluded: false,
      notes: '必要ならメモを書く',
    },
    {
      id: 'new-song-tv-size',
      title: '新曲タイトル TV Size Ver.',
      excluded: true,
      excludeReason: 'TV Size',
    },
  ],
}
```

### 入力ルール

- `id`: 英数字とハイフン中心の重複しないIDにします。
- `title`: アプリに表示する曲名です。
- `releaseDate`: `YYYY-MM-DD` 形式にします。
- `sourceUrl`: 公式ディスコグラフィURLを入れます。
- `excluded: false`: ランキング・セットリストに表示します。
- `excluded: true`: データ上には残しますが、ランキング・セットリストには表示しません。
- `excludeReason`: 除外理由を書きます。
- `notes`: 補足があれば書きます。

## 除外曲の扱い

`excluded: true` の曲は、楽曲データ確認タブには表示できますが、ランキング作成・セットリスト作成には出ません。

除外対象の方針:

- Instrumental
- TV Size
- Short size
- メンバーver.
- 通常音源があるLive ver.
- Blu-ray映像のみ
- カバー曲

残す対象の方針:

- 通常音源が見当たらないLive ver.
- Bonus live音源系
- 年度違い・再録（別曲扱い）

アルバムとシングルで同じ曲が重複する場合は、アルバム側を優先し、シングル側は `excluded: true` として残します。

## 著作物ファイルを入れない運用ルール

このアプリはテキストベースのファンツールです。以下は追加しないでください。

- 音源ファイル（mp3, wav, m4a など）
- 動画ファイル（mp4 など）
- ジャケット画像、アーティスト写真、スクリーンショットなどの画像素材
- 歌詞テキスト
- 音楽再生・動画再生・歌詞表示・ジャケット画像表示機能

扱う情報は、曲名・収録作品名・発売日・公式ディスコグラフィURLなどのテキスト情報だけにしてください。

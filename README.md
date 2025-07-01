# Dev Container Notification Server

開発コンテナ（Dev Container）からホストの macOS に通知を送信するためのシンプルな HTTP サーバーです。Claude Code やその他の開発ツールを並列で実行する際に、作業の完了を通知で受け取ることができます。

## 🎯 用途

- **開発コンテナからの通知**: Docker コンテナ内からホストマシンに通知を送信
- **並列開発作業**: 複数の Claude Code セッションや開発タスクの完了通知
- **長時間処理の完了通知**: ビルドやテスト実行の完了をデスクトップ通知で確認

## 📋 必要な環境

- **macOS** (terminal-notifier を使用)
- **Node.js** (v12 以上推奨)
- **terminal-notifier** (Homebrew でインストール)

## 🚀 セットアップ

### 1. terminal-notifier のインストール

```bash
brew install terminal-notifier
```

### 2. サーバーの起動

```bash
node server.js
```

サーバーが起動すると以下のメッセージが表示されます：

```
通知サーバーを起動: http://localhost:37842
```

## 📡 使用方法

### 基本的な通知送信

```bash
curl -s -X POST http://localhost:37842/notify \
  -H "Content-Type: application/json" \
  -d '{"title": "作業完了", "message": "ビルドが完了しました"}'
```

### Container 内からの使用例

```bash
# ビルド完了後に通知
npm run build && curl -s -X POST http://host.docker.internal:37842/notify \
  -H "Content-Type: application/json" \
  -d '{"title": "Build Complete", "message": "プロジェクトのビルドが完了しました"}'
```

### JavaScript からの使用例

```javascript
async function sendNotification(title, message) {
  try {
    const response = await fetch("http://localhost:37842/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, message }),
    });

    const result = await response.json();
    console.log("通知送信:", result);
  } catch (error) {
    console.error("通知エラー:", error);
  }
}

// 使用例
sendNotification("テスト完了", "すべてのテストが正常に完了しました");
```

## 🔧 API 仕様

### エンドポイント

- **URL**: `http://localhost:37842/notify`
- **メソッド**: `POST`
- **Content-Type**: `application/json`

### リクエスト形式

```json
{
  "title": "通知のタイトル（省略可）",
  "message": "通知メッセージ（省略可）"
}
```

### レスポンス形式

**成功時:**

```json
{
  "status": "success",
  "message": "Notification sent"
}
```

**エラー時:**

```json
{
  "status": "error",
  "message": "Invalid JSON"
}
```

## 🛠️ カスタマイズ

### ポート番号の変更

`server.js`の 54 行目を編集：

```javascript
const PORT = 37842; // 任意のポート番号に変更
```

## 🔒 セキュリティ注意事項

- このサーバーは開発環境での使用を想定しており、本番環境での使用は推奨されません
- 外部からのアクセスを制限したい場合は、ファイアウォール設定を確認してください

## 📝 ライセンス

MIT License

## 🤝 貢献

バグ報告や機能要望は Issues でお知らせください。プルリクエストも歓迎します。

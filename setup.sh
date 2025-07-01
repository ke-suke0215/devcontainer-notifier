#!/bin/bash

# Dev Container Notification Server Setup Script
# このスクリプトは terminal-notifier のインストールからサーバー起動まで自動化します

set -e  # エラー時に停止

echo "🚀 Dev Container Notification Server セットアップを開始します..."

# terminal-notifier の確認とインストール
if ! command -v terminal-notifier &> /dev/null; then
    echo "📥 terminal-notifier をインストールします..."
    brew install terminal-notifier
else
    echo "✅ terminal-notifier が既にインストールされています"
fi

# 通知許可の案内
echo "⚠️  重要: 初回実行時は macOS の通知許可が必要な場合があります\n"

# テスト通知の送信
echo "📨 テスト通知を送信します..."
# terminal-notifier -message "セットアップが完了しました！" -title "Dev Container Notifier Test" -sound default
terminal-notifier -message "Successfully setup!" -title "Dev Container Notifier Test" -sound default

echo ""

# 使用方法の表示
echo "📋 サーバー起動後の使用方法:"
echo "curl -s -X POST http://localhost:37842/notify \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"title\": \"作業完了\", \"message\": \"ビルドが完了しました\"}'"
echo ""

# サーバー起動
node server.js
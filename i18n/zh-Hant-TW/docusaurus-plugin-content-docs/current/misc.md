---
sidebar_position: 11
---

# 小模組：紅屏 / 無縫切換 / 訊息轉發

三個輕量功能模組，各自獨立配置目錄。

## PhoenixTintHealth 低血量紅屏

血量低於閾值時螢幕邊緣紅色漸變，恢復血量後淡出。

- 配置：`plugins/PhoenixTintHealth/config.yml`（觸發血量、漸變時長、世界白名單）
- 命令：`/phoenixtinthealth reload`
- 許可權：`phoenix.tint.fade`（預設 true，玩家 receiving 效果）

## PhoenixSeamless 無縫世界切換

同維度世界間切換免過載（清除客戶端區塊快取，避免舊區塊殘留）。

- 配置：`plugins/PhoenixSeamless/config.yml`（世界白名單、觸發方式）
- 命令：`/phoenixseamless reload`
- 依賴：**PacketEvents**（未就緒時自動延遲重試註冊）

## PhoenixMessageBridge 訊息轉發

攔截系統訊息並轉發到指定渠道（例如 QQ 機器人橋接）。

- 配置：`plugins/PhoenixMessageBridge/config.yml`（`enabled` 總開關 + 匹配規則）
- 依賴：**PacketEvents**
- 無玩家命令，純配置驅動；改完配置重啟生效

---
sidebar_position: 11
---

# 小模組：紅屏 / 無縫切換 / 訊息分流橋

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

## PhoenixMessageBridge 訊息分流橋

攔截系統聊天訊息，按訊息首部的 `[標籤]` 分流到不同展示形式（源自 MessageBridge 融合 + 原有規則匹配），並支援 BetterHud popup 顯示/隱藏。

- 配置：`plugins/PhoenixMessageBridge/config.yml`
- 命令：無（`/phoenix reload` 過載）
- 依賴：**PacketEvents**

### 標籤分流

任何外掛（如 NPC 外掛、任務外掛）往聊天欄發的系統訊息，只要以標籤開頭就會被攔截並改寫展示形式，**內容不會出現在聊天欄**：

| 訊息寫法 | 效果 |
|---|---|
| `[title]擊敗首領！` | 大標題顯示（預設 10/70/20 刻） |
| `[title;20;60;20]擊敗首領！` | 自定義時長標題（淡入/停留/淡出，20 刻=1 秒） |
| `[subtitle]小心腳下的岩漿` | 副標題 |
| `[actionbar]餘額: 100` | 快捷欄（物品欄上方） |
| `[chat]普通訊息` | 強制走聊天欄（等於原樣顯示） |
| `[hide]任意內容` | 直接吞掉不顯示 |
| `[popup:公告]` | 顯示 BetterHud 的 popup `公告` |
| `[popup:公告:hide]` 或 `[/popup:公告]` | 隱藏該 popup |

內容支援 `&`/`§` 顏色程式碼與 MiniMessage（如 `<gradient:red:blue>`）。

### 規則匹配（不帶標籤的訊息）

不帶標籤的訊息按 `messages` 規則匹配（普通條目包含匹配、`#` 開頭條目正則匹配），命中則攔截並執行 `commands` 裡的 **Kether 指令碼**：

```yaml
messages:
  - "歡迎來到伺服器"
commands:
  - 'command "give {player} bread 5"'
```

佔位符：`{message}` 訊息原文（& 顏色）、`{legacy}` 帶 § 顏色的原文、`{player}` 玩家名。

### BetterHud popup 前置

`[popup:*]` 標籤需要安裝 **BetterHud** 並在 `plugins/BetterHud/popups/` 定義對應 popup（檔名即 popup 組，鍵名為 popup 名）。BetterHud 未安裝或 popup 名不存在時靜默跳過，不影響訊息攔截。

### 標籤分流指令碼

每個標籤可配置 `scripts.<標籤>` Kether 指令碼，在該標籤每次被分流時執行：

```yaml
scripts:
  title:
    - 'command "say 顯示了標題: {message}"'
```

---
sidebar_position: 5
---

# PhoenixBan 封禁與白名單

封禁 / 警告 / 白名單管理，支援**到期自動解封**、解封 Kether 指令碼、操作歷史審計。

## 命令

**入口：`/phoenixban`**（無引數顯示幫助）

| 命令 | 說明 | 許可權 |
|---|---|---|
| `/phoenixban kick <玩家> [原因]` | 踢出玩家 | `phoenix.kick` |
| `/phoenixban ban <玩家> [時長] [原因]` | 封禁玩家 | `phoenix.ban` |
| `/phoenixban unban <玩家>` | 解除封禁 | `phoenix.unban` |
| `/phoenixban whitelist <玩家> <true\|false>` | 白名單開關 | `phoenix.whitelist` |
| `/phoenixban warn <玩家> [原因]` | 記錄警告 | `phoenix.warn` |
| `/phoenixban delwarn <玩家> <序號\|all>` | 刪除警告 | `phoenix.delwarn` |
| `/phoenixban warnings <玩家>` | 檢視警告列表 | `phoenix.warnings` |
| `/phoenixban status <玩家>` | 檢視封禁狀態 | `phoenix.status` |
| `/phoenixban history <玩家>` | 檢視操作歷史 | `phoenix.history` |
| `/phoenixban reload` | 過載配置 | `phoenix.reload` |

## 時長寫法

`ban` 的時長支援組合單位：`30m`（30 分鐘）、`12h`、`7d`、`7d12h`、`perm` / 不填 = 永久。到期後由**自動解封任務**按週期掃描解封，無需人工干預。

## 配置

`plugins/PhoenixBan/config.yml`：預設封禁原因、自動解封週期、警告上限轉封禁等。

`plugins/PhoenixBan/messages.yml`：封禁/踢出屏顯文案，支援 `&` 顏色程式碼與佔位符（檔案內有註釋說明）。

## 解封指令碼（Kether）

`unban` 時會執行配置的 Kether 指令碼（如歸還許可權、廣播訊息）。指令碼行裡可用 `{player}`（玩家名）、`<unban_time>` 等變數，寫法與邊界事件指令碼一致。

## 資料

表 `phoenix_ban / phoenix_warn / phoenix_ban_history`，與兌換碼、邀請共用全域性資料來源（見[快速開始](./start)）。

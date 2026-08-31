---
sidebar_position: 6
---

# PhoenixCDK 兌換碼

禮包 + 兌換碼系統：管理員定義禮包內容，生成一次性/通用的兌換碼，玩家在聊天欄輸入兌換。

## 命令

**入口：`/phoenixcdk`**

| 命令 | 說明 | 許可權 |
|---|---|---|
| `/phoenixcdk redeem <兌換碼>` | 兌換禮包 | `phoenix.redeem` |
| `/phoenixcdk create <兌換碼> <禮包> [true\|false]` | 生成兌換碼 | `phoenix.code` |
| `/phoenixcdk delete <兌換碼>` | 刪除兌換碼 | `phoenix.code` |
| `/phoenixcdk batch <禮包> <數量> [字首]` | 批次生成（如直播發碼） | `phoenix.code` |
| `/phoenixcdk export <禮包>` | 匯出未使用的碼 | `phoenix.code` |
| `/phoenixcdk db get\|set\|save ...` | 資料庫操作 | `phoenix.database` |
| `/phoenixcdk reload` | 過載禮包與兌換碼 | `phoenix.reload` |

`create` 最後的 `true` 表示**全服通用碼**（所有玩家可各兌一次）；`false`（預設）為一次性碼（誰先用掉歸誰）。

## 定義禮包

禮包檔案放在 `plugins/PhoenixCDK/kit/` 目錄（可無限新增 yml 檔案），示例：

```yaml
# plugins/PhoenixCDK/kit/starter.yml
starter:
  display: "&a新手大禮包"
  commands:
    - 'command "give {player} bread 32"'
    - 'command "give {player} iron_ingot 16"'
    - 'command "money give {player} 500"'
```

生成與兌換流程：

1. `/phoenixcdk create WELCOME2026 starter true` → 生成通用碼 `WELCOME2026`；
2. 玩家在聊天欄直接輸入 `/phoenixcdk redeem WELCOME2026`，或先輸入 `redeem` 後按提示在聊天欄補全（有超時時間，見 `config.yml` 的 `chat-timeout-seconds`）；
3. 成功後禮包內命令以該玩家身份環境執行。

## 批次發碼場景（直播/活動）

```
/phoenixcdk batch starter 100 LIVE-
```

一次性生成 100 個 `LIVE-XXXX` 形式的碼，`/phoenixcdk export starter` 匯出未使用的碼複製到外部使用。

## 資料

表 `phoenix_redeem`（保留字列已做轉義處理），兌換記錄與碼狀態持久化在全域性資料庫。

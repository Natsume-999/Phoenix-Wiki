---
sidebar_position: 4
---

# 配置基礎與過載規則

## YAML 最小知識

Phoenix 的所有配置都是 YAML 檔案，只有三條鐵律：

1. **縮排用空格，不用 Tab**。同一層級的鍵必須左對齊：

```yaml
# 正確
invite_code:
  length: 6

# 錯誤（Tab 會直接報錯）
invite_code:
	length: 6
```

2. **冒號後面必須有一個空格**：`length: 6` ✅，`length:6` ❌；

3. **含中文/特殊符號的值加引號**：`name: "&6基礎禮包"`。

改完儲存後，用編輯器的 YAML 校驗（如 VS Code 裝 YAML 外掛）能提前發現格式錯誤。格式錯誤的直接後果：對應模組啟動或過載時報錯、配置回退預設值。

## 改了配置怎麼生效？

| 你改了什麼 | 怎麼生效 |
|---|---|
| `plugins/Phoenix/config.yml` 的 `lang.language` | `/phoenix reload` |
| `plugins/Phoenix/config.yml` 的 `modules` 模組開關 | **只能重啟伺服器** |
| `plugins/Phoenix/config.yml` 的 `database` | **只能重啟伺服器** |
| 任意模組自己的 config.yml / menus.yml / view.yml / messages.yml | 該模組命令的 `reload`（見下表） |
| 語言檔案 lang/*.yml | 對應模組 reload（或 `/phoenix reload`） |

**各模組的過載命令：**

| 模組 | 過載命令 |
|---|---|
| 封禁 | `/phoenixban reload` |
| 兌換碼 | `/phoenixcdk reload` |
| 出售 | `/phoenixsell reload` |
| 物品皮膚 | `/phoenixceskin reload` |
| 清理 | `/phoenixclear reload` |
| 世界邊界 | `/phoenixborder reload` |
| 紅屏 | `/phoenixtinthealth reload` |
| 無縫切換 | `/phoenixseamless reload` |
| 邀請 | `/phoenixinvite admin reload` |
| 交易 | `/phoenixtrade reload`（會取消進行中的交易） |

:::tip 判斷標準
改的是「數值/文案/開關某功能」→ reload；改的是「模組開關、資料庫、記憶體裡有快取的結構」→ 重啟。不確定時重啟最保險。
:::

## 備份與恢復

**SQLite（預設）**：整個資料庫就是 `plugins/Phoenix/phoenix.db` 一個檔案。

- **備份**：關服（或至少停止寫庫操作）後複製這個檔案到別處；
- **恢復**：關服 → 用備份檔案覆蓋 → 啟動。

**MySQL**：用資料庫工具（如 Navicat / phpMyAdmin / `mysqldump`）備份 `phoenix_*` 開頭的表。

**配置備份**：所有配置都在 `plugins/` 下的 `Phoenix*` 目錄裡，整目錄複製即完成全部備份。

## 從 SQLite 遷移到 MySQL

1. 先把 MySQL 連線資訊填好但**暫不切換** `type`；
2. 用工具匯出 `phoenix.db` 裡 `phoenix_ban / phoenix_warn / phoenix_ban_history / phoenix_redeem / phoenix_invite_*` 各表資料；
3. 在 MySQL 庫中建好同名表（表結構可在切換後讓外掛自動建立，再匯入資料）；
4. 把 `config.yml` 的 `database.type` 改成 `mysql`，重啟；
5. 匯入資料，抽查幾條記錄（如 `/phoenixban status 某玩家`）。

多服共用 MySQL 時：所有服的 Phoenix 版本建議一致；各服共用同一批表即資料互通（封禁/兌換碼/邀請全服同步）。

---
sidebar_position: 17
---

# 故障排查

遇到問題時按「先看日誌 → 再對症狀 → 最後重啟」的順序處理。

## 第一步：看啟動日誌

用文字編輯器開啟 `logs/latest.log`（或控制檯回滾），搜尋以下關鍵字：

| 搜尋關鍵字 | 含義 |
|---|---|
| `啟用 PhoenixXxx 失敗` | 對應模組啟動異常，後面跟著異常類名與堆疊 |
| `釋放預設檔案失敗` | jar 內資源缺失或磁碟許可權問題 |
| `讀取 data.yml 失敗` / `儲存 ... 失敗` | 磁碟/許可權問題 |
| `Vault 扣款失敗` / `Vault 入賬失敗` | 經濟外掛拒絕交易，看後面的「原因」 |
| `Invalid YAML` / `while parsing` | 配置檔案格式錯誤（多半是 Tab 或冒號後沒空格） |

## 常見症狀 → 解決

### 配置改了不生效

- 模組配置要用**模組自己的 reload**（見[配置基礎](./configuration)）；
- `modules` 開關和 `database` 只能重啟；
- 確認改的目錄對：每個模組的配置在 `plugins/PhoenixXxx/`，不在 `plugins/Phoenix/`。

### 配置檔案變成 0KB

舊版本殘留的壞檔案。**重啟伺服器**會自動檢測 0 位元組檔案並補寫預設內容。

### 選單打不開 / 顯示「選單配置不存在」

1. 確認 `plugins/PhoenixInvite/menus.yml` 存在且非 0KB；
2. 刪除該檔案重啟（自動重新生成預設選單）；
3. 看控制檯是否報「選單構建失敗」，後面跟異常原因。

### 交易介面沒有金幣按鈕

1. 確認安裝了 Vault 和一個經濟外掛（如 EssentialsX）；
2. 啟動日誌搜 `Vault`，確認經濟服務已註冊；
3. 確認 `Trade.Economy.Enable: true`；
4. 仍不行：`/phoenixtrade reload` 後重開介面。

### 交易金幣結算失敗提示

控制檯會有 `Vault 扣款失敗` 或 `Vault 入賬失敗` 及經濟外掛給出的原因。常見於：經濟外掛拒絕了本次操作（如上限、黑名單賬戶）。物品會自動全額返還，屬於安全設計。

### 兌換碼提示無效

確認用的是 `/phoenixcdk redeem 碼`（碼區分大小寫）；過載禮包後碼會重新載入；查碼是否已被用掉（一次性碼一人一次）。

### 邀請獎勵沒發

1. 金幣獎勵：確認 Vault + 經濟外掛在（見上文）；
2. 點券獎勵：確認 `economy.points_type` 與實際安裝的點券外掛匹配；
3. command 獎勵：看控制檯 Kether 報錯（常見是引號巢狀錯誤，見 [Kether 入門](./kether)）。

### 自動老玩家不生效

1. `auto_veteran.enabled: true` 了嗎？
2. `playtime_placeholder` 的變數在你伺服器能解析嗎？用 PlaceholderAPI 的 `/papi parse me %statistic_hours_played%` 測試；
3. 檢查間隔（`check_interval`）預設 300 秒，剛改完要等一輪。

### 資料庫報錯

- SQLite：確認 `plugins/Phoenix/` 目錄可寫、磁碟有空間；
- MySQL：看連線錯誤（拒絕連線=地址/埠錯，Access denied=賬號密碼錯，Unknown database=庫沒建）；
- 改完 database 配置必須重啟。

### 無縫切換 / 訊息轉發不工作

這兩個模組依賴 PacketEvents：確認 PacketEvents 已安裝且啟動日誌無 `PacketEvents 未就緒`。

## 仍然解決不了？

1. 打包以下內容提問：`logs/latest.log` 中與 Phoenix 相關的段落 + 你的配置檔案 + 操作步驟；
2. 到 [GitHub Issues](https://github.com/Natsume-999/Phoenix-Wiki/issues) 反饋。

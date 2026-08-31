---
sidebar_position: 1
---

# 介紹

**Phoenix** 是一款為 Paper / Leaf 1.21.11 服務端打造的**一體化整合外掛**，把伺服器常用的十多個功能融合進一個 jar：封禁管理、兌換碼、出售系統、物品皮膚、週期清理、世界邊界、邀請激勵、玩家交易……全部模組共用一個外掛本體，但**每個模組都擁有獨立的配置目錄與命令**，互不干擾。

## 模組一覽

| 模組 | 功能 | 命令 | 配置目錄 |
|---|---|---|---|
| Phoenix 本體 | 全域性配置 / 資料庫 / 語言切換 | `/phoenix` | `plugins/Phoenix/` |
| PhoenixBan | 封禁 / 警告 / 白名單 | `/phoenixban` | `plugins/PhoenixBan/` |
| PhoenixCDK | 禮包兌換碼 | `/phoenixcdk` | `plugins/PhoenixCDK/` |
| PhoenixSell | 出售系統 | `/phoenixsell` | `plugins/PhoenixSell/` |
| PhoenixCESkin | 物品皮膚 | `/phoenixceskin` | `plugins/PhoenixCESkin/` |
| PhoenixClear | 週期清理 / 虛空回收 | `/phoenixclear` | `plugins/PhoenixClear/` |
| PhoenixBorder | 世界邊界遣返 | `/phoenixborder` | `plugins/PhoenixBorder/` |
| PhoenixTintHealth | 低血量紅屏 | `/phoenixtinthealth` | `plugins/PhoenixTintHealth/` |
| PhoenixSeamless | 無縫世界切換 | `/phoenixseamless` | `plugins/PhoenixSeamless/` |
| PhoenixMessageBridge | 系統訊息轉發 | 無（配置驅動） | `plugins/PhoenixMessageBridge/` |
| PhoenixInvite | 邀請激勵系統 | `/phoenixinvite` | `plugins/PhoenixInvite/` |
| PhoenixTrade | 玩家對玩家交易 | `/phoenixtrade` | `plugins/PhoenixTrade/` |

## 文件導航

- 第一次搭伺服器 → [環境準備與安裝](./install)
- 改配置、備份、遷移資料庫 → [配置基礎與過載規則](./configuration)
- 寫獎勵/封禁指令碼 → [Kether 指令碼入門](./kether)
- 出問題了 → [故障排查](./troubleshooting) 與 [常見問題](./faq)

## 環境要求

| 專案 | 要求 |
|---|---|
| 服務端 | **Paper / Leaf 1.21.11**（不支援 Folia 與更低版本） |
| Java | 21 及以上 |
| 可選依賴 | PlaceholderAPI、PacketEvents、NeigeItems、Vault、PlayerPoints、LuckPerms、CraftEngine（按模組需要安裝即可，缺什麼少什麼功能，不影響啟動） |

## 安裝步驟

1. 下載 `Phoenix-x.y.z.jar`，放進服務端 `plugins/` 目錄；
2. 啟動（或重啟）伺服器；
3. 首次啟動會自動生成所有模組的預設配置目錄（見上表）；
4. 按需修改各模組配置，再用**對應模組自己的 reload 命令**過載；
5. 完成。

:::tip 首次啟動檢查
啟動日誌裡搜尋 `Phoenix`，正常應看到各模組載入資訊且沒有 `啟用 PhoenixXxx 失敗` 的警告。若某個依賴外掛（如 Vault）缺失，Phoenix 只會跳過對應功能並打提示，不會崩服。
:::

## 設計理念

- **一個 jar，多個模組**：更新、管理、許可權分配都只圍繞一個外掛；
- **配置目錄獨立**：每個模組的配置檔案結構與獨立外掛一致，遷移老配置零成本；
- **資料統一**：封禁 / 兌換碼 / 邀請三塊需要資料庫的功能共用同一個資料來源（SQLite 或 MySQL），分表隔離，備份只需一個檔案；
- **執行動作統一走 Kether**：所有「發命令」類配置（獎勵、封禁指令碼、邊界事件……）都是 Kether 指令碼行，寫法一致。

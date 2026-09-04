---
sidebar_position: 9
---

# PhoenixClear 週期清理與虛空回收

週期清理掉落物與遊蕩實體，附帶**虛空垃圾桶**（玩家自助找回被清理物品）、恢復系統、效能診斷（源自 CyuClear）。

## 命令

**入口：`/phoenixclear`**

| 命令 | 說明 | 許可權 |
|---|---|---|
| `/phoenixclear bin` | 開啟虛空垃圾桶 | `cyuclear.use` |
| `/phoenixclear items` | 手動清理全服掉落物 | `cyuclear.admin` |
| `/phoenixclear entities` | 手動清理全服遊蕩實體 | `cyuclear.admin` |
| `/phoenixclear all` | 手動全量大掃除 | `cyuclear.admin` |
| `/phoenixclear check` | 檢視準星目標的判定過程 | `cyuclear.admin` |
| `/phoenixclear preview` | 預演本次清理（不刪除） | `cyuclear.admin` |
| `/phoenixclear status` | 效能引數、名單規模與 Hook 狀態 | `cyuclear.admin` |
| `/phoenixclear menu` | 開啟管理中心 | `cyuclear.admin` |
| `/phoenixclear runs [頁]` | 歷史清理批次 | `cyuclear.admin` |
| `/phoenixclear run <批次> [details\|reasons]` | 批次詳情 | `cyuclear.admin` |
| `/phoenixclear recover <批次>` | 恢復指定批次物品 | `cyuclear.admin` |
| `/phoenixclear hotspots [頁]` | 熱點區塊 | `cyuclear.admin` |
| `/phoenixclear here [items\|entities\|all]` | 只清理自己腳下這一個區塊 | `cyuclear.admin` |
| `/phoenixclear tp <世界> <x> [y] <z>` | 安全傳送到座標（也可寫區塊座標） | `cyuclear.admin` |
| `/phoenixclear back` | 回到上次傳送前的位置 | `cyuclear.admin` |
| `/phoenixclear cancel` | 停止當前清理 | `cyuclear.admin` |
| `/phoenixclear doctor` | 配置自檢 | `cyuclear.admin` |
| `/phoenixclear snapshot` | 備份當前配置 | `cyuclear.admin` |
| `/phoenixclear history <玩家> [頁]` | 虛空桶領取記錄 | `cyuclear.admin` |
| `/phoenixclear reload` | 過載配置 | `phoenix.reload` |

## 快速上手

1. 開啟 `plugins/PhoenixClear/config.yml`，把 `enabled` 改為 `true`（**預設是關閉的**）；
2. 按需調整 `rules/` 裡的清理規則（哪些物品/實體、多大範圍、多久一次）；
3. `/phoenixclear reload` 生效；
4. 用 `/phoenixclear preview` 先預演一次，確認沒有誤刪風險再開週期。

## 虛空垃圾桶

被週期清理的物品（可配置）會進入虛空桶，玩家在時限內用 `/phoenixclear bin` 自助取回——既減負又減少糾紛。桶的開啟時段、容量、堆疊模式在 `void-bin/` 與 config 中配置。

## 處理卡服現場（熱點區塊）

伺服器某處堆了幾千個掉落物或刷怪塔炸了，不必全服大掃除，可以只處理那一塊：

1. `/phoenixclear hotspots` 看哪些區塊被判定為熱點（觸發次數、已清數量、是否處於熔斷攔截）；
2. 點開某個熱點的詳情，按**「前往該區塊」**（終界珍珠圖示）直接安全傳送過去；
3. 到現場後 `/phoenixclear here` 只清理腳下這一個區塊，想只清掉落物就 `here items`，只清實體就 `here entities`；
4. 處理完 `/phoenixclear back` 回到原來的位置。

區塊過載的提示訊息裡，管理員會額外看到一個**「前往查看」**按鈕，點一下直接傳送到出事的座標。

### 傳送為什麼是「安全」的

傳送前會先找一個能站住的位置：腳下是實心方塊、頭頂兩格是空的，並且避開岩漿、火、仙人掌、岩漿塊。地獄會從 120 格往下逐格找（避免直接落在岩漿湖或頂層基岩上）。落地後預設有 5 秒免傷保護，防止剛傳送過去就被摔死或被怪打死。

相關配置在 `config.yml`：

```yaml
teleport:
  landing-protection:
    enabled: true          # 落地免傷保護
    duration-seconds: 5    # 保護幾秒
    notify: true           # 抵消傷害時是否提示
  back:
    enabled: true          # 是否允許 /phoenixclear back
    timeout-seconds: 300   # 原點記憶多久過期（0 = 直到玩家離線）

here-cleanup:
  enabled: true            # 是否允許 /phoenixclear here
```

:::note 舊伺服器看不到這兩節配置
這兩節是新增的，而配置版本號沒變，所以**已有的 config.yml 不會自動補上這些行**。不改也能用（走上面寫的預設值）；想調整就照上面手動加到 `config.yml` 裡，或者刪掉 config.yml 讓它重新生成（會丟自訂內容，記得先備份）。
:::

## 配置目錄

```
plugins/PhoenixClear/
├── config.yml      總開關 / 效能引數 / 審計
├── rules/          清理規則
├── areas/          區域規則
├── storage/        儲存配置
├── void-bin/       虛空桶配置
└── sounds/         提示音效
```

:::tip doctor 自檢
配置寫完先跑 `/phoenixclear doctor`，它會列出配置錯誤與缺失檔案，避免上線後才發現規則沒載入。
:::

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

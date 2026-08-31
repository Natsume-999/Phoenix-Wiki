---
sidebar_position: 7
---

# PhoenixSell 出售系統

規則化出售系統（源自 VitaSell）：玩家把物品放進出售介面，按規則換錢。

## 命令

**入口：`/phoenixsell`**

| 命令 | 說明 | 許可權 |
|---|---|---|
| `/phoenixsell open [介面名]` | 開啟出售介面 | `phoenix.sell.open.*` |
| `/phoenixsell reload` | 過載規則與介面 | `phoenix.reload` |

## 目錄結構

```
plugins/PhoenixSell/
├── sell/            出售規則（一個 yml 一條規則，可無限新增）
│   └── Example/
│       ├── Example.yml      規則示例
│       └── table/           出售介面佈局（YML）
├── table/           舊版介面位置（已併入 sell/ 下 table/）
└── lang/            模組語言檔案（不是規則！）
```

:::warning 常見坑
- 規則檔案必須放在 `sell/` 目錄下，根目錄的 yml 不會被當作規則讀取（`lang/` 是語言檔案）；
- 每條規則必須包含 `.Item` 鍵定義物品，缺了會啟動報錯；
- 改完規則用 `/phoenixsell reload`，會顯示載入的規則數與介面數。
:::

## 使用流程

1. 玩家執行 `/phoenixsell open`（或帶介面名）開啟出售介面；
2. 把想賣的物品放進格子（按規則匹配價格）；
3. 點選確認出售，金幣到賬（走 Vault）。

出售後可觸發 Kether 動作（VitaSell 原生能力），交易記錄由 SellTradeLog 記錄。

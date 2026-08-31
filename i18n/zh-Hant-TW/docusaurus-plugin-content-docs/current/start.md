---
sidebar_position: 2
---

# 快速開始

## 目錄結構

首次啟動後，`plugins/` 下會生成如下結構（每個模組一個頂層目錄，與獨立外掛一致）：

```
plugins/
├── Phoenix/                  ← 本體：主配置 + 語言 + 資料庫
│   ├── config.yml              全域性配置（資料庫 / 模組開關 / 語言）
│   ├── lang/zh_CN.yml          主語言檔案
│   └── phoenix.db              SQLite 資料庫（預設）
├── PhoenixBan/               封禁模組
├── PhoenixCDK/
├── PhoenixSell/
├── PhoenixCESkin/
├── PhoenixClear/
├── PhoenixBorder/
├── PhoenixTintHealth/
├── PhoenixSeamless/
├── PhoenixMessageBridge/
├── PhoenixInvite/            邀請激勵（config.yml + menus.yml + lang/）
└── PhoenixTrade/             玩家交易（config.yml + view.yml + lang/ + data.yml）
```

## 模組開關

`plugins/Phoenix/config.yml` 的 `modules` 節控制各功能模組是否載入，**改動後需要重啟伺服器**：

```yaml
modules:
  ceskin: true      # 物品皮膚（PhoenixCESkin）
  clear: true       # 週期清理（PhoenixClear）
  border: true      # 世界邊界（PhoenixBorder）
  invite: true      # 邀請激勵（PhoenixInvite）
  trade: true       # 玩家交易（PhoenixTrade）
```

其他目錄型模組（Ban / CDK / Sell / TintHealth / Seamless / MessageBridge）始終隨外掛載入，不需要開關。

## 資料庫配置

封禁、兌換碼、邀請三個模組**共用同一個資料來源**（分表隔離），在 `plugins/Phoenix/config.yml` 裡配置：

```yaml
database:
  # 後端型別：sqlite（預設，零配置）或 mysql
  type: sqlite
  # SQLite 資料庫檔名（位於 plugins/Phoenix/ 下）
  file: phoenix.db

  # ---- 以下僅 type=mysql 時使用 ----
  host: 127.0.0.1
  port: 3306
  name: phoenix
  username: root
  password: ""
```

- **SQLite**：適合單服，資料就在 `plugins/Phoenix/phoenix.db` 一個檔案裡，備份直接複製；
- **MySQL**：適合群組服多端共享資料（封禁 / 兌換碼 / 邀請資料全服互通），需要提前建好 `phoenix` 庫。

:::note 表字首
封禁相關表為 `phoenix_ban / phoenix_warn / phoenix_ban_history`，兌換碼為 `phoenix_redeem`，邀請為 `phoenix_invite_players / phoenix_invite_records / phoenix_invite_pending / phoenix_invite_rebate`。多個服共用一個庫時不會互相沖突。
:::

## 語言

- **線上切換**：`/phoenix lang <zh_CN|en_US>`，立即生效並寫入配置；
- **手動切換**：改 `config.yml` 的 `lang.language` 後過載；
- **模組語言**：每個模組有自己的 `plugins/<模組>/lang/<語言>.yml`，可直接編輯玩家可見文案；
- 鍵名風格為扁平鍵（如 `Kick-Success`），佔位符為 `{0} {1} ...`。

## 過載規則

| 操作 | 命令 |
|---|---|
| 過載主配置與語言 | `/phoenix reload` |
| 過載封禁模組 | `/phoenixban reload` |
| 過載兌換碼 | `/phoenixcdk reload` |
| 過載出售系統 | `/phoenixsell reload` |
| 過載世界邊界 | `/phoenixborder reload` |
| 過載清理模組 | `/phoenixclear reload` |
| 過載物品皮膚 | `/phoenixceskin reload` |
| 過載邀請模組 | `/phoenixinvite admin reload` |
| 過載交易模組 | `/phoenixtrade reload` |
| 過載紅屏 / 無縫切換 | `/phoenixtinthealth reload` / `/phoenixseamless reload` |

:::warning 注意
各模組只認**自己命令下**的 reload；`/phoenix reload` 只過載主配置，不會連帶過載模組。模組開關（`modules` 節）任何 reload 都不生效，必須重啟。
:::

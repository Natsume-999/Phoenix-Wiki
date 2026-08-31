---
sidebar_position: 2
---

# 快速开始

## 目录结构

首次启动后，`plugins/` 下会生成如下结构（每个模块一个顶层目录，与独立插件一致）：

```
plugins/
├── Phoenix/                  ← 本体：主配置 + 语言 + 数据库
│   ├── config.yml              全局配置（数据库 / 模块开关 / 语言）
│   ├── lang/zh_CN.yml          主语言文件
│   └── phoenix.db              SQLite 数据库（默认）
├── PhoenixBan/               封禁模块
├── PhoenixCDK/
├── PhoenixSell/
├── PhoenixCESkin/
├── PhoenixClear/
├── PhoenixBorder/
├── PhoenixTintHealth/
├── PhoenixSeamless/
├── PhoenixMessageBridge/
├── PhoenixInvite/            邀请激励（config.yml + menus.yml + lang/）
└── PhoenixTrade/             玩家交易（config.yml + view.yml + lang/ + data.yml）
```

## 模块开关

`plugins/Phoenix/config.yml` 的 `modules` 节控制各功能模块是否加载，**改动后需要重启服务器**：

```yaml
modules:
  ceskin: true      # 物品皮肤（PhoenixCESkin）
  clear: true       # 周期清理（PhoenixClear）
  border: true      # 世界边界（PhoenixBorder）
  invite: true      # 邀请激励（PhoenixInvite）
  trade: true       # 玩家交易（PhoenixTrade）
```

其他目录型模块（Ban / CDK / Sell / TintHealth / Seamless / MessageBridge）始终随插件加载，不需要开关。

## 数据库配置

封禁、兑换码、邀请三个模块**共用同一个数据源**（分表隔离），在 `plugins/Phoenix/config.yml` 里配置：

```yaml
database:
  # 后端类型：sqlite（默认，零配置）或 mysql
  type: sqlite
  # SQLite 数据库文件名（位于 plugins/Phoenix/ 下）
  file: phoenix.db

  # ---- 以下仅 type=mysql 时使用 ----
  host: 127.0.0.1
  port: 3306
  name: phoenix
  username: root
  password: ""
```

- **SQLite**：适合单服，数据就在 `plugins/Phoenix/phoenix.db` 一个文件里，备份直接复制；
- **MySQL**：适合群组服多端共享数据（封禁 / 兑换码 / 邀请数据全服互通），需要提前建好 `phoenix` 库。

:::note 表前缀
封禁相关表为 `phoenix_ban / phoenix_warn / phoenix_ban_history`，兑换码为 `phoenix_redeem`，邀请为 `phoenix_invite_players / phoenix_invite_records / phoenix_invite_pending / phoenix_invite_rebate`。多个服共用一个库时不会互相冲突。
:::

## 语言

- **在线切换**：`/phoenix lang <zh_CN|en_US>`，立即生效并写入配置；
- **手动切换**：改 `config.yml` 的 `lang.language` 后重载；
- **模块语言**：每个模块有自己的 `plugins/<模块>/lang/<语言>.yml`，可直接编辑玩家可见文案；
- 键名风格为扁平键（如 `Kick-Success`），占位符为 `{0} {1} ...`。

## 重载规则

| 操作 | 命令 |
|---|---|
| 重载主配置与语言 | `/phoenix reload` |
| 重载封禁模块 | `/phoenixban reload` |
| 重载兑换码 | `/phoenixcdk reload` |
| 重载出售系统 | `/phoenixsell reload` |
| 重载世界边界 | `/phoenixborder reload` |
| 重载清理模块 | `/phoenixclear reload` |
| 重载物品皮肤 | `/phoenixceskin reload` |
| 重载邀请模块 | `/phoenixinvite admin reload` |
| 重载交易模块 | `/phoenixtrade reload` |
| 重载红屏 / 无缝切换 | `/phoenixtinthealth reload` / `/phoenixseamless reload` |

:::warning 注意
各模块只认**自己命令下**的 reload；`/phoenix reload` 只重载主配置，不会连带重载模块。模块开关（`modules` 节）任何 reload 都不生效，必须重启。
:::

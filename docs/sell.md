---
sidebar_position: 7
---

# PhoenixSell 出售系统

规则化出售系统（源自 VitaSell）：玩家把物品放进出售界面，按规则换钱。

## 命令

**入口：`/phoenixsell`**

| 命令 | 说明 | 权限 |
|---|---|---|
| `/phoenixsell open [界面名]` | 打开出售界面 | `phoenix.sell.open.*` |
| `/phoenixsell reload` | 重载规则与界面 | `phoenix.reload` |

## 目录结构

```
plugins/PhoenixSell/
├── sell/            出售规则（一个 yml 一条规则，可无限添加）
│   └── Example/
│       ├── Example.yml      规则示例
│       └── table/           出售界面布局（YML）
├── table/           旧版界面位置（已并入 sell/ 下 table/）
└── lang/            模块语言文件（不是规则！）
```

:::warning 常见坑
- 规则文件必须放在 `sell/` 目录下，根目录的 yml 不会被当作规则读取（`lang/` 是语言文件）；
- 每条规则必须包含 `.Item` 键定义物品，缺了会启动报错；
- 改完规则用 `/phoenixsell reload`，会显示加载的规则数与界面数。
:::

## 使用流程

1. 玩家执行 `/phoenixsell open`（或带界面名）打开出售界面；
2. 把想卖的物品放进格子（按规则匹配价格）；
3. 点击确认出售，金币到账（走 Vault）。

出售后可触发 Kether 动作（VitaSell 原生能力），交易记录由 SellTradeLog 记录。

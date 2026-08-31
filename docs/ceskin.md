---
sidebar_position: 6
---

# PhoenixCESkin 物品皮肤

物品皮肤系统（源自 YiyunCEskin）：用「皮肤卷轴」给手中物品套上自定义外观（材质/名称/描述），通过资源包显示。

## 命令

**入口：`/phoenixceskin`**

| 命令 | 说明 | 权限 |
|---|---|---|
| `/phoenixceskin` | 打开皮肤选择界面 | `yiyunceskin.use` |
| `/phoenixceskin apply <皮肤UUID>` | 应用皮肤到手中物品 | `yiyunceskin.use` |
| `/phoenixceskin remove` | 移除手中物品的皮肤 | `yiyunceskin.use` |
| `/phoenixceskin menu` / `list [页]` / `info` | 界面 / 列表 / 详情 | `yiyunceskin.use` |
| `/phoenixceskin give <玩家> <皮肤UUID> [--keep]` | 给予皮肤卷轴 | `yiyunceskin.admin` |
| `/phoenixceskin unwrapper` | 给予解包器（还原物品） | `yiyunceskin.admin` |
| `/phoenixceskin open <玩家>` | 为玩家打开皮肤界面 | `yiyunceskin.admin` |
| `/phoenixceskin drop <UUID> [x y z] [世界]` | 丢卷轴到指定坐标 | `yiyunceskin.admin` |
| `/phoenixceskin create <ID> [选项]` | 从手中物品生成皮肤配置 | `yiyunceskin.admin` |
| `/phoenixceskin migrate <目录>` | 从 HMCWraps 迁移皮肤 | `yiyunceskin.admin` |
| `/phoenixceskin reload` | 重载皮肤配置 | `yiyunceskin.admin` |

:::note 权限命名
权限节点沿用旧版 `yiyunceskin.*` 命名，方便老服的权限组直接兼容，改名会破坏已有权限配置。
:::

## 制作皮肤流程

1. 手持想做成皮肤的成品物品；
2. `/phoenixceskin create <ID>` 生成皮肤配置（写入 `plugins/PhoenixCESkin/` 下的皮肤定义）；
3. `/phoenixceskin reload` 重载；
4. `/phoenixceskin give <玩家> <UUID>` 发放皮肤卷轴，玩家手持目标物品使用卷轴即可套皮。

皮肤需要**资源包**支持（CustomModelData），服务器需配套分发资源包（如用 CraftEngine / BetterHud 托管）。

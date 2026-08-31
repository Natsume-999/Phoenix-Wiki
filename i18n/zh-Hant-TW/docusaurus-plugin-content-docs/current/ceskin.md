---
sidebar_position: 8
---

# PhoenixCESkin 物品皮膚

物品皮膚系統（源自 YiyunCEskin）：用「皮膚卷軸」給手中物品套上自定義外觀（材質/名稱/描述），透過資源包顯示。

## 命令

**入口：`/phoenixceskin`**

| 命令 | 說明 | 許可權 |
|---|---|---|
| `/phoenixceskin` | 開啟皮膚選擇介面 | `yiyunceskin.use` |
| `/phoenixceskin apply <皮膚UUID>` | 應用皮膚到手中物品 | `yiyunceskin.use` |
| `/phoenixceskin remove` | 移除手中物品的皮膚 | `yiyunceskin.use` |
| `/phoenixceskin menu` / `list [頁]` / `info` | 介面 / 列表 / 詳情 | `yiyunceskin.use` |
| `/phoenixceskin give <玩家> <皮膚UUID> [--keep]` | 給予皮膚卷軸 | `yiyunceskin.admin` |
| `/phoenixceskin unwrapper` | 給予解包器（還原物品） | `yiyunceskin.admin` |
| `/phoenixceskin open <玩家>` | 為玩家開啟皮膚介面 | `yiyunceskin.admin` |
| `/phoenixceskin drop <UUID> [x y z] [世界]` | 丟卷軸到指定座標 | `yiyunceskin.admin` |
| `/phoenixceskin create <ID> [選項]` | 從手中物品生成皮膚配置 | `yiyunceskin.admin` |
| `/phoenixceskin migrate <目錄>` | 從 HMCWraps 遷移皮膚 | `yiyunceskin.admin` |
| `/phoenixceskin reload` | 過載皮膚配置 | `yiyunceskin.admin` |

:::note 許可權命名
許可權節點沿用舊版 `yiyunceskin.*` 命名，方便老服的許可權組直接相容，改名會破壞已有許可權配置。
:::

## 製作皮膚流程

1. 手持想做成皮膚的成品物品；
2. `/phoenixceskin create <ID>` 生成皮膚配置（寫入 `plugins/PhoenixCESkin/` 下的皮膚定義）；
3. `/phoenixceskin reload` 過載；
4. `/phoenixceskin give <玩家> <UUID>` 發放皮膚卷軸，玩家手持目標物品使用卷軸即可套皮。

皮膚需要**資源包**支援（CustomModelData），伺服器需配套分發資源包（如用 CraftEngine / BetterHud 託管）。

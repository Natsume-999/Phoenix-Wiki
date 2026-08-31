---
sidebar_position: 12
---

# PhoenixInvite 邀請激勵系統

老玩家生成**專屬邀請碼** → 新玩家進服繫結 → 雙方受益：新玩家獲得新手禮包，老玩家累計邀請人數解鎖**里程碑獎勵**、獲得**許可權組獎勵**、享受**充值返點**。

## 玩家玩法全流程

### 1️⃣ 老玩家：獲取邀請碼

滿足以下任一條件後，玩家即成為「老玩家」（擁有 `phoenixinvite.veteran` 許可權或配置指定的許可權）：

- 由管理員手動用 LuckPerms 等許可權外掛授予；
- 開啟「自動老玩家」後，線上時長達標自動授予（見下文配置）。

老玩家使用 `/phoenixinvite code` 檢視自己的邀請碼，或用 `/phoenixinvite` 開啟主選單檢視。首次檢視會自動生成一個隨機碼（可在 config 自定義長度、字符集、字首）。

### 2️⃣ 新玩家：繫結邀請碼

三種方式（效果相同）：

| 方式 | 操作 |
|---|---|
| 命令帶參 | `/phoenixinvite bind ABC123` |
| 成書輸入 | `/phoenixinvite bind` → 彈出一本書 → 在書裡寫邀請碼 → 簽名提交（輸入 Q 取消） |
| 選單點選 | `/phoenixinvite` 開啟主選單 → 點「填寫邀請碼」 |

繫結成功的校驗順序：有使用許可權 → 邀請碼存在 → 自己沒用過 → 不是自己的碼 → IP 限制檢查 → 邀請人未達上限。任一步失敗都會給出對應提示。

繫結成功後：

- **新玩家**立即獲得邀請人當前禮包的獎勵（未購買禮包時按 `default` 禮包）；
- **老玩家**邀請數 +1，自動檢查里程碑、發全服公告（可配置）；
- 系統記錄雙方的 IP 用於同 IP 風控。

### 3️⃣ 老玩家：里程碑與禮包商店

- `/phoenixinvite` 主選單 → 「邀請中心」：格子顯示每個里程碑（🔴未解鎖 / 🟡可領取 / ⭐已領取），點選領取；
- 「禮包商店」（`/phoenixinvite buygift`）：老玩家花金幣+點券購買禮包，購買後**之後被其邀請的新玩家**按該禮包拿獎勵；已購禮包可隨時免費切換；限時禮包到期自動回退到更早的已購禮包或預設禮包。

### 4️⃣ 玩家常用命令

| 命令 | 說明 |
|---|---|
| `/phoenixinvite` | 開啟主選單 |
| `/phoenixinvite bind [邀請碼]` | 繫結邀請碼 |
| `/phoenixinvite code` | 檢視自己的邀請碼 |
| `/phoenixinvite stats` | 檢視邀請統計 |
| `/phoenixinvite contrib` | 檢視貢獻返點餘額 |
| `/phoenixinvite buygift` | 開啟禮包商店 |

## 管理員命令

| 命令 | 說明 |
|---|---|
| `/phoenixinvite givedj <玩家> <數量> [-norebate]` | **為玩家充值點券並觸發返點**（這是返點的入口命令） |
| `/phoenixinvite admin reload` | 過載 config.yml 與 menus.yml |
| `/phoenixinvite admin givecode <玩家>` | 為玩家生成邀請碼 |
| `/phoenixinvite admin clearcode <玩家>` | 清除玩家邀請碼 |
| `/phoenixinvite admin addinvite <玩家> <數量>` | 增加邀請數（會觸發里程碑檢查） |
| `/phoenixinvite admin reset <玩家>` | 重置玩家邀請資料（自動回滾邀請人計數） |
| `/phoenixinvite admin announce <玩家> <里程碑>` | 手動發全服公告 |
| `/phoenixinvite admin checkgroup <玩家>` | 手動檢查許可權組獎勵 |
| `/phoenixinvite admin contrib <玩家>` | 查詢貢獻返點 |
| `/phoenixinvite admin contrib add\|set\|deduct\|clear <玩家> <金額>` | 貢獻返點增刪改 |
| `/phoenixinvite admin contrib h <玩家> <金額>` | 把貢獻返點兌換成點券發放 |

:::tip 返點的正確用法
充值返點是**伺服器主動觸發**的：管理員（或你的充值系統後臺）執行 `/phoenixinvite givedj 玩家名 數量`。流程為：發點券給玩家 → 查該玩家的邀請人 → 按邀請人許可權算返點比例 → 點券發給邀請人（或記入貢獻返點）。同一「玩家+金額」的組合只會結算一次（防重複）。
:::

## 配置詳解（config.yml）

### 邀請碼

```yaml
invite_code:
  length: 6                                     # 邀請碼長度
  charset: "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789" # 字符集（預設已排除易混淆字元）
  prefix: ""                                    # 字首，如 "P-" 生成 P-ABC123
  veteran_permission: "phoenixinvite.veteran"   # 老玩家判定許可權
  use_permission: "phoenixinvite.use"           # 新玩家使用資格許可權
  allow_veteran_to_bind: false                  # 老玩家能否再綁別人的碼
  max_invites: 0                                # 每人最大邀請數（0=無限）
```

### 獎勵型別（里程碑 / 禮包通用）

`rewards` 列表支援四種型別，`command` 型別寫 **Kether 指令碼行**：

```yaml
rewards:
  - type: "command"                 # Kether 指令碼，{player} 執行時替換
    value: 'command "give {player} iron_ingot 16"'
  - type: "money"                   # Vault 金幣
    value: 100
  - type: "points"                  # 點券（見 economy.points_type）
    value: 10
  - type: "item"                    # 物品 "材質 數量"
    value: "COOKED_BEEF 64"
```

:::info Kether 說明
`command "..."` 是 Kether 的原版命令動作，**預設以控制檯身份執行**（無需寫 by console）。所以 `value` 整行就是一個 Kether 指令碼：先寫 `command "原版命令"`，命令裡的玩家名用 `{player}` 佔位。
:::

### 里程碑

鍵 = 所需邀請人數，可任意增刪：

```yaml
milestones:
  auto_claim: false       # true=達標自動發放（離線記入待領，上線補發）；false=選單手動領
  1:
    name: "社交新星"
    lore:                 # 選單裡顯示的獎勵描述（不寫則自動按 rewards 生成）
      - "&a100 金幣"
      - "&b10 點券"
    rewards:
      - type: "money"
        value: 100
      - type: "points"
        value: 10
  5:
    name: "社交達人"
    rewards:
      - type: "money"
        value: 500
```

### 禮包商店

```yaml
gift_shop:
  gifts:
    default:              # 老玩家沒買禮包時，新玩家拿這個
      name: "&6基礎禮包"
      material: "GOLD_INGOT"
      custom-model-data: 0
      price_money: 0      # 購買價：金幣
      price_points: 0     # 購買價：點券
      duration_days: 0    # 有效期天數（0=永久）
      rewards: [ ... ]    # 新玩家獲得的獎勵
      lore: [ ... ]       # 商店裡顯示的描述
    premium_gift:
      price_money: 2000
      price_points: 200
      duration_days: 30   # 30 天后過期並自動回退
      rewards: [ ... ]
```

```yaml
new_player_reward:
  default_gift_id: "default"  # 未購買時的兜底禮包
  require_gift: false         # true=老玩家必須買禮包，新玩家才有獎勵
```

### 自動老玩家

```yaml
auto_veteran:
  enabled: true
  playtime_placeholder: "%statistic_hours_played%"  # 線上時長 PAPI 變數
  playtime: "10h"             # 達標時長（30s/5m/10h，純數字=小時）
  value_unit: "hours"         # 佔位符返回值的單位
  check_interval: 300         # 檢查間隔（秒）
  grant_command:              # 達標後執行的 Kether 指令碼
    - 'command "lp user {player} permission set phoenixinvite.veteran true"'
  notify_message:
    - "&a恭喜！您的線上時長已達標，現在可以生成邀請碼邀請新玩家了！"
```

:::tip
`grant_command` 預設寫的是 LuckPerms 授權命令。用其他許可權外掛的話換成對應命令即可——只要最終玩家拿到 `veteran_permission` 指定的許可權就判定為老玩家。
:::

### IP 限制（防小號）

```yaml
ip_restriction:
  enabled: false          # true=同 IP 完全禁止繫結
  flexible_mode:          # enabled=false 時，同 IP 繫結按三項降級
    milestone: false      # 同 IP：老玩家拿不到里程碑進度
    rebate: true          # 同 IP：充值返點照常
    gift: false           # 同 IP：新玩家拿不到禮包
```

### 許可權組獎勵

新玩家獲得 `phoenixinvite.<組名>` 許可權時，獎勵邀請人（每組每條邀請只發一次，`weight` 大者優先）：

```yaml
permission_group_rewards:
  enabled: true
  permission_prefix: "phoenixinvite"
  check_interval: 10      # 許可權輪詢間隔秒（LuckPerms 建議 5-10）
  rewards:
    "lv2": { money: 100, points: 0, weight: 2 }
    "lv5": { money: 1000, points: 100, weight: 5 }
```

### 充值返點

```yaml
points_rebate:
  enabled: true
  points_command: 'command "points give {player} {amount}"'  # 發點券的 Kether 指令碼
  permission_prefix: "phoenixinvite.rebate"
  rebate_rates:           # 邀請人許可權 → 返點比例，weight 大者優先
    base:    { rate: 0.05, weight: 0 }                        # 所有人預設 5%
    vip:     { rate: 0.15, weight: 2 }                        # 有 phoenixinvite.rebate.vip 許可權 → 15%
    svip:    { rate: 0.20, weight: 3 }
    admin:   { rate: 0.00, weight: 99 }                       # 管理員不返點
    contribution: { rate: 0.1, weight: 98, contribution_mode: true }  # 貢獻模式：只記錄不發放
  anti_duplicate: { enabled: true }   # 相同玩家+金額視為同一筆
  limits: { min_amount: 10.0 }        # 低於此金額不觸發返點
```

### 經濟與點券

```yaml
economy:
  points_type: "PLAYERPOINTS"   # NONE=禁用 / PLAYERPOINTS=PlayerPoints 外掛 / CUSTOM=自定義命令
  points_command:
    give: 'command "points give {player} {amount}"'
    take: 'command "points take {player} {amount}"'
  money_command:
    give: 'command "money give %player% %amount%"'  # 金幣離線補發命令
```

## 選單佈局（menus.yml）

三個選單都是 `shape` 字元佈局 + 按鈕字典：

```yaml
veteran_menu:
  title: "&6&l邀請中心"
  shape:                # # 背景 / M 里程碑格 / G 當前禮包 / P N 翻頁 / B A C 固定按鈕
    - "B###G###A"
    - "#MMMMMMM#"
    - "#MMMMMMM#"
    - "#MMMMMMM#"
    - "P#######N"
  shape2: [ ... ]       # 第 2 頁及以後的佈局（不寫則沿用 shape）
  buttons:
    M:                  # 里程碑按鈕（動態）
      material: "GOLD_BLOCK"
      name: "&6&l{milestone_name}"
      lore:
        - "&7邀請進度: &e{current}&7/&a{required}"
        - "&7狀態: &e{status_text}"
        - "{reward_lore}"        # 整段展開為獎勵描述
      state_overrides:           # 三態覆蓋
        locked:    { material: "RED_STAINED_GLASS_PANE", name: "&c&l{milestone_name}", lore: [...] }
        claimed:   { material: "NETHER_STAR", name: "&a&l{milestone_name}", lore: [...] }
        available: { material: "GOLD_INGOT", name: "&6&l{milestone_name}", lore: [...] }
```

可用變數：

| 位置 | 變數 |
|---|---|
| 里程碑 M | `{milestone_name}` `{current}` `{required}` `{remaining}` `{status}` `{status_text}` `{reward_lore}` `{reward_lore_0}`… |
| 禮包 G | `{gift_name}` `{name}` `{price_money}` `{price_points}` `{duration_days}` `{duration_text}` `{reward_lore}` `{reward_lore_N}` |
| 主選單 A/B | `{bind_status}` `{inviter_name}` `{invite_code}` |

所有文字同時支援 PlaceholderAPI 與 `&` 顏色程式碼。

## 資料與佔位符

- 資料併入全域性庫：表 `phoenix_invite_players / phoenix_invite_records / phoenix_invite_pending / phoenix_invite_rebate`；
- 排行榜三榜（邀請數 / 貢獻返點 / 累計返點）按 `leaderboard.update_interval` 週期重新整理，供 PAPI 變數使用。

| 變數 | 示例 |
|---|---|
| `%phoenixinvite_code%` | ABC123 |
| `%phoenixinvite_total%` | 5 |
| `%phoenixinvite_next_milestone_name%` | 社交達人 |
| `%phoenixinvite_gift_name%` | &6高階禮包 |
| `%phoenixinvite_bind_status%` | 已繫結 / 未繫結 |
| `%phoenixinvite_milestone_5%` | true / false |
| `%phoenixinvite_top_invite_1_player%` | 榜一玩家名 |
| `%phoenixinvite_rank_contribution%` | 本人貢獻榜排名 |

## 常見問題

**Q：金幣獎勵沒到賬？**
金幣走 Vault——確認裝了 Vault 和經濟外掛；看啟動日誌裡 PhoenixInvite 的經濟連線狀態。

**Q：返點沒觸發？**
檢查三件事：金額 ≥ `min_amount`；執行方式是 `/phoenixinvite givedj`（不是直接用 points 外掛充值）；`anti_duplicate` 沒把同一筆攔截（同一玩家+金額只結一次）。

**Q：老玩家改了邀請碼，之前邀請的人算誰的？**
邀請記錄是**繫結時刻**落庫的，改碼隻影響之後來繫結的人，歷史記錄不變。

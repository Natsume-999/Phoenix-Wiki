---
sidebar_position: 10
---

# PhoenixInvite 邀请激励系统

老玩家生成**专属邀请码** → 新玩家进服绑定 → 双方受益：新玩家获得新手礼包，老玩家累计邀请人数解锁**里程碑奖励**、获得**权限组奖励**、享受**充值返点**。

## 玩家玩法全流程

### 1️⃣ 老玩家：获取邀请码

满足以下任一条件后，玩家即成为「老玩家」（拥有 `phoenixinvite.veteran` 权限或配置指定的权限）：

- 由管理员手动用 LuckPerms 等权限插件授予；
- 开启「自动老玩家」后，在线时长达标自动授予（见下文配置）。

老玩家使用 `/phoenixinvite code` 查看自己的邀请码，或用 `/phoenixinvite` 打开主菜单查看。首次查看会自动生成一个随机码（可在 config 自定义长度、字符集、前缀）。

### 2️⃣ 新玩家：绑定邀请码

三种方式（效果相同）：

| 方式 | 操作 |
|---|---|
| 命令带参 | `/phoenixinvite bind ABC123` |
| 成书输入 | `/phoenixinvite bind` → 弹出一本书 → 在书里写邀请码 → 签名提交（输入 Q 取消） |
| 菜单点击 | `/phoenixinvite` 打开主菜单 → 点「填写邀请码」 |

绑定成功的校验顺序：有使用权限 → 邀请码存在 → 自己没用过 → 不是自己的码 → IP 限制检查 → 邀请人未达上限。任一步失败都会给出对应提示。

绑定成功后：

- **新玩家**立即获得邀请人当前礼包的奖励（未购买礼包时按 `default` 礼包）；
- **老玩家**邀请数 +1，自动检查里程碑、发全服公告（可配置）；
- 系统记录双方的 IP 用于同 IP 风控。

### 3️⃣ 老玩家：里程碑与礼包商店

- `/phoenixinvite` 主菜单 → 「邀请中心」：格子显示每个里程碑（🔴未解锁 / 🟡可领取 / ⭐已领取），点击领取；
- 「礼包商店」（`/phoenixinvite buygift`）：老玩家花金币+点券购买礼包，购买后**之后被其邀请的新玩家**按该礼包拿奖励；已购礼包可随时免费切换；限时礼包到期自动回退到更早的已购礼包或默认礼包。

### 4️⃣ 玩家常用命令

| 命令 | 说明 |
|---|---|
| `/phoenixinvite` | 打开主菜单 |
| `/phoenixinvite bind [邀请码]` | 绑定邀请码 |
| `/phoenixinvite code` | 查看自己的邀请码 |
| `/phoenixinvite stats` | 查看邀请统计 |
| `/phoenixinvite contrib` | 查看贡献返点余额 |
| `/phoenixinvite buygift` | 打开礼包商店 |

## 管理员命令

| 命令 | 说明 |
|---|---|
| `/phoenixinvite givedj <玩家> <数量> [-norebate]` | **为玩家充值点券并触发返点**（这是返点的入口命令） |
| `/phoenixinvite admin reload` | 重载 config.yml 与 menus.yml |
| `/phoenixinvite admin givecode <玩家>` | 为玩家生成邀请码 |
| `/phoenixinvite admin clearcode <玩家>` | 清除玩家邀请码 |
| `/phoenixinvite admin addinvite <玩家> <数量>` | 增加邀请数（会触发里程碑检查） |
| `/phoenixinvite admin reset <玩家>` | 重置玩家邀请数据（自动回滚邀请人计数） |
| `/phoenixinvite admin announce <玩家> <里程碑>` | 手动发全服公告 |
| `/phoenixinvite admin checkgroup <玩家>` | 手动检查权限组奖励 |
| `/phoenixinvite admin contrib <玩家>` | 查询贡献返点 |
| `/phoenixinvite admin contrib add\|set\|deduct\|clear <玩家> <金额>` | 贡献返点增删改 |
| `/phoenixinvite admin contrib h <玩家> <金额>` | 把贡献返点兑换成点券发放 |

:::tip 返点的正确用法
充值返点是**服务器主动触发**的：管理员（或你的充值系统后台）执行 `/phoenixinvite givedj 玩家名 数量`。流程为：发点券给玩家 → 查该玩家的邀请人 → 按邀请人权限算返点比例 → 点券发给邀请人（或记入贡献返点）。同一「玩家+金额」的组合只会结算一次（防重复）。
:::

## 配置详解（config.yml）

### 邀请码

```yaml
invite_code:
  length: 6                                     # 邀请码长度
  charset: "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789" # 字符集（默认已排除易混淆字符）
  prefix: ""                                    # 前缀，如 "P-" 生成 P-ABC123
  veteran_permission: "phoenixinvite.veteran"   # 老玩家判定权限
  use_permission: "phoenixinvite.use"           # 新玩家使用资格权限
  allow_veteran_to_bind: false                  # 老玩家能否再绑别人的码
  max_invites: 0                                # 每人最大邀请数（0=无限）
```

### 奖励类型（里程碑 / 礼包通用）

`rewards` 列表支持四种类型，`command` 类型写 **Kether 脚本行**：

```yaml
rewards:
  - type: "command"                 # Kether 脚本，{player} 执行时替换
    value: 'command "give {player} iron_ingot 16"'
  - type: "money"                   # Vault 金币
    value: 100
  - type: "points"                  # 点券（见 economy.points_type）
    value: 10
  - type: "item"                    # 物品 "材质 数量"
    value: "COOKED_BEEF 64"
```

:::info Kether 说明
`command "..."` 是 Kether 的原版命令动作，**默认以控制台身份执行**（无需写 by console）。所以 `value` 整行就是一个 Kether 脚本：先写 `command "原版命令"`，命令里的玩家名用 `{player}` 占位。
:::

### 里程碑

键 = 所需邀请人数，可任意增删：

```yaml
milestones:
  auto_claim: false       # true=达标自动发放（离线记入待领，上线补发）；false=菜单手动领
  1:
    name: "社交新星"
    lore:                 # 菜单里显示的奖励描述（不写则自动按 rewards 生成）
      - "&a100 金币"
      - "&b10 点券"
    rewards:
      - type: "money"
        value: 100
      - type: "points"
        value: 10
  5:
    name: "社交达人"
    rewards:
      - type: "money"
        value: 500
```

### 礼包商店

```yaml
gift_shop:
  gifts:
    default:              # 老玩家没买礼包时，新玩家拿这个
      name: "&6基础礼包"
      material: "GOLD_INGOT"
      custom-model-data: 0
      price_money: 0      # 购买价：金币
      price_points: 0     # 购买价：点券
      duration_days: 0    # 有效期天数（0=永久）
      rewards: [ ... ]    # 新玩家获得的奖励
      lore: [ ... ]       # 商店里显示的描述
    premium_gift:
      price_money: 2000
      price_points: 200
      duration_days: 30   # 30 天后过期并自动回退
      rewards: [ ... ]
```

```yaml
new_player_reward:
  default_gift_id: "default"  # 未购买时的兜底礼包
  require_gift: false         # true=老玩家必须买礼包，新玩家才有奖励
```

### 自动老玩家

```yaml
auto_veteran:
  enabled: true
  playtime_placeholder: "%statistic_hours_played%"  # 在线时长 PAPI 变量
  playtime: "10h"             # 达标时长（30s/5m/10h，纯数字=小时）
  value_unit: "hours"         # 占位符返回值的单位
  check_interval: 300         # 检查间隔（秒）
  grant_command:              # 达标后执行的 Kether 脚本
    - 'command "lp user {player} permission set phoenixinvite.veteran true"'
  notify_message:
    - "&a恭喜！您的在线时长已达标，现在可以生成邀请码邀请新玩家了！"
```

:::tip
`grant_command` 默认写的是 LuckPerms 授权命令。用其他权限插件的话换成对应命令即可——只要最终玩家拿到 `veteran_permission` 指定的权限就判定为老玩家。
:::

### IP 限制（防小号）

```yaml
ip_restriction:
  enabled: false          # true=同 IP 完全禁止绑定
  flexible_mode:          # enabled=false 时，同 IP 绑定按三项降级
    milestone: false      # 同 IP：老玩家拿不到里程碑进度
    rebate: true          # 同 IP：充值返点照常
    gift: false           # 同 IP：新玩家拿不到礼包
```

### 权限组奖励

新玩家获得 `phoenixinvite.<组名>` 权限时，奖励邀请人（每组每条邀请只发一次，`weight` 大者优先）：

```yaml
permission_group_rewards:
  enabled: true
  permission_prefix: "phoenixinvite"
  check_interval: 10      # 权限轮询间隔秒（LuckPerms 建议 5-10）
  rewards:
    "lv2": { money: 100, points: 0, weight: 2 }
    "lv5": { money: 1000, points: 100, weight: 5 }
```

### 充值返点

```yaml
points_rebate:
  enabled: true
  points_command: 'command "points give {player} {amount}"'  # 发点券的 Kether 脚本
  permission_prefix: "phoenixinvite.rebate"
  rebate_rates:           # 邀请人权限 → 返点比例，weight 大者优先
    base:    { rate: 0.05, weight: 0 }                        # 所有人默认 5%
    vip:     { rate: 0.15, weight: 2 }                        # 有 phoenixinvite.rebate.vip 权限 → 15%
    svip:    { rate: 0.20, weight: 3 }
    admin:   { rate: 0.00, weight: 99 }                       # 管理员不返点
    contribution: { rate: 0.1, weight: 98, contribution_mode: true }  # 贡献模式：只记录不发放
  anti_duplicate: { enabled: true }   # 相同玩家+金额视为同一笔
  limits: { min_amount: 10.0 }        # 低于此金额不触发返点
```

### 经济与点券

```yaml
economy:
  points_type: "PLAYERPOINTS"   # NONE=禁用 / PLAYERPOINTS=PlayerPoints 插件 / CUSTOM=自定义命令
  points_command:
    give: 'command "points give {player} {amount}"'
    take: 'command "points take {player} {amount}"'
  money_command:
    give: 'command "money give %player% %amount%"'  # 金币离线补发命令
```

## 菜单布局（menus.yml）

三个菜单都是 `shape` 字符布局 + 按钮字典：

```yaml
veteran_menu:
  title: "&6&l邀请中心"
  shape:                # # 背景 / M 里程碑格 / G 当前礼包 / P N 翻页 / B A C 固定按钮
    - "B###G###A"
    - "#MMMMMMM#"
    - "#MMMMMMM#"
    - "#MMMMMMM#"
    - "P#######N"
  shape2: [ ... ]       # 第 2 页及以后的布局（不写则沿用 shape）
  buttons:
    M:                  # 里程碑按钮（动态）
      material: "GOLD_BLOCK"
      name: "&6&l{milestone_name}"
      lore:
        - "&7邀请进度: &e{current}&7/&a{required}"
        - "&7状态: &e{status_text}"
        - "{reward_lore}"        # 整段展开为奖励描述
      state_overrides:           # 三态覆盖
        locked:    { material: "RED_STAINED_GLASS_PANE", name: "&c&l{milestone_name}", lore: [...] }
        claimed:   { material: "NETHER_STAR", name: "&a&l{milestone_name}", lore: [...] }
        available: { material: "GOLD_INGOT", name: "&6&l{milestone_name}", lore: [...] }
```

可用变量：

| 位置 | 变量 |
|---|---|
| 里程碑 M | `{milestone_name}` `{current}` `{required}` `{remaining}` `{status}` `{status_text}` `{reward_lore}` `{reward_lore_0}`… |
| 礼包 G | `{gift_name}` `{name}` `{price_money}` `{price_points}` `{duration_days}` `{duration_text}` `{reward_lore}` `{reward_lore_N}` |
| 主菜单 A/B | `{bind_status}` `{inviter_name}` `{invite_code}` |

所有文本同时支持 PlaceholderAPI 与 `&` 颜色代码。

## 数据与占位符

- 数据并入全局库：表 `phoenix_invite_players / phoenix_invite_records / phoenix_invite_pending / phoenix_invite_rebate`；
- 排行榜三榜（邀请数 / 贡献返点 / 累计返点）按 `leaderboard.update_interval` 周期刷新，供 PAPI 变量使用。

| 变量 | 示例 |
|---|---|
| `%phoenixinvite_code%` | ABC123 |
| `%phoenixinvite_total%` | 5 |
| `%phoenixinvite_next_milestone_name%` | 社交达人 |
| `%phoenixinvite_gift_name%` | &6高级礼包 |
| `%phoenixinvite_bind_status%` | 已绑定 / 未绑定 |
| `%phoenixinvite_milestone_5%` | true / false |
| `%phoenixinvite_top_invite_1_player%` | 榜一玩家名 |
| `%phoenixinvite_rank_contribution%` | 本人贡献榜排名 |

## 常见问题

**Q：金币奖励没到账？**
金币走 Vault——确认装了 Vault 和经济插件；看启动日志里 PhoenixInvite 的经济连接状态。

**Q：返点没触发？**
检查三件事：金额 ≥ `min_amount`；执行方式是 `/phoenixinvite givedj`（不是直接用 points 插件充值）；`anti_duplicate` 没把同一笔拦截（同一玩家+金额只结一次）。

**Q：老玩家改了邀请码，之前邀请的人算谁的？**
邀请记录是**绑定时刻**落库的，改码只影响之后来绑定的人，历史记录不变。

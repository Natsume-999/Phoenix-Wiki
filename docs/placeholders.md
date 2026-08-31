---
sidebar_position: 15
---

# PlaceholderAPI 变量

服务端安装 [PlaceholderAPI](https://github.com/PlaceholderAPI/PlaceholderAPI) 后，以下变量可在计分板、菜单、全息等任何支持 PAPI 的地方使用。

## %phoenixinvite_*%（邀请激励）

| 变量 | 说明 |
|---|---|
| `%phoenixinvite_code%` | 玩家邀请码（无则 N/A） |
| `%phoenixinvite_total%` / `%phoenixinvite_total_invites%` | 累计邀请人数 |
| `%phoenixinvite_next_milestone%` | 下一个里程碑所需人数（无则 MAX） |
| `%phoenixinvite_next_milestone_name%` | 下一个里程碑名称 |
| `%phoenixinvite_remaining_for_next_milestone%` | 距下一里程碑还差几人 |
| `%phoenixinvite_gift_name%` | 当前礼包名 |
| `%phoenixinvite_has_gift%` | 是否已购礼包（true/false） |
| `%phoenixinvite_gift_status%` | 礼包状态（永久/已购买/已过期/N天） |
| `%phoenixinvite_gift_remaining_days%` | 礼包剩余天数 |
| `%phoenixinvite_bind_status%` | 绑定状态（已绑定/未绑定） |
| `%phoenixinvite_inviter_name%` | 邀请人名字 |
| `%phoenixinvite_milestone_<n>%` | 是否达成里程碑 n（true/false），如 `%phoenixinvite_milestone_5%` |

### 排行榜变量（三榜）

类型取值：`invite`（邀请数）/ `contribution`（贡献返点）/ `points`（累计返点）

| 变量 | 说明 |
|---|---|
| `%phoenixinvite_rank_<类型>%` | 本人在该榜的排名（无排名则 `-`） |
| `%phoenixinvite_my_<invites\|contribution\|points>%` | 本人对应数值 |
| `%phoenixinvite_top_<类型>_<1-10>_player%` | 榜单第 N 名玩家名 |
| `%phoenixinvite_top_invite_<1-10>_count%` | 邀请榜第 N 名数值 |
| `%phoenixinvite_top_points_<1-10>_rebate%` | 返点榜第 N 名数值 |

示例：`%phoenixinvite_top_invite_1_player%` = 邀请榜第一名。

## %phoenixtrade_*%（玩家交易）

| 变量 | 说明 |
|---|---|
| `%phoenixtrade_stats%` | 玩家是否接受交易（true / false） |

## %cyuclear_*%（周期清理）

常用变量（完整列表以 clear 模块内 PapiHook 为准）：

| 变量 | 说明 |
|---|---|
| `%cyuclear_enabled%` | 模块是否开启 |
| `%cyuclear_active%` | 是否在清理中 |
| `%cyuclear_countdown%` / `%cyuclear_countdown_text%` | 距下次清理秒数 / 文本 |
| `%cyuclear_last_items%` / `%cyuclear_last_entities%` | 上次清理数量 |
| `%cyuclear_bin_open%` / `%cyuclear_bin_countdown_text%` | 虚空桶状态 |
| `%cyuclear_run_status%` | 当前批次状态 |

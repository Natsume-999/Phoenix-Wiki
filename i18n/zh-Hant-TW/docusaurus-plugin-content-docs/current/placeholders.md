---
sidebar_position: 15
---

# PlaceholderAPI 變數

服務端安裝 [PlaceholderAPI](https://github.com/PlaceholderAPI/PlaceholderAPI) 後，以下變數可在計分板、選單、全息等任何支援 PAPI 的地方使用。

## %phoenixinvite_*%（邀請激勵）

| 變數 | 說明 |
|---|---|
| `%phoenixinvite_code%` | 玩家邀請碼（無則 N/A） |
| `%phoenixinvite_total%` / `%phoenixinvite_total_invites%` | 累計邀請人數 |
| `%phoenixinvite_next_milestone%` | 下一個里程碑所需人數（無則 MAX） |
| `%phoenixinvite_next_milestone_name%` | 下一個里程碑名稱 |
| `%phoenixinvite_remaining_for_next_milestone%` | 距下一里程碑還差幾人 |
| `%phoenixinvite_gift_name%` | 當前禮包名 |
| `%phoenixinvite_has_gift%` | 是否已購禮包（true/false） |
| `%phoenixinvite_gift_status%` | 禮包狀態（永久/已購買/已過期/N天） |
| `%phoenixinvite_gift_remaining_days%` | 禮包剩餘天數 |
| `%phoenixinvite_bind_status%` | 繫結狀態（已繫結/未繫結） |
| `%phoenixinvite_inviter_name%` | 邀請人名字 |
| `%phoenixinvite_milestone_<n>%` | 是否達成里程碑 n（true/false），如 `%phoenixinvite_milestone_5%` |

### 排行榜變數（三榜）

型別取值：`invite`（邀請數）/ `contribution`（貢獻返點）/ `points`（累計返點）

| 變數 | 說明 |
|---|---|
| `%phoenixinvite_rank_<型別>%` | 本人在該榜的排名（無排名則 `-`） |
| `%phoenixinvite_my_<invites\|contribution\|points>%` | 本人對應數值 |
| `%phoenixinvite_top_<型別>_<1-10>_player%` | 榜單第 N 名玩家名 |
| `%phoenixinvite_top_invite_<1-10>_count%` | 邀請榜第 N 名數值 |
| `%phoenixinvite_top_points_<1-10>_rebate%` | 返點榜第 N 名數值 |

示例：`%phoenixinvite_top_invite_1_player%` = 邀請榜第一名。

## %phoenixtrade_*%（玩家交易）

| 變數 | 說明 |
|---|---|
| `%phoenixtrade_stats%` | 玩家是否接受交易（true / false） |

## %phoenixlevel_*%（會員等級）

格式：`%phoenixlevel_<等級組>_<參數>%`。玩家不在該組或資料未載入返回 `N/A`。完整說明見 [PhoenixLevel](/level)。

| 變數 | 說明 |
|---|---|
| `%phoenixlevel_Example_level%` | 當前等級 |
| `%phoenixlevel_Example_display%` / `name%` | 等級組顯示名 / ID |
| `%phoenixlevel_Example_levelname%` | 當前等級顯示名（`lastlevelname` / `nextlevelname` 同理） |
| `%phoenixlevel_Example_minlevel%` / `maxlevel%` | 等級上下限 |
| `%phoenixlevel_Example_exp%` | 當前等級內經驗 |
| `%phoenixlevel_Example_nextlevelexp%` | 升到下一級所需經驗 |
| `%phoenixlevel_Example_levelprogresspercent%` / `expprogresspercent%` | 進度百分比（整數） |
| `%phoenixlevel_Example_levelprogressbar%` / `expprogressbar%` | 進度條（可自訂字元/長度） |
| `%phoenixlevel_Example_hasmember%` | 是否成員（true/false） |
| `%phoenixlevel_Example_levelexpfrom_5%` | 從 5 級到當前等級共需經驗 |
| `%phoenixlevel_Example_levelexpto_10%` | 從當前等級到 10 級還需經驗 |
| `%phoenixlevel_Example_levelexpfromto_5_10%` | 從 5 級到 10 級共需經驗 |

## %cyuclear_*%（週期清理）

常用變數（完整列表以 clear 模組內 PapiHook 為準）：

| 變數 | 說明 |
|---|---|
| `%cyuclear_enabled%` | 模組是否開啟 |
| `%cyuclear_active%` | 是否在清理中 |
| `%cyuclear_countdown%` / `%cyuclear_countdown_text%` | 距下次清理秒數 / 文字 |
| `%cyuclear_last_items%` / `%cyuclear_last_entities%` | 上次清理數量 |
| `%cyuclear_bin_open%` / `%cyuclear_bin_countdown_text%` | 虛空桶狀態 |
| `%cyuclear_run_status%` | 當前批次狀態 |

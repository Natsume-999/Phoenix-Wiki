---
sidebar_position: 18
---

# 常见问题

## 通用

**Q：改了配置不生效？**
模块配置用**自己命令**的 reload（如 `/phoenixban reload`、`/phoenixinvite admin reload`）；`modules` 节的模块开关只能重启生效。

**Q：某个模块目录下的配置文件是 0KB？**
旧版本残留的坏文件。Phoenix 在启动时会自动检测 0 字节文件并补写默认内容，重启即可。

**Q：想换 MySQL？**
改 `plugins/Phoenix/config.yml` 的 `database.type` 为 `mysql` 并填好连接信息，重启。数据自动走新库（不会自动迁移旧 sqlite 数据，需要手动导）。

## PhoenixInvite

**Q：玩家怎么变成「老玩家」？**
给他 `phoenixinvite.veteran` 权限（或 config 里 `veteran_permission` 指向的节点）；或开启 `auto_veteran` 按在线时长自动授予。

**Q：金币奖励没到账？**
金币走 Vault——确认装了 Vault 与经济插件，看启动日志里 PhoenixInvite 的经济状态行。

**Q：返点没触发？**
检查三件事：金额 ≥ `limits.min_amount`；必须用 `/phoenixinvite givedj` 触发（不是直接用 points 插件充值）；`anti_duplicate` 会拦截同一「玩家+金额」的重复结算。

**Q：怎么把返点比例做成 VIP 特权？**
在 `rebate_rates` 里加组（如 `vip: {rate: 0.15, weight: 2}`），然后给玩家 `phoenixinvite.rebate.vip` 权限。weight 大者优先。

**Q：贡献返点是什么？**
`contribution_mode: true` 的返点组不直接发点券，只累计到玩家贡献值；管理员用 `/phoenixinvite admin contrib h <玩家> <金额>` 手动兑换成点券。适合需要人工审核的分成模式。

**Q：菜单里奖励描述只显示了几行？**
奖励描述通过 `{reward_lore}`（整段展开）或 `{reward_lore_0}`、`{reward_lore_1}`…（逐行）占位符渲染；只显示前 N 行说明布局里只放了 N 个占位行，按需增删 menus.yml 里的占位行即可。

## PhoenixTrade

**Q：金币按钮不见了？**
未安装 Vault、经济插件未注册、或 `Trade.Economy.Enable: false`。物品交易不受影响。

**Q：想防止用交易转移绑定物品？**
开启 `Item-BlackList`，把绑定类物品的描述关键字（如「绑定」）加进 `Lore` 规则。

**Q：交易过程中玩家跑图/被打死怎么办？**
开启 `Safe.Damage`（交易中免伤）与 `Safe.Move`（交易中禁足）。

**Q：倒计时最后 1 秒对方把物品抽走了？**
不会。倒计时期间非确认区点击全部拦截；成交时物品按确认瞬间的界面内容交换，倒计时中的任何修改都会重置确认状态。

## 其他

**Q：出售界面没生成 / 显示 0 规则？**
删除 `plugins/PhoenixSell/` 重启（会重新释放示例），或直接 `/phoenixsell open`（检测到无界面时自动释放默认示例并重载）。注意规则文件必须放 `sell/` 目录。

**Q：Kether 脚本怎么写？**
所有「执行类」配置都是 Kether 脚本行，运行前先做 `{变量}` 文本替换。执行原版命令用 `command "say hi"`（默认控制台身份）；需要环境变量时直接写在脚本里，Phoenix 已注册自己的命名空间。

**Q：怎么备份数据？**
SQLite：复制 `plugins/Phoenix/phoenix.db` 一个文件即可（封禁/兑换码/邀请都在里面，分表隔离）。MySQL：用数据库工具备份 `phoenix_*` 开头的表。

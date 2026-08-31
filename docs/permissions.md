---
sidebar_position: 16
---

# 权限汇总

## 本体

| 权限 | 默认 | 说明 |
|---|---|---|
| `phoenix.reload` | OP | 所有 reload 类操作 |
| `phoenix.database` | OP | `/phoenix db` 与 `/phoenixcdk db` |

## PhoenixBan

| 权限 | 默认 |
|---|---|
| `phoenix.kick` / `phoenix.ban` / `phoenix.unban` | OP |
| `phoenix.whitelist` | OP |
| `phoenix.warn` / `phoenix.delwarn` / `phoenix.warnings` | OP |
| `phoenix.status` / `phoenix.history` | OP |

## PhoenixCDK

| 权限 | 默认 |
|---|---|
| `phoenix.redeem` | true（所有玩家） |
| `phoenix.code` | OP |

## PhoenixSell

| 权限 | 默认 |
|---|---|
| `phoenix.sell` | true |
| `phoenix.sell.open.*` | true |

## PhoenixCESkin

| 权限 | 默认 |
|---|---|
| `yiyunceskin.use` | true |
| `yiyunceskin.admin` | OP |

## PhoenixClear

| 权限 | 默认 |
|---|---|
| `cyuclear.use` | true |
| `cyuclear.bin.deposit` | true |
| `cyuclear.admin` | OP |

## PhoenixBorder

| 权限 | 默认 |
|---|---|
| `phoenix.border` | OP |
| `phoenix.border.bypass` | false |

## PhoenixTintHealth

| 权限 | 默认 |
|---|---|
| `phoenix.tint.fade` | true |

## PhoenixInvite

| 权限 | 默认 | 说明 |
|---|---|---|
| `phoenixinvite.use` | true | 填写邀请码等玩家操作 |
| `phoenixinvite.veteran` | 无 | **老玩家判定**（可被 config 的 `veteran_permission` 指向其他节点） |
| `phoenixinvite.buygift` | true | 打开礼包商店 |
| `phoenixinvite.admin` | OP | 邀请模块管理命令 |
| `phoenixinvite.rebate.<组名>` | 无 | 充值返点比例组（vip/svip/...，见 config） |

## PhoenixTrade

| 权限 | 默认 |
|---|---|
| `phoenixtrade.sendtrade` / `phoenixtrade.accept` / `phoenixtrade.toggle` | true |
| `phoenixtrade.trade` / `phoenixtrade.test` / `phoenixtrade.reload` | OP |

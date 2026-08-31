---
sidebar_position: 16
---

# 許可權彙總

## 本體

| 許可權 | 預設 | 說明 |
|---|---|---|
| `phoenix.reload` | OP | 所有 reload 類操作 |
| `phoenix.database` | OP | `/phoenix db` 與 `/phoenixcdk db` |

## PhoenixBan

| 許可權 | 預設 |
|---|---|
| `phoenix.kick` / `phoenix.ban` / `phoenix.unban` | OP |
| `phoenix.whitelist` | OP |
| `phoenix.warn` / `phoenix.delwarn` / `phoenix.warnings` | OP |
| `phoenix.status` / `phoenix.history` | OP |

## PhoenixCDK

| 許可權 | 預設 |
|---|---|
| `phoenix.redeem` | true（所有玩家） |
| `phoenix.code` | OP |

## PhoenixSell

| 許可權 | 預設 |
|---|---|
| `phoenix.sell` | true |
| `phoenix.sell.open.*` | true |

## PhoenixCESkin

| 許可權 | 預設 |
|---|---|
| `yiyunceskin.use` | true |
| `yiyunceskin.admin` | OP |

## PhoenixClear

| 許可權 | 預設 |
|---|---|
| `cyuclear.use` | true |
| `cyuclear.bin.deposit` | true |
| `cyuclear.admin` | OP |

## PhoenixBorder

| 許可權 | 預設 |
|---|---|
| `phoenix.border` | OP |
| `phoenix.border.bypass` | false |

## PhoenixTintHealth

| 許可權 | 預設 |
|---|---|
| `phoenix.tint.fade` | true |

## PhoenixInvite

| 許可權 | 預設 | 說明 |
|---|---|---|
| `phoenixinvite.use` | true | 填寫邀請碼等玩家操作 |
| `phoenixinvite.veteran` | 無 | **老玩家判定**（可被 config 的 `veteran_permission` 指向其他節點） |
| `phoenixinvite.buygift` | true | 開啟禮包商店 |
| `phoenixinvite.admin` | OP | 邀請模組管理命令 |
| `phoenixinvite.rebate.<組名>` | 無 | 充值返點比例組（vip/svip/...，見 config） |

## PhoenixTrade

| 許可權 | 預設 |
|---|---|
| `phoenixtrade.sendtrade` / `phoenixtrade.accept` / `phoenixtrade.toggle` | true |
| `phoenixtrade.trade` / `phoenixtrade.test` / `phoenixtrade.reload` | OP |

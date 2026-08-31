---
sidebar_position: 5
---

# PhoenixBan 封禁与白名单

封禁 / 警告 / 白名单管理，支持**到期自动解封**、解封 Kether 脚本、操作历史审计。

## 命令

**入口：`/phoenixban`**（无参数显示帮助）

| 命令 | 说明 | 权限 |
|---|---|---|
| `/phoenixban kick <玩家> [原因]` | 踢出玩家 | `phoenix.kick` |
| `/phoenixban ban <玩家> [时长] [原因]` | 封禁玩家 | `phoenix.ban` |
| `/phoenixban unban <玩家>` | 解除封禁 | `phoenix.unban` |
| `/phoenixban whitelist <玩家> <true\|false>` | 白名单开关 | `phoenix.whitelist` |
| `/phoenixban warn <玩家> [原因]` | 记录警告 | `phoenix.warn` |
| `/phoenixban delwarn <玩家> <序号\|all>` | 删除警告 | `phoenix.delwarn` |
| `/phoenixban warnings <玩家>` | 查看警告列表 | `phoenix.warnings` |
| `/phoenixban status <玩家>` | 查看封禁状态 | `phoenix.status` |
| `/phoenixban history <玩家>` | 查看操作历史 | `phoenix.history` |
| `/phoenixban reload` | 重载配置 | `phoenix.reload` |

## 时长写法

`ban` 的时长支持组合单位：`30m`（30 分钟）、`12h`、`7d`、`7d12h`、`perm` / 不填 = 永久。到期后由**自动解封任务**按周期扫描解封，无需人工干预。

## 配置

`plugins/PhoenixBan/config.yml`：默认封禁原因、自动解封周期、警告上限转封禁等。

`plugins/PhoenixBan/messages.yml`：封禁/踢出屏显文案，支持 `&` 颜色代码与占位符（文件内有注释说明）。

## 解封脚本（Kether）

`unban` 时会执行配置的 Kether 脚本（如归还权限、广播消息）。脚本行里可用 `{player}`（玩家名）、`<unban_time>` 等变量，写法与边界事件脚本一致。

## 数据

表 `phoenix_ban / phoenix_warn / phoenix_ban_history`，与兑换码、邀请共用全局数据源（见[快速开始](./start)）。

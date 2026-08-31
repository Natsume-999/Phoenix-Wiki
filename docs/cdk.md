---
sidebar_position: 4
---

# PhoenixCDK 兑换码

礼包 + 兑换码系统：管理员定义礼包内容，生成一次性/通用的兑换码，玩家在聊天栏输入兑换。

## 命令

**入口：`/phoenixcdk`**

| 命令 | 说明 | 权限 |
|---|---|---|
| `/phoenixcdk redeem <兑换码>` | 兑换礼包 | `phoenix.redeem` |
| `/phoenixcdk create <兑换码> <礼包> [true\|false]` | 生成兑换码 | `phoenix.code` |
| `/phoenixcdk delete <兑换码>` | 删除兑换码 | `phoenix.code` |
| `/phoenixcdk batch <礼包> <数量> [前缀]` | 批量生成（如直播发码） | `phoenix.code` |
| `/phoenixcdk export <礼包>` | 导出未使用的码 | `phoenix.code` |
| `/phoenixcdk db get\|set\|save ...` | 数据库操作 | `phoenix.database` |
| `/phoenixcdk reload` | 重载礼包与兑换码 | `phoenix.reload` |

`create` 最后的 `true` 表示**全服通用码**（所有玩家可各兑一次）；`false`（默认）为一次性码（谁先用掉归谁）。

## 定义礼包

礼包文件放在 `plugins/PhoenixCDK/kit/` 目录（可无限添加 yml 文件），示例：

```yaml
# plugins/PhoenixCDK/kit/starter.yml
starter:
  display: "&a新手大礼包"
  commands:
    - 'command "give {player} bread 32"'
    - 'command "give {player} iron_ingot 16"'
    - 'command "money give {player} 500"'
```

生成与兑换流程：

1. `/phoenixcdk create WELCOME2026 starter true` → 生成通用码 `WELCOME2026`；
2. 玩家在聊天栏直接输入 `/phoenixcdk redeem WELCOME2026`，或先输入 `redeem` 后按提示在聊天栏补全（有超时时间，见 `config.yml` 的 `chat-timeout-seconds`）；
3. 成功后礼包内命令以该玩家身份环境执行。

## 批量发码场景（直播/活动）

```
/phoenixcdk batch starter 100 LIVE-
```

一次性生成 100 个 `LIVE-XXXX` 形式的码，`/phoenixcdk export starter` 导出未使用的码复制到外部使用。

## 数据

表 `phoenix_redeem`（保留字列已做转义处理），兑换记录与码状态持久化在全局数据库。

---
sidebar_position: 4
---

# 配置基础与重载规则

## YAML 最小知识

Phoenix 的所有配置都是 YAML 文件，只有三条铁律：

1. **缩进用空格，不用 Tab**。同一层级的键必须左对齐：

```yaml
# 正确
invite_code:
  length: 6

# 错误（Tab 会直接报错）
invite_code:
	length: 6
```

2. **冒号后面必须有一个空格**：`length: 6` ✅，`length:6` ❌；

3. **含中文/特殊符号的值加引号**：`name: "&6基础礼包"`。

改完保存后，用编辑器的 YAML 校验（如 VS Code 装 YAML 插件）能提前发现格式错误。格式错误的直接后果：对应模块启动或重载时报错、配置回退默认值。

## 改了配置怎么生效？

| 你改了什么 | 怎么生效 |
|---|---|
| `plugins/Phoenix/config.yml` 的 `lang.language` | `/phoenix reload` |
| `plugins/Phoenix/config.yml` 的 `modules` 模块开关 | **只能重启服务器** |
| `plugins/Phoenix/config.yml` 的 `database` | **只能重启服务器** |
| 任意模块自己的 config.yml / menus.yml / view.yml / messages.yml | 该模块命令的 `reload`（见下表） |
| 语言文件 lang/*.yml | 对应模块 reload（或 `/phoenix reload`） |

**各模块的重载命令：**

| 模块 | 重载命令 |
|---|---|
| 封禁 | `/phoenixban reload` |
| 兑换码 | `/phoenixcdk reload` |
| 出售 | `/phoenixsell reload` |
| 物品皮肤 | `/phoenixceskin reload` |
| 清理 | `/phoenixclear reload` |
| 世界边界 | `/phoenixborder reload` |
| 红屏 | `/phoenixtinthealth reload` |
| 无缝切换 | `/phoenixseamless reload` |
| 邀请 | `/phoenixinvite admin reload` |
| 交易 | `/phoenixtrade reload`（会取消进行中的交易） |

:::tip 判断标准
改的是「数值/文案/开关某功能」→ reload；改的是「模块开关、数据库、内存里有缓存的结构」→ 重启。不确定时重启最保险。
:::

## 备份与恢复

**SQLite（默认）**：整个数据库就是 `plugins/Phoenix/phoenix.db` 一个文件。

- **备份**：关服（或至少停止写库操作）后复制这个文件到别处；
- **恢复**：关服 → 用备份文件覆盖 → 启动。

**MySQL**：用数据库工具（如 Navicat / phpMyAdmin / `mysqldump`）备份 `phoenix_*` 开头的表。

**配置备份**：所有配置都在 `plugins/` 下的 `Phoenix*` 目录里，整目录复制即完成全部备份。

## 从 SQLite 迁移到 MySQL

1. 先把 MySQL 连接信息填好但**暂不切换** `type`；
2. 用工具导出 `phoenix.db` 里 `phoenix_ban / phoenix_warn / phoenix_ban_history / phoenix_redeem / phoenix_invite_*` 各表数据；
3. 在 MySQL 库中建好同名表（表结构可在切换后让插件自动创建，再导入数据）；
4. 把 `config.yml` 的 `database.type` 改成 `mysql`，重启；
5. 导入数据，抽查几条记录（如 `/phoenixban status 某玩家`）。

多服共用 MySQL 时：所有服的 Phoenix 版本建议一致；各服共用同一批表即数据互通（封禁/兑换码/邀请全服同步）。

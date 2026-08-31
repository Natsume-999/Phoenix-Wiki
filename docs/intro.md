---
sidebar_position: 1
---

# 介绍

**Phoenix** 是一款为 Paper / Leaf 1.21.11 服务端打造的**一体化整合插件**，把服务器常用的十多个功能融合进一个 jar：封禁管理、兑换码、出售系统、物品皮肤、周期清理、世界边界、邀请激励、玩家交易……全部模块共用一个插件本体，但**每个模块都拥有独立的配置目录与命令**，互不干扰。

## 模块一览

| 模块 | 功能 | 命令 | 配置目录 |
|---|---|---|---|
| Phoenix 本体 | 全局配置 / 数据库 / 语言切换 | `/phoenix` | `plugins/Phoenix/` |
| PhoenixBan | 封禁 / 警告 / 白名单 | `/phoenixban` | `plugins/PhoenixBan/` |
| PhoenixCDK | 礼包兑换码 | `/phoenixcdk` | `plugins/PhoenixCDK/` |
| PhoenixSell | 出售系统 | `/phoenixsell` | `plugins/PhoenixSell/` |
| PhoenixCESkin | 物品皮肤 | `/phoenixceskin` | `plugins/PhoenixCESkin/` |
| PhoenixClear | 周期清理 / 虚空回收 | `/phoenixclear` | `plugins/PhoenixClear/` |
| PhoenixBorder | 世界边界遣返 | `/phoenixborder` | `plugins/PhoenixBorder/` |
| PhoenixTintHealth | 低血量红屏 | `/phoenixtinthealth` | `plugins/PhoenixTintHealth/` |
| PhoenixSeamless | 无缝世界切换 | `/phoenixseamless` | `plugins/PhoenixSeamless/` |
| PhoenixMessageBridge | 系统消息转发 | 无（配置驱动） | `plugins/PhoenixMessageBridge/` |
| PhoenixInvite | 邀请激励系统 | `/phoenixinvite` | `plugins/PhoenixInvite/` |
| PhoenixTrade | 玩家对玩家交易 | `/phoenixtrade` | `plugins/PhoenixTrade/` |

## 文档导航

- 第一次搭服务器 → [环境准备与安装](./install)
- 改配置、备份、迁移数据库 → [配置基础与重载规则](./configuration)
- 写奖励/封禁脚本 → [Kether 脚本入门](./kether)
- 出问题了 → [故障排查](./troubleshooting) 与 [常见问题](./faq)

## 环境要求

| 项目 | 要求 |
|---|---|
| 服务端 | **Paper / Leaf 1.21.11**（不支持 Folia 与更低版本） |
| Java | 21 及以上 |
| 可选依赖 | PlaceholderAPI、PacketEvents、NeigeItems、Vault、PlayerPoints、LuckPerms、CraftEngine（按模块需要安装即可，缺什么少什么功能，不影响启动） |

## 安装步骤

1. 下载 `Phoenix-x.y.z.jar`，放进服务端 `plugins/` 目录；
2. 启动（或重启）服务器；
3. 首次启动会自动生成所有模块的默认配置目录（见上表）；
4. 按需修改各模块配置，再用**对应模块自己的 reload 命令**重载；
5. 完成。

:::tip 首次启动检查
启动日志里搜索 `Phoenix`，正常应看到各模块加载信息且没有 `启用 PhoenixXxx 失败` 的警告。若某个依赖插件（如 Vault）缺失，Phoenix 只会跳过对应功能并打提示，不会崩服。
:::

## 设计理念

- **一个 jar，多个模块**：更新、管理、权限分配都只围绕一个插件；
- **配置目录独立**：每个模块的配置文件结构与独立插件一致，迁移老配置零成本；
- **数据统一**：封禁 / 兑换码 / 邀请三块需要数据库的功能共用同一个数据源（SQLite 或 MySQL），分表隔离，备份只需一个文件；
- **执行动作统一走 Kether**：所有「发命令」类配置（奖励、封禁脚本、边界事件……）都是 Kether 脚本行，写法一致。

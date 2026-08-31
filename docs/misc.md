---
sidebar_position: 9
---

# 小模块：红屏 / 无缝切换 / 消息转发

三个轻量功能模块，各自独立配置目录。

## PhoenixTintHealth 低血量红屏

血量低于阈值时屏幕边缘红色渐变，恢复血量后淡出。

- 配置：`plugins/PhoenixTintHealth/config.yml`（触发血量、渐变时长、世界白名单）
- 命令：`/phoenixtinthealth reload`
- 权限：`phoenix.tint.fade`（默认 true，玩家 receiving 效果）

## PhoenixSeamless 无缝世界切换

同维度世界间切换免重载（清除客户端区块缓存，避免旧区块残留）。

- 配置：`plugins/PhoenixSeamless/config.yml`（世界白名单、触发方式）
- 命令：`/phoenixseamless reload`
- 依赖：**PacketEvents**（未就绪时自动延迟重试注册）

## PhoenixMessageBridge 消息转发

拦截系统消息并转发到指定渠道（例如 QQ 机器人桥接）。

- 配置：`plugins/PhoenixMessageBridge/config.yml`（`enabled` 总开关 + 匹配规则）
- 依赖：**PacketEvents**
- 无玩家命令，纯配置驱动；改完配置重启生效

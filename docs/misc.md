---
sidebar_position: 11
---

# 小模块：红屏 / 无缝切换 / 消息分流桥

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

## PhoenixMessageBridge 消息分流桥

拦截系统聊天消息，按消息首部的 `[标签]` 分流到不同展示形式（源自 MessageBridge 融合 + 原有规则匹配），并支持 BetterHud popup 显示/隐藏。

- 配置：`plugins/PhoenixMessageBridge/config.yml`
- 命令：无（`/phoenix reload` 重载）
- 依赖：**PacketEvents**

### 标签分流

任何插件（如 NPC 插件、任务插件）往聊天栏发的系统消息，只要以标签开头就会被拦截并改写展示形式，**内容不会出现在聊天栏**：

| 消息写法 | 效果 |
|---|---|
| `[title]击败首领！` | 大标题显示（默认 10/70/20 刻） |
| `[title;20;60;20]击败首领！` | 自定义时长标题（淡入/停留/淡出，20 刻=1 秒） |
| `[subtitle]小心脚下的岩浆` | 副标题 |
| `[actionbar]余额: 100` | 快捷栏（物品栏上方） |
| `[chat]普通消息` | 强制走聊天栏（等于原样显示） |
| `[hide]任意内容` | 直接吞掉不显示 |
| `[popup:公告]` | 显示 BetterHud 的 popup `公告` |
| `[popup:公告:hide]` 或 `[/popup:公告]` | 隐藏该 popup |

内容支持 `&`/`§` 颜色代码与 MiniMessage（如 `<gradient:red:blue>`）。

### 规则匹配（不带标签的消息）

不带标签的消息按 `messages` 规则匹配（普通条目包含匹配、`#` 开头条目正则匹配），命中则拦截并执行 `commands` 里的 **Kether 脚本**：

```yaml
messages:
  - "欢迎来到服务器"
commands:
  - 'command "give {player} bread 5"'
```

占位符：`{message}` 消息原文（& 颜色）、`{legacy}` 带 § 颜色的原文、`{player}` 玩家名。

### BetterHud popup 前置

`[popup:*]` 标签需要安装 **BetterHud** 并在 `plugins/BetterHud/popups/` 定义对应 popup（文件名即 popup 组，键名为 popup 名）。BetterHud 未安装或 popup 名不存在时静默跳过，不影响消息拦截。

### 标签分流脚本

每个标签可配置 `scripts.<标签>` Kether 脚本，在该标签每次被分流时执行：

```yaml
scripts:
  title:
    - 'command "say 显示了标题: {message}"'
```

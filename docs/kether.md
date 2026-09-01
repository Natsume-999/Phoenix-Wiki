---
sidebar_position: 14
---

# Kether 脚本入门

Phoenix 里所有「执行类」配置都是 **Kether 脚本**：封禁/解封动作、邀请奖励的 `command` 类型、点券命令、金币命令、世界边界事件等。学会一次，处处可用。

## 基本规则

1. 配置里写的是**脚本行**，一行一个动作（也可一个字符串内多行）；
2. 运行前 Phoenix 会先把 `{变量}` 文本替换成实际值（如 `{player}` → 玩家名），再交给 Kether 执行；
3. 每个模块页面会列出自己支持哪些变量。

## 最常用：执行原版命令

```yaml
# 以控制台身份执行原版命令（最常用，给奖励就用这个）
- 'command "give {player} iron_ingot 16"'
```

注意两层引号：外层是 YAML 的引号，内层是 Kether 的字符串引号。`command` 动作**默认以控制台身份执行**，无需写权限提升。

## 其他常用动作

| 脚本 | 作用 |
|---|---|
| `command "say hello"` | 执行原版命令（控制台身份） |
| `tell "晚上好！"` | 给相关玩家发消息（在玩家上下文中） |
| `title "标题" and subtitle "副标题"` | 发标题 |
| `actionbar "提示文字"` | 发 actionbar |
| `sound "ENTITY_PLAYER_LEVELUP"` | 播放音效 |
| `wait 20 ticks` then `...` | 延迟 20 刻后再执行后续 |
| `show popup "名"` | 显示 BetterHud popup（需装 BetterHud，见[消息分流桥](/misc)） |
| `hide popup "名"` | 隐藏 BetterHud popup |

## 实战示例

**邀请模块：里程碑奖励（到达 10 人邀请时给命令奖励）：**

```yaml
milestones:
  10:
    name: "社交传奇"
    rewards:
      - type: "command"
        value: 'command "give {player} diamond 5"'
      - type: "money"
        value: 1000
```

**邀请模块：自定义点券命令（经济页 points_type=CUSTOM 时）：**

```yaml
economy:
  points_type: "CUSTOM"
  points_command:
    give: 'command "points give {player} {amount}"'
```

**封禁模块：解封后广播：**

```yaml
unban:
  scripts:
    - 'command "broadcast &a{player} 已解除封禁"'
```

## 模块专属命名空间

部分模块注册了自己的 Kether 动作，可在任何脚本里调用：

- `phoenixlevel_*`：等级组的查询与增减（`phoenixlevel_get_level <玩家> "组ID"`、`phoenixlevel_add_exp <玩家> "组ID" <数量>` 等），完整列表见 [PhoenixLevel](/level#命名空间动作-phoenixlevel)

## 排错

- 脚本没执行：检查引号嵌套（外单内双或外双内单，不能一样）、变量名拼写；
- 执行报错：控制台会打印 Kether 错误行与原因，按行号回配置找；
- 想确认变量替换结果：把动作临时改成 `command "say {player}-{amount}"` 观察聊天输出。

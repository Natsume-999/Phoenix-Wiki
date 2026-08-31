---
sidebar_position: 10
---

# PhoenixBorder 世界边界

多世界独立边界 + 越界遣返，事件全部支持 **Kether 脚本**（源自 GuGuBorder 源码级重写）。

## 命令

**入口：`/phoenixborder`**

| 命令 | 说明 |
|---|---|
| `/phoenixborder list` | 列出已配置的边界 |
| `/phoenixborder info [世界]` | 查看边界参数 |
| `/phoenixborder center [世界] [x y z]` | 设置中心（省略坐标 = 取脚下位置） |
| `/phoenixborder size [世界] <格数>` | 设置大小 |
| `/phoenixborder shape [世界] <square\|circle>` | 设置形状（方形/圆形） |
| `/phoenixborder toggle [世界]` | 开 / 关该世界的边界 |
| `/phoenixborder reload` | 重载配置 |

`center/size/shape` 会**直接写回配置文件**并立即生效，不用手动 reload。

## 配置

`plugins/PhoenixBorder/config.yml`：

```yaml
# 每个世界独立配置，未配置的世界回退到 defaults，defaults 也没有则用内置默认
worlds:
  world:
    enabled: true
    center-x: 0
    center-z: 0
    size: 5000            # 半径（格）
    shape: "SQUARE"       # SQUARE 方形 / CIRCLE 圆形
defaults:
  enabled: false
  size: 3000
```

权限：`phoenix.border`（命令，OP）；`phoenix.border.bypass`（越界豁免，默认关闭）。

## 事件 Kether 脚本

六个钩子（在 config 对应节点下配置脚本行）：

| 钩子 | 触发时机 |
|---|---|
| `on-exit` | 玩家越出边界 |
| `on-warning` | 靠近边界警告线 |
| `on-return` | 被遣返后 |
| `on-control-start` | 遣返控制开始 |
| `on-control-end` | 遣返控制结束 |
| `on-timeout` | 控制超时（强制传送回中心） |

脚本行可用 `{player}` 等变量（文件内有完整注释），例：

```yaml
on-exit:
  - 'tell "&c你已离开安全区，正在被遣返..."'
  - 'command "title {player} title {{\"text\":\"越界\",\"color\":\"red\"}}"'
```

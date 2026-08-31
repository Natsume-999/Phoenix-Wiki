---
sidebar_position: 10
---

# PhoenixBorder 世界邊界

多世界獨立邊界 + 越界遣返，事件全部支援 **Kether 指令碼**（源自 GuGuBorder 原始碼級重寫）。

## 命令

**入口：`/phoenixborder`**

| 命令 | 說明 |
|---|---|
| `/phoenixborder list` | 列出已配置的邊界 |
| `/phoenixborder info [世界]` | 檢視邊界引數 |
| `/phoenixborder center [世界] [x y z]` | 設定中心（省略座標 = 取腳下位置） |
| `/phoenixborder size [世界] <格數>` | 設定大小 |
| `/phoenixborder shape [世界] <square\|circle>` | 設定形狀（方形/圓形） |
| `/phoenixborder toggle [世界]` | 開 / 關該世界的邊界 |
| `/phoenixborder reload` | 過載配置 |

`center/size/shape` 會**直接寫回配置檔案**並立即生效，不用手動 reload。

## 配置

`plugins/PhoenixBorder/config.yml`：

```yaml
# 每個世界獨立配置，未配置的世界回退到 defaults，defaults 也沒有則用內建預設
worlds:
  world:
    enabled: true
    center-x: 0
    center-z: 0
    size: 5000            # 半徑（格）
    shape: "SQUARE"       # SQUARE 方形 / CIRCLE 圓形
defaults:
  enabled: false
  size: 3000
```

許可權：`phoenix.border`（命令，OP）；`phoenix.border.bypass`（越界豁免，預設關閉）。

## 事件 Kether 指令碼

六個鉤子（在 config 對應節點下配置指令碼行）：

| 鉤子 | 觸發時機 |
|---|---|
| `on-exit` | 玩家越出邊界 |
| `on-warning` | 靠近邊界警告線 |
| `on-return` | 被遣返後 |
| `on-control-start` | 遣返控制開始 |
| `on-control-end` | 遣返控制結束 |
| `on-timeout` | 控制超時（強制傳送回中心） |

指令碼行可用 `{player}` 等變數（檔案內有完整註釋），例：

```yaml
on-exit:
  - 'tell "&c你已離開安全區，正在被遣返..."'
  - 'command "title {player} title {{\"text\":\"越界\",\"color\":\"red\"}}"'
```

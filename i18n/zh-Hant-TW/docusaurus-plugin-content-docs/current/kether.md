---
sidebar_position: 14
---

# Kether 指令碼入門

Phoenix 裡所有「執行類」配置都是 **Kether 指令碼**：封禁/解封動作、邀請獎勵的 `command` 型別、點券命令、金幣命令、世界邊界事件等。學會一次，處處可用。

## 基本規則

1. 配置裡寫的是**指令碼行**，一行一個動作（也可一個字串內多行）；
2. 執行前 Phoenix 會先把 `{變數}` 文字替換成實際值（如 `{player}` → 玩家名），再交給 Kether 執行；
3. 每個模組頁面會列出自己支援哪些變數。

## 最常用：執行原版命令

```yaml
# 以控制檯身份執行原版命令（最常用，給獎勵就用這個）
- 'command "give {player} iron_ingot 16"'
```

注意兩層引號：外層是 YAML 的引號，內層是 Kether 的字串引號。`command` 動作**預設以控制檯身份執行**，無需寫許可權提升。

## 其他常用動作

| 指令碼 | 作用 |
|---|---|
| `command "say hello"` | 執行原版命令（控制檯身份） |
| `tell "晚上好！"` | 給相關玩家發訊息（在玩家上下文中） |
| `title "標題" and subtitle "副標題"` | 發標題 |
| `actionbar "提示文字"` | 發 actionbar |
| `sound "ENTITY_PLAYER_LEVELUP"` | 播放音效 |
| `wait 20 ticks` then `...` | 延遲 20 刻後再執行後續 |

## 實戰示例

**邀請模組：里程碑獎勵（到達 10 人邀請時給命令獎勵）：**

```yaml
milestones:
  10:
    name: "社交傳奇"
    rewards:
      - type: "command"
        value: 'command "give {player} diamond 5"'
      - type: "money"
        value: 1000
```

**邀請模組：自定義點券命令（經濟頁 points_type=CUSTOM 時）：**

```yaml
economy:
  points_type: "CUSTOM"
  points_command:
    give: 'command "points give {player} {amount}"'
```

**封禁模組：解封后廣播：**

```yaml
unban:
  scripts:
    - 'command "broadcast &a{player} 已解除封禁"'
```

## 排錯

- 指令碼沒執行：檢查引號巢狀（外單內雙或外雙內單，不能一樣）、變數名拼寫；
- 執行報錯：控制檯會列印 Kether 錯誤行與原因，按行號回配置找；
- 想確認變數替換結果：把動作臨時改成 `command "say {player}-{amount}"` 觀察聊天輸出。

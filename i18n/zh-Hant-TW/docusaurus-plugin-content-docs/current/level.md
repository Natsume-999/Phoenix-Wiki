---
sidebar_position: 13.5
---

# PhoenixLevel 會員等級

給玩家做**多套獨立的等級系統**（等級組）：比如一套「戰鬥等級」吃怪物經驗、一套「挖礦等級」吃挖礦經驗、一套「伺服器等級」吃在線時長。每套等級組有自己的等級範圍、升級所需經驗公式、升級條件和升級獎勵。融合自 AkariLevel，以 TabooLib + Kotlin 重寫。

- 指令：`/phoenixlevel`
- 設定目錄：`plugins/PhoenixLevel/`
- 資料：存放在 `plugins/Phoenix/` 的統一資料庫（表 `phoenix_level_members`），按 **UUID** 記錄，改名不丟資料

## 安裝與依賴

| 依賴 | 是否必需 | 作用 |
|---|---|---|
| 無 | 必需（無） | 本模組開箱即用 |
| PlaceholderAPI | 可選 | 變數（計分板、浮空字等處顯示等級/經驗） |
| MythicMobs 5.x | 可選 | 擊殺自訂怪物掉落等級經驗 |
| BetterHud / 計分板插件 | 可選 | 消費下方 PAPI 變數做展示 |

模組開關在 `plugins/Phoenix/config.yml` 的 `modules.level: true`（預設開啟）。關閉後重啟伺服器即完全停用，不建表不註冊監聽。

## 核心概念（新手必讀）

**等級組（Level Group）**：一套獨立的等級系統，寫成一個 yml 檔案（或一個檔案裡多個組）。玩家可以同時屬於多個等級組。

**關鍵等級（Key）**：不用為每一級寫設定。你只寫幾個「關鍵等級」，中間的等級自動沿用前一個關鍵等級的設定：

```yaml
Key:
  0: { ... }    # 0 級及以上的預設設定
  1: { ... }    # 1 級開始覆蓋
  5: { ... }    # 5 級開始覆蓋
  10: { ... }   # 10 級開始覆蓋到 Max
```

**經驗公式（Exp）**：每個關鍵等級寫一個**升到下一級需要多少經驗**的算式，支援 `+ - * / % ( )` 和變數 `level`（當前等級）：

- `"100"` → 固定 100 經驗
- `"100 + level * 50"` → 1 級要 150，2 級要 200……越升越難
- `"50 * (level + 1)"` → 支援括號

**經驗來源（Source）**：經驗從哪來、乘多少倍（訂閱倍率）：

```yaml
Source:
  Subscribe:
    COMMAND_ADD_EXP: 1.0        # 指令加經驗（管理操作）
    MYTHICMOBS_DROP_EXP: 1.0    # MythicMobs 擊殺掉落
    VANILLA_EXP_CHANGE: 1.0     # 原版經驗變化（開關見模組 config.yml）
```

倍率設 `2.0` 就是雙倍經驗，`0` 相當於關閉該來源。

**等級內進度**：經驗屬於「當前等級內」——升級後經驗歸零重算，進度條 = 當前等級內已有經驗 ÷ 本級所需經驗。

## 第一套等級組

首次啟動會生成 `plugins/PhoenixLevel/level/Example.yml`，直接改它或複製一份改名（如 `Mining.yml`）。帶完整註解的講解：

```yaml
Example:                        # 等級組 ID（內部名，指令/變數裡用）
  General:
    Display: "&6示例等級組"      # 顯示名（變數 {display} 用，支援顏色代碼）

  Source:                       # 經驗來源倍率
    Subscribe:
      COMMAND_ADD_EXP: 1.0
      MYTHICMOBS_DROP_EXP: 1.0
      VANILLA_EXP_CHANGE: 1.0

  Level:
    Min: 0                      # 最低等級
    Max: 100                    # 最高等級
    Auto-LevelUp: true          # 經驗夠了自動升級（false 則要指令/手動觸發）
    Exp-Limit: true             # 經驗達到本級上限後不再累積（false 則溢出累計）
    Key:
      0:                        # 關鍵等級 0
        Name: "&8Lv.&b{level}"  # 該檔等級的顯示名，{level} 會替換成等級數字
        Exp: "0"                # 0 級升 1 級需要 0 經驗（開局即升）
      1:
        Name: "&8Lv.&b{level}"
        Exp: "100 + level * 50" # 升級所需經驗公式
        Action:                 # 升到這個等級時執行（升級動作）
          Kether:
            - 'tell "&a恭喜，你升到了 {level} 級！"'
      5:
        Name: "&8Lv.&e{level}"
        Exp: "300 + level * 75"
        Condition:              # 升到該等級還需滿足的條件（不滿足則卡住不升）
          Kether:
            - "true"
        Action:
          Kether:
            - 'actionbar "&ePhoenixLevel &7等級 &f{newLevel}&7，經驗來源：&f{source}"'
      10:
        Name: "&8Lv.&6{level}"
        Exp: "500 + level * 100"
        Action:
          Kether:
            - 'command "give {member} golden_apple 1"'
```

### 設定校驗與常見報錯

儲存錯誤設定不會崩服，重載時會拒絕並提示：

- `Min`/`Max` 不是數字或 Min > Max
- 關鍵等級鍵不是數字（如寫成了 `第1級`）
- 某條 Exp 公式算出負數
- 末尾關鍵等級不足 Max：**自動補齊**最後一條到 Max，不中斷

### 變數替換表（條件/動作裡可用）

| 變數 | 含義 |
|---|---|
| `{member}` | 玩家名 |
| `{uuid}` | 玩家 UUID |
| `{levelGroup}` | 等級組 ID |
| `{level}` / `{newLevel}` | 當前（新）等級 |
| `{oldLevel}` | 升級前等級 |
| `{exp}` | 當前等級內經驗 |
| `{source}` | 本次經驗來源（如 `MYTHICMOBS_DROP_EXP`） |

## 指令

主指令 `/phoenixlevel`，簡寫結構如下（所有 `<玩家>` 支援線上玩家 Tab 補全）：

| 指令 | 作用 |
|---|---|
| `/phoenixlevel` 或 `/phoenixlevel help` | 顯示說明 |
| `/phoenixlevel reload` | 重載等級組設定與語言 |
| `/phoenixlevel levelgroup list` | 列出所有等級組（ID/顯示名/Min/Max） |
| `/phoenixlevel levelgroup info <等級組>` | 查看某個等級組詳情 |
| `/phoenixlevel member info <玩家> <等級組>` | 查看玩家在該組的等級與經驗 |
| `/phoenixlevel member add <玩家> <等級組>` | 把玩家加入等級組（從 Min 開始） |
| `/phoenixlevel member remove <玩家> <等級組>` | 把玩家移出等級組 |
| `/phoenixlevel member level set/add/remove <玩家> <等級組> <數量>` | 設定/加/減等級 |
| `/phoenixlevel member exp set/add/remove <玩家> <等級組> <數量>` | 設定/加/減經驗 |
| `/phoenixlevel member levelup <玩家> <等級組>` | 強制嘗試升一級（條件不滿足會提示） |

例子：

```text
/phoenixlevel member add Steve Example          # Steve 加入 Example 組
/phoenixlevel member exp add Steve Example 500  # 加 500 經驗（會吃 COMMAND_ADD_EXP 倍率）
/phoenixlevel member level set Steve Example 10 # 直接設為 10 級（不觸發逐級升級動作）
/phoenixlevel member exp add Alex Example 200   # Alex 沒加入過該組時自動按需處理並提示
```

## 權限

| 權限 | 預設 | 說明 |
|---|---|---|
| `phoenixlevel.command.use` | OP | 使用基礎指令（說明） |
| `phoenixlevel.command.reload` | OP | 重載 |
| `phoenixlevel.levelgroup` | OP | levelgroup 查詢子指令 |
| `phoenixlevel.member` | OP | member 全部子指令（含改等級/經驗，謹慎授予） |

指令根預設僅 OP 可見（`@CommandHeader` 的 PermissionDefault.OP）。

## PlaceholderAPI 變數

格式：`%phoenixlevel_<等級組>_<參數>%`。玩家不屬於該組或資料未載入時返回 `N/A`（不會報錯刷屏）。

| 變數 | 示例輸出 | 說明 |
|---|---|---|
| `%phoenixlevel_Example_level%` | `7` | 當前等級 |
| `%phoenixlevel_Example_display%` | 示例等級組 | 等級組顯示名 |
| `%phoenixlevel_Example_name%` | `Example` | 等級組 ID |
| `%phoenixlevel_Example_levelname%` | `Lv.7` | 當前等級顯示名 |
| `%phoenixlevel_Example_nextlevelname%` | `Lv.8` | 下一等級顯示名（`lastlevelname` 同理） |
| `%phoenixlevel_Example_minlevel%` / `maxlevel%` | `0` / `100` | 等級上下限 |
| `%phoenixlevel_Example_exp%` | `230` | 當前等級內經驗 |
| `%phoenixlevel_Example_nextlevelexp%` | `500` | 升到下一級還差的經驗 |
| `%phoenixlevel_Example_levelprogresspercent%` | `46` | 等級進度百分比（相對 Max） |
| `%phoenixlevel_Example_expprogresspercent%` | `46` | 本級經驗進度百分比 |
| `%phoenixlevel_Example_levelprogressbar%` | ■■■■■■□□□□ | 等級進度條（預設 10 格） |
| `%phoenixlevel_Example_expprogressbar%` | ■■■■■■□□□□ | 經驗進度條 |
| `%phoenixlevel_Example_hasmember%` | `true` | 是否為該組成員 |
| `%phoenixlevel_Example_levelexpfrom_5%` | `1230` | 從 5 級升到當前等級共需多少經驗 |
| `%phoenixlevel_Example_levelexpto_10%` | `2750` | 從當前等級升到 10 級還需多少經驗 |
| `%phoenixlevel_Example_levelexpfromto_5_10%` | `3980` | 從 5 級升到 10 級共需多少經驗 |

進度條可自訂填充字元與長度：

```text
%phoenixlevel_Example_expprogressbar_&a|_&7|_20%
```

四個底線段依次是：`填充字元`、`空白字元`、`長度`（1–64）。`&a|` 表示綠色豎線。

## MythicMobs 經驗掉落（可選）

在 **MythicMobs 的怪物設定**裡給怪物加 `Exp-Drop`，格式為 `"等級組 數量 機率"`（數量可寫區間，機率支援 0~1 小數或百分號）：

```yaml
# MythicMobs 設定（Mobs/xxx.yml）裡：
SkeletonKing:
  Type: SKELETON
  ...
  Exp-Drop:
    - "Example 50-100 0.5"     # 掉 50~100 點 Example 組經驗，50% 機率
    - "Example 30 30%"         # 掉 30 點，30% 機率（兩種寫法等價）
```

- 只支援 MythicMobs **5.x**（Paper/Leaf 1.21.11 環境建議版本）
- 未安裝 MythicMobs 時該整合自動跳過，不影響啟動
- 每條掉落在觸發時會先發出可取消事件（供其他插件聯動），再寫入經驗
- 寫錯的條目會在控制台提示「忽略無效 MythicMobs 經驗掉落」，不影響其他條目

## Kether 用法

### 升級條件（Condition）

寫在關鍵等級下，**全部條件通過才允許升到該級**。寫 Kether 表達式，結果為真才放行：

```yaml
Condition:
  Kether:
    - "check player has permission 'level.vip'"    # 示例：有 VIP 權限才能升到該級
```

### 升級動作（Action）

升到該等級時執行，支援全部 Kether 動作（`command` / `tell` / `actionbar` / `title` 等，見 [Kether 腳本入門](/kether)）：

```yaml
Action:
  Kether:
    - 'command "give {member} golden_apple 1"'
    - 'title "&6升級！" and subtitle "&7你現在是 {newLevel} 級"'
```

### 命名空間動作（phoenixlevel:*）

任何 Kether 腳本裡都能直接用下列等級組操作（比如在封禁模組的解封動作裡給玩家加經驗）：

| 腳本 | 作用 |
|---|---|
| `phoenixlevel_get_level <玩家> "組ID"` | 查等級 |
| `phoenixlevel_get_exp <玩家> "組ID"` | 查經驗 |
| `phoenixlevel_has_member <玩家> "組ID"` | 是否成員 |
| `phoenixlevel_add_exp <玩家> "組ID" <數量>` | 加經驗 |
| `phoenixlevel_remove_exp <玩家> "組ID" <數量>` | 減經驗 |
| `phoenixlevel_set_exp <玩家> "組ID" <數量>` | 設經驗 |
| `phoenixlevel_add_level / remove_level / set_level <玩家> "組ID" <數量>` | 等級同理 |
| `phoenixlevel_add_member / remove_member <玩家> "組ID"` | 加入/移出等級組 |

離線玩家資料未載入時返回 `NOT_LOADED`，不會報錯。

## 資料庫與遷移

- 資料在 `plugins/Phoenix/` 統一資料庫（`config.yml` 的 `database` 節設定 sqlite/mysql），表 `phoenix_level_members`，主鍵 UUID + 等級組
- 所有讀寫走非同步執行緒 + 記憶體快取：玩家加入時預載、退出時延遲落盤、重載/關服統一儲存，主執行緒只做記憶體操作
- **從舊 AkariLevel 遷移**：模組首次啟用時自動檢測舊資料表（如 `AkariLevel_Member`），按玩家名解析 UUID 後寫入新表，並生成遷移報告 `plugins/PhoenixLevel/migration-report.txt`；無法解析的舊記錄會列在報告裡（不會丟，可人工處理）
- 遷移是一次性的（標記檔案防重複），舊表不會被刪除，可放心先試跑

## 升級到 PhoenixLevel（原 AkariLevel 服主）

1. 安裝 Phoenix 並保持 modules.level 開啟，首次啟動自動遷移資料
2. 把舊等級組設定（`levelGroups/*.yml`）複製到 `plugins/PhoenixLevel/level/`，**刪掉舊版 JavaScript 條件/動作**，換成上面的 Kether 寫法
3. 舊變數 `%akarilevel_...%` 改為 `%phoenixlevel_...%`（參數名見上表）
4. 舊指令 `/akarilevel member ...` 改為 `/phoenixlevel member ...`（參數順序統一為 `<玩家> <等級組> <數量>`）

## 故障排查

| 現象 | 排查 |
|---|---|
| 變數顯示 `N/A` | 玩家不在該等級組（先用 `member add` 加入）；或資料還沒載入完（進服幾秒後重新整理） |
| 重載後設定沒生效 | 看啟動/重載日誌有沒有「設定校驗失敗」的行——公式負數、Min>Max、關鍵等級鍵非數字都會被拒絕 |
| 升級條件卡住 | `member levelup` 手動觸發一次，會明確提示「條件不滿足」；檢查 Condition 的 Kether 寫法 |
| MythicMobs 不掉經驗 | 確認裝了 MythicMobs 5.x、怪物設定的 `Exp-Drop` 格式（等級組 ID 必須先存在）、`integrations.mythicmobs.enabled: true` |
| 經驗加了但等級沒動 | `Auto-LevelUp: false` 時不會自動升級，用 `member levelup` 或改設定 |
| 資料庫想換 MySQL | 只改 `plugins/Phoenix/config.yml` 的 `database` 節，PhoenixLevel 跟隨統一資料庫，**不要**在等級組裡重複設定 |

:::tip 更改資料庫類型需要重啟
sqlite ↔ mysql 切換只在伺服器啟動時讀取，運行中 `/phoenixlevel reload` 不會切換，避免寫錯地方。
:::

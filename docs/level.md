---
sidebar_position: 13.5
---

# PhoenixLevel 会员等级

给玩家做**多套独立的等级系统**（等级组）：比如一套「战斗等级」吃怪物经验、一套「挖矿等级」吃挖矿经验、一套「服务器等级」吃在线时长。每套等级组有自己的等级范围、升级所需经验公式、升级条件和升级奖励。融合自 AkariLevel，以 TabooLib + Kotlin 重写。

- 命令：`/phoenixlevel`
- 配置目录：`plugins/PhoenixLevel/`
- 数据：存放在 `plugins/Phoenix/` 的统一数据库（表 `phoenix_level_members`），按 **UUID** 记录，改名不丢数据

## 安装与依赖

| 依赖 | 是否必需 | 作用 |
|---|---|---|
| 无 | 必需（无） | 本模块开箱即用 |
| PlaceholderAPI | 可选 | 变量（记分板、悬浮字等处显示等级/经验） |
| MythicMobs 5.x | 可选 | 击杀自定义怪物掉落等级经验 |
| BetterHud / 记分板插件 | 可选 | 消费下方 PAPI 变量做展示 |

模块开关在 `plugins/Phoenix/config.yml` 的 `modules.level: true`（默认开启）。关闭后重启服务器即完全停用，不建表不注册监听。

## 核心概念（新手必读）

**等级组（Level Group）**：一套独立的等级系统，写成一个 yml 文件（或一个文件里多个组）。玩家可以同时属于多个等级组。

**关键等级（Key）**：不用为每一级写配置。你只写几个「关键等级」，中间的等级自动沿用前一个关键等级的设置：

```yaml
Key:
  0: { ... }    # 0 级及以上的默认设置
  1: { ... }    # 1 级开始覆盖
  5: { ... }    # 5 级开始覆盖
  10: { ... }   # 10 级开始覆盖到 Max
```

**经验公式（Exp）**：每个关键等级写一个**升到下一级需要多少经验**的算式，支持 `+ - * / % ( )` 和变量 `level`（当前等级）：

- `"100"` → 固定 100 经验
- `"100 + level * 50"` → 1 级要 150，2 级要 200……越升越难
- `"50 * (level + 1)"` → 支持括号

**经验来源（Source）**：经验从哪来、乘多少倍（订阅倍率）：

```yaml
Source:
  Subscribe:
    COMMAND_ADD_EXP: 1.0        # 命令加经验（管理操作）
    MYTHICMOBS_DROP_EXP: 1.0    # MythicMobs 击杀掉落
    VANILLA_EXP_CHANGE: 1.0     # 原版经验变化（开关见模块 config.yml）
```

倍率设 `2.0` 就是双倍经验，`0` 相当于关闭该来源。

**等级内进度**：经验属于「当前等级内」——升级后经验清零重算，进度条 = 当前等级内已有经验 ÷ 本级所需经验。

## 第一套等级组

首次启动会生成 `plugins/PhoenixLevel/level/Example.yml`，直接改它或复制一份改名（如 `Mining.yml`）。带完整注释的讲解：

```yaml
Example:                        # 等级组 ID（内部名，命令/变量里用）
  General:
    Display: "&6示例等级组"      # 显示名（变量 {display} 用，支持颜色代码）

  Source:                       # 经验来源倍率
    Subscribe:
      COMMAND_ADD_EXP: 1.0
      MYTHICMOBS_DROP_EXP: 1.0
      VANILLA_EXP_CHANGE: 1.0

  Level:
    Min: 0                      # 最低等级
    Max: 100                    # 最高等级
    Auto-LevelUp: true          # 经验够了自动升级（false 则要命令/手动触发）
    Exp-Limit: true             # 经验达到本级上限后不再累积（false 则溢出累计）
    Key:
      0:                        # 关键等级 0
        Name: "&8Lv.&b{level}"  # 该档等级的显示名，{level} 会替换成等级数字
        Exp: "0"                # 0 级升 1 级需要 0 经验（开局即升）
      1:
        Name: "&8Lv.&b{level}"
        Exp: "100 + level * 50" # 升级所需经验公式
        Action:                 # 升到这个等级时执行（升级动作）
          Kether:
            - 'tell "&a恭喜，你升到了 {level} 级！"'
      5:
        Name: "&8Lv.&e{level}"
        Exp: "300 + level * 75"
        Condition:              # 升到该等级还需满足的条件（不满足则卡住不升）
          Kether:
            - "check perm_level >= 5"
        Action:
          Kether:
            - 'actionbar "&e等级 &f{newLevel}&7，经验来源：&f{source}"'
      10:
        Name: "&8Lv.&6{level}"
        Exp: "500 + level * 100"
        Action:
          Kether:
            - 'command "give {member} golden_apple 1"'
```

### 配置校验与常见报错

保存错误配置不会崩服，重载时会拒绝并提示：

- `Min`/`Max` 不是数字或 Min > Max
- 关键等级键不是数字（如写成了 `第1级`）
- 某条 Exp 公式算出负数
- 末尾关键等级不足 Max：**自动补齐**最后一条到 Max，不中断

### 变量替换表（条件/动作里可用）

| 变量 | 含义 |
|---|---|
| `{member}` | 玩家名 |
| `{uuid}` | 玩家 UUID |
| `{levelGroup}` | 等级组 ID |
| `{level}` / `{newLevel}` | 当前（新）等级 |
| `{oldLevel}` | 升级前等级 |
| `{exp}` | 当前等级内经验 |
| `{source}` | 本次经验来源（如 `MYTHICMOBS_DROP_EXP`） |

## 命令

主命令 `/phoenixlevel`，简写结构如下（所有 `<玩家>` 支持在线玩家 Tab 补全）：

| 命令 | 作用 |
|---|---|
| `/phoenixlevel` 或 `/phoenixlevel help` | 显示帮助 |
| `/phoenixlevel reload` | 重载等级组配置与语言 |
| `/phoenixlevel levelgroup list` | 列出所有等级组（ID/显示名/Min/Max） |
| `/phoenixlevel levelgroup info <等级组>` | 查看某个等级组详情 |
| `/phoenixlevel member info <玩家> <等级组>` | 查看玩家在该组的等级与经验 |
| `/phoenixlevel member add <玩家> <等级组>` | 把玩家加入等级组（从 Min 开始） |
| `/phoenixlevel member remove <玩家> <等级组>` | 把玩家移出等级组 |
| `/phoenixlevel member level set/add/remove <玩家> <等级组> <数量>` | 设定/加/减等级 |
| `/phoenixlevel member exp set/add/remove <玩家> <等级组> <数量>` | 设定/加/减经验 |
| `/phoenixlevel member levelup <玩家> <等级组>` | 强制尝试升一级（条件不满足会提示） |

例子：

```text
/phoenixlevel member add Steve Example          # Steve 加入 Example 组
/phoenixlevel member exp add Steve Example 500  # 加 500 经验（会吃 COMMAND_ADD_EXP 倍率）
/phoenixlevel member level set Steve Example 10 # 直接设为 10 级（不触发逐级升级动作）
/phoenixlevel member exp add Alex Example 200   # Alex 没加入过该组时自动按需处理并提示
```

## 权限

| 权限 | 默认 | 说明 |
|---|---|---|
| `phoenixlevel.command.use` | OP | 使用基础命令（帮助） |
| `phoenixlevel.command.reload` | OP | 重载 |
| `phoenixlevel.levelgroup` | OP | levelgroup 查询子命令 |
| `phoenixlevel.member` | OP | member 全部子命令（含改等级/经验，谨慎授予） |

命令根默认仅 OP 可见（`@CommandHeader` 的 PermissionDefault.OP）。

## PlaceholderAPI 变量

格式：`%phoenixlevel_<等级组>_<参数>%`。玩家不属于该组或数据未加载时返回 `N/A`（不会报错刷屏）。

| 变量 | 示例输出 | 说明 |
|---|---|---|
| `%phoenixlevel_Example_level%` | `7` | 当前等级 |
| `%phoenixlevel_Example_display%` | 示例等级组 | 等级组显示名 |
| `%phoenixlevel_Example_name%` | `Example` | 等级组 ID |
| `%phoenixlevel_Example_levelname%` | `Lv.7` | 当前等级显示名 |
| `%phoenixlevel_Example_nextlevelname%` | `Lv.8` | 下一等级显示名（`lastlevelname` 同理） |
| `%phoenixlevel_Example_minlevel%` / `maxlevel%` | `0` / `100` | 等级上下限 |
| `%phoenixlevel_Example_exp%` | `230` | 当前等级内经验 |
| `%phoenixlevel_Example_nextlevelexp%` | `500` | 升到下一级还差的经验 |
| `%phoenixlevel_Example_levelprogresspercent%` | `46` | 等级进度百分比（相对 Max） |
| `%phoenixlevel_Example_expprogresspercent%` | `46` | 本级经验进度百分比 |
| `%phoenixlevel_Example_levelprogressbar%` | ■■■■■■□□□□ | 等级进度条（默认 10 格） |
| `%phoenixlevel_Example_expprogressbar%` | ■■■■■■□□□□ | 经验进度条 |
| `%phoenixlevel_Example_hasmember%` | `true` | 是否为该组成员 |
| `%phoenixlevel_Example_levelexpfrom_5%` | `1230` | 从 5 级升到当前等级共需多少经验 |
| `%phoenixlevel_Example_levelexpto_10%` | `2750` | 从当前等级升到 10 级还需多少经验 |
| `%phoenixlevel_Example_levelexpfromto_5_10%` | `3980` | 从 5 级升到 10 级共需多少经验 |

进度条可自定义填充字符与长度：

```text
%phoenixlevel_Example_expprogressbar_&a|_&7|_20%
```

四个下划线段依次是：`填充字符`、`空白字符`、`长度`（1–64）。`&a|` 表示绿色竖线。

## MythicMobs 经验掉落（可选）

在 **MythicMobs 的怪物配置**里给怪物加 `Exp-Drop`，格式为 `"等级组 数量 概率"`（数量可写区间，概率支持 0~1 小数或百分号）：

```yaml
# MythicMobs 配置（Mobs/xxx.yml）里：
SkeletonKing:
  Type: SKELETON
  ...
  Exp-Drop:
    - "Example 50-100 0.5"     # 掉 50~100 点 Example 组经验，50% 概率
    - "Example 30 30%"         # 掉 30 点，30% 概率（两种写法等价）
```

- 只支持 MythicMobs **5.x**（Paper/Leaf 1.21.11 环境推荐版本）
- 未安装 MythicMobs 时该集成自动跳过，不影响启动
- 每条掉落在触发时会先发出可取消事件（供其他插件联动），再写入经验
- 写错的条目会在控制台提示「忽略无效 MythicMobs 经验掉落」，不影响其他条目

## Kether 用法

### 升级条件（Condition）

写在关键等级下，**全部条件通过才允许升到该级**。写 Kether 表达式，结果为真才放行：

```yaml
Condition:
  Kether:
    - "check player has permission 'level.vip'"    # 示例：有 VIP 权限才能升到该级
```

### 升级动作（Action）

升到该等级时执行，支持全部 Kether 动作（`command` / `tell` / `actionbar` / `title` 等，见 [Kether 脚本入门](/kether)）：

```yaml
Action:
  Kether:
    - 'command "give {member} golden_apple 1"'
    - 'title "&6升级！" and subtitle "&7你现在是 {newLevel} 级"'
```

### 命名空间动作（phoenixlevel:*）

任何 Kether 脚本里都能直接用下列等级组操作（比如在封禁模块的解封动作里给玩家加经验）：

| 脚本 | 作用 |
|---|---|
| `phoenixlevel_get_level <玩家> "组ID"` | 查等级 |
| `phoenixlevel_get_exp <玩家> "组ID"` | 查经验 |
| `phoenixlevel_has_member <玩家> "组ID"` | 是否成员 |
| `phoenixlevel_add_exp <玩家> "组ID" <数量>` | 加经验 |
| `phoenixlevel_remove_exp <玩家> "组ID" <数量>` | 减经验 |
| `phoenixlevel_set_exp <玩家> "组ID" <数量>` | 设经验 |
| `phoenixlevel_add_level / remove_level / set_level <玩家> "组ID" <数量>` | 等级同理 |
| `phoenixlevel_add_member / remove_member <玩家> "组ID"` | 加入/移出等级组 |

离线玩家数据未加载时返回 `NOT_LOADED`，不会报错。

## 数据库与迁移

- 数据在 `plugins/Phoenix/` 统一数据库（`config.yml` 的 `database` 节配置 sqlite/mysql），表 `phoenix_level_members`，主键 UUID + 等级组
- 所有读写走异步线程 + 内存缓存：玩家加入时预载、退出时延迟落盘、重载/关服统一保存，主线程只做内存操作
- **从旧 AkariLevel 迁移**：模块首次启用时自动检测旧数据表（如 `AkariLevel_Member`），按玩家名解析 UUID 后写入新表，并生成迁移报告 `plugins/PhoenixLevel/migration-report.txt`；无法解析的旧记录会列在报告里（不会丢，可人工处理）
- 迁移是一次性的（标记文件防重复），旧表不会被删除，可放心先试跑

## 升级到 PhoenixLevel（原 AkariLevel 服主）

1. 安装 Phoenix 并保持 modules.level 开启，首次启动自动迁移数据
2. 把旧等级组配置（`levelGroups/*.yml`）复制到 `plugins/PhoenixLevel/level/`，**删掉旧版 JavaScript 条件/动作**，换成上面的 Kether 写法
3. 旧变量 `%akarilevel_...%` 改为 `%phoenixlevel_...%`（参数名见上表）
4. 旧命令 `/akarilevel member ...` 改为 `/phoenixlevel member ...`（参数顺序统一为 `<玩家> <等级组> <数量>`）

## 故障排查

| 现象 | 排查 |
|---|---|
| 变量显示 `N/A` | 玩家不在该等级组（先用 `member add` 加入）；或数据还没加载完（进服几秒后刷新） |
| 重载后配置没生效 | 看启动/重载日志有没有「配置校验失败」的行——公式负数、Min>Max、关键等级键非数字都会被拒绝 |
| 升级条件卡住 | `member levelup` 手动触发一次，会明确提示「条件不满足」；检查 Condition 的 Kether 写法 |
| MythicMobs 不掉经验 | 确认装了 MythicMobs 5.x、怪物配置的 `Exp-Drop` 格式（等级组 ID 必须先存在）、`integrations.mythicmobs.enabled: true` |
| 经验加了但等级没动 | `Auto-LevelUp: false` 时不会自动升级，用 `member levelup` 或改配置 |
| 数据库想换 MySQL | 只改 `plugins/Phoenix/config.yml` 的 `database` 节，PhoenixLevel 跟随统一数据库，**不要**在等级组里重复配置 |

:::tip 更改数据库类型需要重启
sqlite ↔ mysql 切换只在服务器启动时读取，运行中 `/phoenixlevel reload` 不会切换，避免写错地方。
:::

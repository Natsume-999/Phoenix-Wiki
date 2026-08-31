---
sidebar_position: 3
---

# 环境准备与安装

本页面向**第一次搭服务器**的服主：从 Java 到插件落位，每一步都可以照抄。

## 1. 安装 Java 21

Phoenix 要求 **Java 21 及以上**（Paper/Leaf 1.21.11 的硬性要求）。

**检查是否已安装：**

打开命令提示符（Windows 按 `Win+R` 输入 `cmd`），执行：

```
java -version
```

- 输出包含 `21` 或更高（如 `openjdk version "21.0.2"`）→ 已满足；
- 提示「不是内部或外部命令」或版本低于 21 → 需要安装。

**安装：**

1. 下载 [Adoptium Temurin 21（Windows x64 JRE/MSI）](https://adoptium.net/temurin/releases/?version=21)；
2. 双击 MSI 安装，安装时勾选 **「Set JAVA_HOME variable」** 和 **「Add to PATH」**；
3. 重新打开 cmd，再执行 `java -version` 确认。

## 2. 准备服务端

Phoenix 只支持 **Paper 或 Leaf 1.21.11**（不支持 Spigot / Folia / 更低版本）。

1. 新建一个空文件夹（如 `D:\MCServer`）；
2. 下载 [Paper 1.21.11](https://papermc.io/downloads/all) 或 [Leaf](https://www.leafmc.one/) 的 jar，放进文件夹；
3. 同文件夹新建 `start.bat`（Windows），内容：

```bat
@echo off
java -Xmx4G -Xms4G --enable-preview -jar paper-1.21.11.jar nogui
pause
```

> `-Xmx4G` 表示最多用 4G 内存，按服务器实际内存调整。Leaf 的启动参数以它的官方文档为准。

4. 双击 `start.bat` 首次启动：会生成 `eula.txt`，打开它把 `eula=false` 改成 `eula=true`（表示接受 Minecraft EULA），保存后再次启动；
5. 看到控制台出现 `Done (x.xxxs)! For help, type "help"` 即启动成功。

## 3. 安装 Phoenix

1. 把 `Phoenix-x.y.z.jar` 放进服务器的 `plugins/` 文件夹；
2. 重启服务器（关闭控制台窗口再运行 `start.bat`，或在控制台输入 `restart`）；
3. 首次启动会生成所有模块配置目录，控制台没有红色报错即安装成功。

**升级**：关闭服务器 → 删除旧 `Phoenix-x.y.z.jar` → 放入新 jar → 启动。配置目录和数据不会丢失，直接沿用。

**回滚**：把旧版本 jar 放回 `plugins/`（删掉新 jar）再启动即可。数据库结构向后兼容，无需手动处理。

## 4. 安装可选依赖

Phoenix 本体**不依赖任何其他插件即可启动**，缺什么只是对应功能不可用。按需安装：

| 依赖 | 提供什么 | 没有会怎样 |
|---|---|---|
| [Vault](https://www.spigotmc.org/resources/vault.34315/) + 任意经济插件 | 金币类：邀请奖励、礼包购买、交易金币 | 邀请金币奖励跳过；交易界面不显示金币按钮 |
| [PlayerPoints](https://www.spigotmc.org/resources/playerpoints.38189/) | 点券：邀请点券奖励、充值返点 | 点券相关功能不可用（可改 CUSTOM 命令模式） |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | `%phoenixinvite_*%` 等变量给计分板/全息使用 | 变量不解析，功能不受影响 |
| [PacketEvents](https://www.spigotmc.org/resources/packetevents-api.80456/) | 消息转发、无缝世界切换、NI 描述切换 | 这三个小功能不加载 |
| [LuckPerms](https://www.spigotmc.org/resources/luckperms.28140/) | 权限管理（老玩家判定、返点比例组） | 只能用 OP / 默认权限 |

安装方式与 Phoenix 相同：jar 丢进 `plugins/` 重启。

**验证经济插件已接通**：启动日志搜索 `Vault`，Phoenix 启动段会输出经济连接状态；交易界面里能看到金币按钮即代表接通。

## 5. 给管理员授权

给助手/管理员单独授权（以 LuckPerms 为例，在控制台执行）：

```
lp user 玩家名 permission set phoenix.reload true
lp user 玩家名 permission set phoenixinvite.admin true
lp user 玩家名 permission set phoenixtrade.trade true
```

不确定需要什么权限时，直接给 `phoenix.reload` 加上对应模块页里列出的节点即可（见[权限汇总](./permissions)）。

## 6. 首次上线验收清单

装完后按顺序确认：

1. [ ] 控制台无 `启用 PhoenixXxx 失败` 字样；
2. [ ] `plugins/` 下生成了全部 `Phoenix*` 目录，且里面的配置文件不是 0KB；
3. [ ] 自己（OP）执行 `/phoenixinvite` 能打开主菜单；
4. [ ] `/phoenixtrade` 显示帮助；
5. [ ] `/phoenix lang` 显示当前语言；
6. [ ] （装了 Vault）交易界面出现金币按钮；
7. [ ] 用两个账号实际走一遍：发邀请码 → 绑定 → 里程碑领取；发起交易 → 放物品 → 双确认 → 成交。

---
sidebar_position: 17
---

# 故障排查

遇到问题时按「先看日志 → 再对症状 → 最后重启」的顺序处理。

## 第一步：看启动日志

用文本编辑器打开 `logs/latest.log`（或控制台回滚），搜索以下关键字：

| 搜索关键字 | 含义 |
|---|---|
| `启用 PhoenixXxx 失败` | 对应模块启动异常，后面跟着异常类名与堆栈 |
| `释放默认文件失败` | jar 内资源缺失或磁盘权限问题 |
| `读取 data.yml 失败` / `保存 ... 失败` | 磁盘/权限问题 |
| `Vault 扣款失败` / `Vault 入账失败` | 经济插件拒绝交易，看后面的「原因」 |
| `Invalid YAML` / `while parsing` | 配置文件格式错误（多半是 Tab 或冒号后没空格） |

## 常见症状 → 解决

### 配置改了不生效

- 模块配置要用**模块自己的 reload**（见[配置基础](./configuration)）；
- `modules` 开关和 `database` 只能重启；
- 确认改的目录对：每个模块的配置在 `plugins/PhoenixXxx/`，不在 `plugins/Phoenix/`。

### 配置文件变成 0KB

旧版本残留的坏文件。**重启服务器**会自动检测 0 字节文件并补写默认内容。

### 菜单打不开 / 显示「菜单配置不存在」

1. 确认 `plugins/PhoenixInvite/menus.yml` 存在且非 0KB；
2. 删除该文件重启（自动重新生成默认菜单）；
3. 看控制台是否报「菜单构建失败」，后面跟异常原因。

### 交易界面没有金币按钮

1. 确认安装了 Vault 和一个经济插件（如 EssentialsX）；
2. 启动日志搜 `Vault`，确认经济服务已注册；
3. 确认 `Trade.Economy.Enable: true`；
4. 仍不行：`/phoenixtrade reload` 后重开界面。

### 交易金币结算失败提示

控制台会有 `Vault 扣款失败` 或 `Vault 入账失败` 及经济插件给出的原因。常见于：经济插件拒绝了本次操作（如上限、黑名单账户）。物品会自动全额返还，属于安全设计。

### 兑换码提示无效

确认用的是 `/phoenixcdk redeem 码`（码区分大小写）；重载礼包后码会重新加载；查码是否已被用掉（一次性码一人一次）。

### 邀请奖励没发

1. 金币奖励：确认 Vault + 经济插件在（见上文）；
2. 点券奖励：确认 `economy.points_type` 与实际安装的点券插件匹配；
3. command 奖励：看控制台 Kether 报错（常见是引号嵌套错误，见 [Kether 入门](./kether)）。

### 自动老玩家不生效

1. `auto_veteran.enabled: true` 了吗？
2. `playtime_placeholder` 的变量在你服务器能解析吗？用 PlaceholderAPI 的 `/papi parse me %statistic_hours_played%` 测试；
3. 检查间隔（`check_interval`）默认 300 秒，刚改完要等一轮。

### 数据库报错

- SQLite：确认 `plugins/Phoenix/` 目录可写、磁盘有空间；
- MySQL：看连接错误（拒绝连接=地址/端口错，Access denied=账号密码错，Unknown database=库没建）；
- 改完 database 配置必须重启。

### 无缝切换 / 消息转发不工作

这两个模块依赖 PacketEvents：确认 PacketEvents 已安装且启动日志无 `PacketEvents 未就绪`。

## 仍然解决不了？

1. 打包以下内容提问：`logs/latest.log` 中与 Phoenix 相关的段落 + 你的配置文件 + 操作步骤；
2. 到 [GitHub Issues](https://github.com/Natsume-999/Phoenix-Wiki/issues) 反馈。

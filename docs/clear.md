---
sidebar_position: 9
---

# PhoenixClear 周期清理与虚空回收

周期清理掉落物与游荡实体，附带**虚空垃圾桶**（玩家自助找回被清理物品）、恢复系统、性能诊断（源自 CyuClear）。

## 命令

**入口：`/phoenixclear`**

| 命令 | 说明 | 权限 |
|---|---|---|
| `/phoenixclear bin` | 打开虚空垃圾桶 | `cyuclear.use` |
| `/phoenixclear items` | 手动清理全服掉落物 | `cyuclear.admin` |
| `/phoenixclear entities` | 手动清理全服游荡实体 | `cyuclear.admin` |
| `/phoenixclear all` | 手动全量大扫除 | `cyuclear.admin` |
| `/phoenixclear check` | 查看准星目标的判定过程 | `cyuclear.admin` |
| `/phoenixclear preview` | 预演本次清理（不删除） | `cyuclear.admin` |
| `/phoenixclear status` | 性能参数、名单规模与 Hook 状态 | `cyuclear.admin` |
| `/phoenixclear menu` | 打开管理中心 | `cyuclear.admin` |
| `/phoenixclear runs [页]` | 历史清理批次 | `cyuclear.admin` |
| `/phoenixclear run <批次> [details\|reasons]` | 批次详情 | `cyuclear.admin` |
| `/phoenixclear recover <批次>` | 恢复指定批次物品 | `cyuclear.admin` |
| `/phoenixclear hotspots [页]` | 热点区块 | `cyuclear.admin` |
| `/phoenixclear here [items\|entities\|all]` | 只清理自己脚下这一个区块 | `cyuclear.admin` |
| `/phoenixclear tp <世界> <x> [y] <z>` | 安全传送到坐标（也可写区块坐标） | `cyuclear.admin` |
| `/phoenixclear back` | 回到上次传送前的位置 | `cyuclear.admin` |
| `/phoenixclear cancel` | 停止当前清理 | `cyuclear.admin` |
| `/phoenixclear doctor` | 配置自检 | `cyuclear.admin` |
| `/phoenixclear snapshot` | 备份当前配置 | `cyuclear.admin` |
| `/phoenixclear history <玩家> [页]` | 虚空桶领取记录 | `cyuclear.admin` |
| `/phoenixclear reload` | 重载配置 | `phoenix.reload` |

## 快速上手

1. 打开 `plugins/PhoenixClear/config.yml`，把 `enabled` 改为 `true`（**默认是关闭的**）；
2. 按需调整 `rules/` 里的清理规则（哪些物品/实体、多大范围、多久一次）；
3. `/phoenixclear reload` 生效；
4. 用 `/phoenixclear preview` 先预演一次，确认没有误删风险再开周期。

## 虚空垃圾桶

被周期清理的物品（可配置）会进入虚空桶，玩家在时限内用 `/phoenixclear bin` 自助取回——既减负又减少纠纷。桶的开启时段、容量、堆叠模式在 `void-bin/` 与 config 中配置。

## 处理卡服现场（热点区块）

服务器某处堆了几千个掉落物或刷怪塔炸了，不必全服大扫除，可以只处理那一块：

1. `/phoenixclear hotspots` 看哪些区块被判定为热点（触发次数、已清数量、是否处于熔断拦截）；
2. 点开某个热点的详情，按**「前往该区块」**（末影珍珠图标）直接安全传送过去；
3. 到现场后 `/phoenixclear here` 只清理脚下这一个区块，想只清掉落物就 `here items`，只清实体就 `here entities`；
4. 处理完 `/phoenixclear back` 回到原来的位置。

区块过载的提示消息里，管理员会额外看到一个**「前往查看」**按钮，点一下直接传送到出事的坐标。

### 传送为什么是"安全"的

传送前会先找一个能站住的位置：脚下是实心方块、头顶两格是空的，并且避开岩浆、火、仙人掌、岩浆块。下界会从 120 格往下逐格找（避免直接落在岩浆湖或顶层基岩上）。落地后默认有 5 秒免伤保护，防止刚传送过去就被摔死或被怪打死。

相关配置在 `config.yml`：

```yaml
teleport:
  landing-protection:
    enabled: true          # 落地免伤保护
    duration-seconds: 5    # 保护几秒
    notify: true           # 抵消伤害时是否提示
  back:
    enabled: true          # 是否允许 /phoenixclear back
    timeout-seconds: 300   # 原点记忆多久过期（0 = 直到玩家下线）

here-cleanup:
  enabled: true            # 是否允许 /phoenixclear here
```

:::note 老服务器看不到这两节配置
这两节是新增的，而配置版本号没变，所以**已有的 config.yml 不会自动补上这些行**。不改也能用（走上面写的默认值）；想调整就照上面手动加到 `config.yml` 里，或者删掉 config.yml 让它重新生成（会丢自定义内容，记得先备份）。
:::

## 配置目录

```
plugins/PhoenixClear/
├── config.yml      总开关 / 性能参数 / 审计
├── rules/          清理规则
├── areas/          区域规则
├── storage/        存储配置
├── void-bin/       虚空桶配置
└── sounds/         提示音效
```

:::tip doctor 自检
配置写完先跑 `/phoenixclear doctor`，它会列出配置错误与缺失文件，避免上线后才发现规则没加载。
:::

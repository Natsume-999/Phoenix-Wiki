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

---
sidebar_position: 18
---

# 常見問題

## 通用

**Q：改了配置不生效？**
模組配置用**自己命令**的 reload（如 `/phoenixban reload`、`/phoenixinvite admin reload`）；`modules` 節的模組開關只能重啟生效。

**Q：某個模組目錄下的配置檔案是 0KB？**
舊版本殘留的壞檔案。Phoenix 在啟動時會自動檢測 0 位元組檔案並補寫預設內容，重啟即可。

**Q：想換 MySQL？**
改 `plugins/Phoenix/config.yml` 的 `database.type` 為 `mysql` 並填好連線資訊，重啟。資料自動走新庫（不會自動遷移舊 sqlite 資料，需要手動導）。

## PhoenixInvite

**Q：玩家怎麼變成「老玩家」？**
給他 `phoenixinvite.veteran` 許可權（或 config 裡 `veteran_permission` 指向的節點）；或開啟 `auto_veteran` 按線上時長自動授予。

**Q：金幣獎勵沒到賬？**
金幣走 Vault——確認裝了 Vault 與經濟外掛，看啟動日誌裡 PhoenixInvite 的經濟狀態行。

**Q：返點沒觸發？**
檢查三件事：金額 ≥ `limits.min_amount`；必須用 `/phoenixinvite givedj` 觸發（不是直接用 points 外掛充值）；`anti_duplicate` 會攔截同一「玩家+金額」的重複結算。

**Q：怎麼把返點比例做成 VIP 特權？**
在 `rebate_rates` 里加組（如 `vip: {rate: 0.15, weight: 2}`），然後給玩家 `phoenixinvite.rebate.vip` 許可權。weight 大者優先。

**Q：貢獻返點是什麼？**
`contribution_mode: true` 的返點組不直接發點券，只累計到玩家貢獻值；管理員用 `/phoenixinvite admin contrib h <玩家> <金額>` 手動兌換成點券。適合需要人工稽核的分成模式。

**Q：選單裡獎勵描述只顯示了幾行？**
獎勵描述透過 `{reward_lore}`（整段展開）或 `{reward_lore_0}`、`{reward_lore_1}`…（逐行）佔位符渲染；只顯示前 N 行說明佈局裡只放了 N 個佔位行，按需增刪 menus.yml 裡的佔位行即可。

## PhoenixTrade

**Q：金幣按鈕不見了？**
未安裝 Vault、經濟外掛未註冊、或 `Trade.Economy.Enable: false`。物品交易不受影響。

**Q：想防止用交易轉移繫結物品？**
開啟 `Item-BlackList`，把繫結類物品的描述關鍵字（如「繫結」）加進 `Lore` 規則。

**Q：交易過程中玩家跑圖/被打死怎麼辦？**
開啟 `Safe.Damage`（交易中免傷）與 `Safe.Move`（交易中禁足）。

**Q：倒計時最後 1 秒對方把物品抽走了？**
不會。倒計時期間非確認區點選全部攔截；成交時物品按確認瞬間的介面內容交換，倒計時中的任何修改都會重置確認狀態。

## 其他

**Q：出售介面沒生成 / 顯示 0 規則？**
刪除 `plugins/PhoenixSell/` 重啟（會重新釋放示例），或直接 `/phoenixsell open`（檢測到無介面時自動釋放預設示例並過載）。注意規則檔案必須放 `sell/` 目錄。

**Q：Kether 指令碼怎麼寫？**
所有「執行類」配置都是 Kether 指令碼行，執行前先做 `{變數}` 文字替換。執行原版命令用 `command "say hi"`（預設控制檯身份）；需要環境變數時直接寫在指令碼里，Phoenix 已註冊自己的名稱空間。

**Q：怎麼備份資料？**
SQLite：複製 `plugins/Phoenix/phoenix.db` 一個檔案即可（封禁/兌換碼/邀請都在裡面，分表隔離）。MySQL：用資料庫工具備份 `phoenix_*` 開頭的表。

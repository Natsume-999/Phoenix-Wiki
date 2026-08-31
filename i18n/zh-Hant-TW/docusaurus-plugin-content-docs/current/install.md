---
sidebar_position: 3
---

# 環境準備與安裝

本頁面向**第一次搭伺服器**的服主：從 Java 到外掛落位，每一步都可以照抄。

## 1. 安裝 Java 21

Phoenix 要求 **Java 21 及以上**（Paper/Leaf 1.21.11 的硬性要求）。

**檢查是否已安裝：**

開啟命令提示符（Windows 按 `Win+R` 輸入 `cmd`），執行：

```
java -version
```

- 輸出包含 `21` 或更高（如 `openjdk version "21.0.2"`）→ 已滿足；
- 提示「不是內部或外部命令」或版本低於 21 → 需要安裝。

**安裝：**

1. 下載 [Adoptium Temurin 21（Windows x64 JRE/MSI）](https://adoptium.net/temurin/releases/?version=21)；
2. 雙擊 MSI 安裝，安裝時勾選 **「Set JAVA_HOME variable」** 和 **「Add to PATH」**；
3. 重新開啟 cmd，再執行 `java -version` 確認。

## 2. 準備服務端

Phoenix 只支援 **Paper 或 Leaf 1.21.11**（不支援 Spigot / Folia / 更低版本）。

1. 新建一個空資料夾（如 `D:\MCServer`）；
2. 下載 [Paper 1.21.11](https://papermc.io/downloads/all) 或 [Leaf](https://www.leafmc.one/) 的 jar，放進資料夾；
3. 同資料夾新建 `start.bat`（Windows），內容：

```bat
@echo off
java -Xmx4G -Xms4G --enable-preview -jar paper-1.21.11.jar nogui
pause
```

> `-Xmx4G` 表示最多用 4G 記憶體，按伺服器實際記憶體調整。Leaf 的啟動引數以它的官方文件為準。

4. 雙擊 `start.bat` 首次啟動：會生成 `eula.txt`，開啟它把 `eula=false` 改成 `eula=true`（表示接受 Minecraft EULA），儲存後再次啟動；
5. 看到控制檯出現 `Done (x.xxxs)! For help, type "help"` 即啟動成功。

## 3. 安裝 Phoenix

1. 把 `Phoenix-x.y.z.jar` 放進伺服器的 `plugins/` 資料夾；
2. 重啟伺服器（關閉控制檯視窗再執行 `start.bat`，或在控制檯輸入 `restart`）；
3. 首次啟動會生成所有模組配置目錄，控制檯沒有紅色報錯即安裝成功。

**升級**：關閉伺服器 → 刪除舊 `Phoenix-x.y.z.jar` → 放入新 jar → 啟動。配置目錄和資料不會丟失，直接沿用。

**回滾**：把舊版本 jar 放回 `plugins/`（刪掉新 jar）再啟動即可。資料庫結構向後相容，無需手動處理。

## 4. 安裝可選依賴

Phoenix 本體**不依賴任何其他外掛即可啟動**，缺什麼只是對應功能不可用。按需安裝：

| 依賴 | 提供什麼 | 沒有會怎樣 |
|---|---|---|
| [Vault](https://www.spigotmc.org/resources/vault.34315/) + 任意經濟外掛 | 金幣類：邀請獎勵、禮包購買、交易金幣 | 邀請金幣獎勵跳過；交易介面不顯示金幣按鈕 |
| [PlayerPoints](https://www.spigotmc.org/resources/playerpoints.38189/) | 點券：邀請點券獎勵、充值返點 | 點券相關功能不可用（可改 CUSTOM 命令模式） |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | `%phoenixinvite_*%` 等變數給計分板/全息使用 | 變數不解析，功能不受影響 |
| [PacketEvents](https://www.spigotmc.org/resources/packetevents-api.80456/) | 訊息轉發、無縫世界切換、NI 描述切換 | 這三個小功能不載入 |
| [LuckPerms](https://www.spigotmc.org/resources/luckperms.28140/) | 許可權管理（老玩家判定、返點比例組） | 只能用 OP / 預設許可權 |

安裝方式與 Phoenix 相同：jar 丟進 `plugins/` 重啟。

**驗證經濟外掛已接通**：啟動日誌搜尋 `Vault`，Phoenix 啟動段會輸出經濟連線狀態；交易介面裡能看到金幣按鈕即代表接通。

## 5. 給管理員授權

給助手/管理員單獨授權（以 LuckPerms 為例，在控制檯執行）：

```
lp user 玩家名 permission set phoenix.reload true
lp user 玩家名 permission set phoenixinvite.admin true
lp user 玩家名 permission set phoenixtrade.trade true
```

不確定需要什麼許可權時，直接給 `phoenix.reload` 加上對應模組頁裡列出的節點即可（見[許可權彙總](./permissions)）。

## 6. 首次上線驗收清單

裝完後按順序確認：

1. [ ] 控制檯無 `啟用 PhoenixXxx 失敗` 字樣；
2. [ ] `plugins/` 下生成了全部 `Phoenix*` 目錄，且裡面的配置檔案不是 0KB；
3. [ ] 自己（OP）執行 `/phoenixinvite` 能開啟主選單；
4. [ ] `/phoenixtrade` 顯示幫助；
5. [ ] `/phoenix lang` 顯示當前語言；
6. [ ] （裝了 Vault）交易介面出現金幣按鈕；
7. [ ] 用兩個賬號實際走一遍：發邀請碼 → 繫結 → 里程碑領取；發起交易 → 放物品 → 雙確認 → 成交。

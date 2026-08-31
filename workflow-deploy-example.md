# GitHub Pages 自动部署工作流（示例）

当前仓库因推送令牌缺少 `workflow` 权限，无法直接提交 `.github/workflows/build.yml`。
站点目前由 gh-pages 分支手动部署（本地 `npm run build` 后推送 build 产物）。

当你刷新令牌权限后（`gh auth refresh -s workflow`），把本文件内容复制到
`.github/workflows/build.yml` 即可恢复「push 到 main 自动构建部署」：

```yaml
name: Workflow Build
on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  gitpage:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install and Build
        run: npm install && npm run build

      - name: Deploy to gh-pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          branch: gh-pages
          folder: build
```

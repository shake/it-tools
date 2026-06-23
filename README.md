![IT Tools 首页效果](./.github/screenshots/homepage-effect.png)

<picture>
    <source srcset="./.github/logo-dark.png" media="(prefers-color-scheme: light)">
    <source srcset="./.github/logo-white.png" media="(prefers-color-scheme: dark)">
    <img src="./.github/logo-dark.png" alt="logo">
</picture>

<p align="center">
面向开发者和 IT 工作者的实用工具集合。<a href="https://it-tools.tech">在线体验</a>
</p>

## 当前架构

这个 fork 现在的部署架构是：

- Cloudflare Pages 负责静态站点托管
- Cloudflare Access 负责登录控制
- Cloudflare D1 负责收藏持久化
- Codex + Cloudflare 插件负责自动化部署和配置

## 本次调整

这次主要做了这些调整：

- 首页改造成路由驱动的分类目录页
- 顶部支持 `全部`、`常用` 和各个分类切换
- `常用` 直接对应收藏工具
- 收藏改成 D1 持久化，同步到不同浏览器和设备
- README 收敛成 Cloudflare 部署说明

## Cloudflare 部署

这个 fork 已经整理成适合 Cloudflare 的部署方式。

### 最短部署步骤

1. 准备一个 Cloudflare 账号
2. 准备一个用于登录的邮箱
3. Codex 启用 Cloudflare 插件
4. 把 repo 链接发给 Codex，让 Codex 代你完成 Pages、Access 和 D1 的配置
5. 部署完成后，用你的邮箱登录即可

![IT Tools 首页效果](./.github/screenshots/homepage-effect.png)

<picture>
    <source srcset="./.github/logo-dark.png" media="(prefers-color-scheme: light)">
    <source srcset="./.github/logo-white.png" media="(prefers-color-scheme: dark)">
    <img src="./.github/logo-dark.png" alt="logo">
</picture>

<p align="center">
面向开发者和 IT 工作者的实用工具集合。<a href="https://it-tools.tech">在线体验</a>
</p>

## Cloudflare 部署

这个 fork 已经整理成适合 Cloudflare 的部署方式。

### 最短部署步骤

1. 准备一个 Cloudflare 账号
2. 准备一个用于登录的邮箱
3. 把这个 repo 链接给 Codex，并启用 Cloudflare 插件
4. 让 Codex 代你完成 Pages、Access 和 D1 的配置
5. 部署完成后，用你的邮箱登录即可

### 手工部署时

如果你想自己手工部署，也可以继续用 Cloudflare Pages + Access + D1：

- `/api/me` 会返回 `401`
- `/api/favorites` 会返回 `401`
- 收藏只能保存在本地浏览器，不能跨浏览器同步

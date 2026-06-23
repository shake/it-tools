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

这个 fork 已经整理成适合 Cloudflare 的部署方式：

- Cloudflare Pages 负责静态站点托管
- Cloudflare Access 负责登录控制
- Cloudflare D1 负责收藏持久化

### 快速开始

1. 在 Cloudflare Pages 创建项目
2. 构建目录选择 `dist`
3. 绑定 D1 数据库 `it-tools-favorites`
4. 如需访问控制，在 Zero Trust 里创建 Access self-hosted app
5. 在 Access 中添加允许访问的邮箱或邮箱组
6. 使用自定义域名，或直接使用 `*.pages.dev`

### 不启用 Access 时

不启用 Access 也可以正常部署和访问，只是会少掉这些能力：

- `/api/me` 会返回 `401`
- `/api/favorites` 会返回 `401`
- 收藏只能保存在本地浏览器
- 更换浏览器或设备后，收藏不会同步

如果你的需求只是公开展示页面，或者暂时不需要跨设备收藏同步，这种方式也可以直接使用。

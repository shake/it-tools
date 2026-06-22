<picture>
    <source srcset="./.github/logo-dark.png" media="(prefers-color-scheme: light)">
    <source srcset="./.github/logo-white.png" media="(prefers-color-scheme: dark)">
    <img src="./.github/logo-dark.png" alt="logo">
</picture>

<p align="center">
面向开发者和 IT 工作者的实用工具集合。<a href="https://it-tools.tech">在线体验</a>
</p>

## 简介

IT-Tools 是一个基于 Vue 3 构建的在线工具集合，适合开发、排查、转换、格式化等日常场景。

本仓库当前版本已经做了这些改动：

- 首页改造成路由驱动的分类目录页
- 顶部分类切换支持：
  - `全部`
  - `常用`
  - 各个工具分类
- `常用` 直接对应收藏工具
- 收藏数据改为 Cloudflare D1 持久化
- 登录与访问控制改为 Cloudflare Access
- 支持部署到 Cloudflare Pages

## 页面效果

下面是当前首页的实际效果截图，方便快速了解现在的布局和视觉风格：

![IT Tools 首页效果](./.github/screenshots/homepage-effect.png)

## 线上部署

当前推荐的部署方式是：

- Cloudflare Pages 负责静态站点托管
- Cloudflare Access 负责登录控制
- Cloudflare D1 负责收藏持久化

生产环境通常会包含以下内容：

- `/`：全部工具页
- `/favorites`：常用 / 收藏页
- `/category/:slug`：单个分类页
- `/api/me`：当前登录身份
- `/api/favorites`：收藏读取与保存

## 目录页说明

首页顶部的分类 tabs 作用如下：

- `全部`
  - 保留原有首页结构
  - 显示介绍内容、最新工具、全部工具
- `常用`
  - 直接显示收藏工具
  - 收藏顺序可拖拽调整
- 其它分类
  - 只显示对应分类下的工具
  - 页面可直接分享和刷新

## 收藏功能

收藏功能已经从纯本地存储改成远端同步：

- 登录后收藏会写入 D1
- 换浏览器、换设备后仍然保留
- 收藏顺序也会一起保存
- 未登录或未启用 Access 时，会自动降级到本地缓存

## 如果不启用 Zero Trust，会有什么影响

可以正常部署和访问，但会有这些变化：

- 页面本身仍然能打开
- 工具列表、分类页、搜索等功能照常可用
- 访问 `/api/me` 会返回 `401`
- 访问 `/api/favorites` 会返回 `401`
- 收藏无法同步到云端，只会保存在本地浏览器
- 换浏览器或换设备后，收藏会丢失
- 退出登录入口是 Access 提供的，没有 Access 时基本没有意义

也就是说：

- **不启用 Zero Trust，不影响站点部署和使用**
- **主要影响是登录控制和跨浏览器收藏同步**

如果你的需求只是公开展示，或者不在意收藏跨设备同步，这样也能用。

## 本地开发

### 安装依赖

```sh
pnpm install
```

### 本地启动

```sh
pnpm dev
```

### 构建生产版本

```sh
pnpm build
```

### 运行单元测试

```sh
pnpm test
```

### 代码检查

```sh
pnpm lint
```

## Cloudflare 部署建议

如果你准备把这个项目部署到自己的 Cloudflare 账号，建议按这个顺序做：

1. 创建 Cloudflare Pages 项目
2. 将构建输出目录设为 `dist`
3. 在 Pages 项目里绑定 D1 数据库
4. 给自定义域名加上 DNS 解析
5. 按需开启 Cloudflare Access
6. 在 Access 中配置允许访问的邮箱或邮箱组

### 推荐配置

- Pages 项目名：`it-tools`
- D1 数据库名：`it-tools-favorites`
- 生产分支：`main`
- 访问域名：自定义域名或 `*.pages.dev`

### Access 说明

如果你想限制谁能用这个站点，最简单的做法就是：

- 在 Zero Trust 里创建 self-hosted app
- 把站点域名加进去
- 配置允许访问的邮箱，或者允许的 IdP 组

如果你只想让站点公开，不做登录限制，也可以不启用 Access。

## 创建新工具

如果要新增一个工具，可以运行：

```sh
pnpm run script:create:tool my-tool-name
```

脚本会在 `src/tools` 下生成基础文件，并自动把它挂到工具注册中。然后你只需要把它放到对应分类里，再完善具体实现。

## 贡献

### 推荐编辑器设置

建议使用 [VSCode](https://code.visualstudio.com/) 并安装这些扩展：

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally)

推荐设置：

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "i18n-ally.localesPaths": ["locales", "src/tools/*/locales"],
  "i18n-ally.keystyle": "nested"
}
```

### 项目开发

```sh
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm lint
```

## 致谢

感谢所有贡献者。

[![contributors](https://contrib.rocks/image?repo=corentinth/it-tools&refresh=1)](https://github.com/corentinth/it-tools/graphs/contributors)

## 许可证

本项目采用 [GNU GPLv3](LICENSE) 许可证。

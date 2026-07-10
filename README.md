# Atlas Nav

一个轻量、可搜索、可分类的个人网站导航。基于 Next.js 和 TypeScript，适合直接部署到 Vercel。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## 修改收藏

所有网站都集中在 `data/sites.ts`。复制任意一项并修改：

```ts
{
  id: "example",
  name: "Example",
  url: "https://example.com",
  description: "一句简短介绍。",
  category: "design",
  tags: ["标签一", "标签二"],
  accent: "#DDE8D5",
  mark: "E"
}
```

支持的分类也定义在同一文件顶部。分类、搜索结果和统计数字会自动更新。

## 部署到 Vercel

1. 登录 Vercel，选择 **Add New → Project**。
2. 导入这个 GitHub 仓库。
3. Vercel 会自动识别 Next.js，保持默认配置并点击 **Deploy**。

无需环境变量。每次推送到 `main` 后会自动重新部署。

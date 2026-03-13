# AI PPT 智能生成器 - 部署指南

## 🚀 快速部署到 Vercel

### 方式一：通过 Vercel CLI（推荐）

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```
   按照提示完成登录（需要 GitHub 账号）

3. **部署项目**
   ```bash
   cd c:\Users\南笙\Desktop\6666777
   vercel
   ```
   按照提示操作：
   - 选择项目设置
   - 确认构建命令（默认为 `npm run build`）
   - 等待部署完成

4. **获取访问地址**
   部署完成后，Vercel 会提供一个访问地址，格式为：
   ```
   https://your-project-name.vercel.app
   ```

### 方式二：通过 Vercel Dashboard

1. **访问 Vercel Dashboard**
   - 打开浏览器访问：https://vercel.com/dashboard
   - 登录您的 GitHub 账号

2. **导入项目**
   - 点击 "Add New Project"
   - 选择 "Import Git Repository"
   - 选择您的 GitHub 仓库
   - 点击 "Import"

3. **配置项目**
   - Framework Preset: Next.js
   - Root Directory: `./`（保持默认）
   - Build Command: `npm run build`（保持默认）
   - Output Directory: `.next`（保持默认）
   - 点击 "Deploy"

4. **等待部署完成**
   - Vercel 会自动构建和部署
   - 完成后会提供访问地址

## 📋 部署前检查清单

- [x] 项目已构建成功（`npm run build` 无错误）
- [x] 已创建 `vercel.json` 配置文件
- [x] 已更新 `.gitignore` 文件
- [x] 代码已提交到 Git 仓库（如使用方式二）
- [x] 已安装 Vercel CLI（如使用方式一）

## 🔧 常见问题解决

### 构建错误
如果遇到构建错误：
```bash
# 清理缓存并重新构建
rm -rf .next node_modules
npm install
npm run build
```

### 端口冲突
如果本地开发服务器占用端口：
```bash
# 停止开发服务器
# 然后重新启动
npm run dev
```

### 环境变量
如果需要添加环境变量：
1. 在 Vercel Dashboard 中进入项目设置
2. 找到 "Environment Variables"
3. 添加需要的环境变量

## 📊 部署后管理

### 查看部署日志
- 访问 Vercel Dashboard
- 进入项目页面
- 查看 "Deployments" 标签
- 可以查看每次部署的日志和状态

### 自定义域名
1. 在 Vercel Dashboard 中进入项目设置
2. 找到 "Domains"
3. 添加您的自定义域名
4. 按照提示配置 DNS

### 更新部署
修改代码后：
```bash
# 提交到 Git
git add .
git commit -m "更新内容"
git push

# Vercel 会自动检测到推送并重新部署
```

## 🎯 性能优化建议

1. **图片优化**
   - 使用 WebP 格式
   - 压缩图片大小
   - 使用 CDN 加速

2. **代码分割**
   - Next.js 已自动进行代码分割
   - 利用动态导入减少初始加载体积

3. **缓存策略**
   - Vercel 自动提供 CDN 缓存
   - 利用浏览器缓存优化加载速度

4. **SEO 优化**
   - 已配置合适的 meta 标签
   - 使用语义化 HTML 结构

## 🔒 安全建议

1. **环境变量**
   - 不要在代码中硬编码敏感信息
   - 使用 Vercel 的环境变量功能

2. **依赖更新**
   - 定期更新依赖包
   - 使用 `npm audit` 检查安全漏洞

3. **HTTPS**
   - Vercel 自动提供免费 SSL 证书
   - 所有流量都通过 HTTPS 加密

## 📈 监控和分析

Vercel 提供：
- 实时日志
- 性能监控
- 错误追踪
- 访问分析

访问 Dashboard 查看详细数据。

## 🎉 完成！

部署完成后，您就可以通过以下方式访问您的网站：
- Vercel 提供的域名
- 自定义的域名（如果配置）

祝您部署顺利！🚀

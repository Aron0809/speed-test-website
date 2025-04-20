#!/bin/bash

# 构建项目
npm run build

# 使用Wrangler部署到Cloudflare Pages
npx wrangler pages deploy dist 
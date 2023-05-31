# uni-parse-pages

#### 介绍
读取 uni-app 项目 pages.json 中的配置，转换为 uni-mini-router 的路由表结构

## 安装

##### Yarn

```sh
yarn add uni-parse-pages -D
```
##### npm

```sh
npm install uni-parse-pages --save
```
## 使用
读取`pages.json`文件生成`uni-mini-router`的路由表。在`router`配置文件中增加已下配置：

```ts
// router.ts

// 导入pages.json
import pagesJson from '../pages.json'
// 引入uni-parse-pages
import pagesJsonToRoutes from 'uni-parse-pages'
// 生成路由表
const routes = pagesJsonToRoutes(pagesJson)
```
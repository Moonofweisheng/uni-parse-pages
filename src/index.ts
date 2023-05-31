import { Config } from './interfaces/index'

// 默认配置
const CONFIG: Config = {
  includes: ['meta', 'path', 'aliasPath', 'name']
}

/**
 *
 * @param pagesJson pages.json
 * @param config 配置
 * @returns
 */
export default function pagesJsonToRoutes(pagesJson: any, config?: Config) {
  if (config && config.includes) {
    CONFIG.includes = Array.from(new Set([...CONFIG.includes, ...config.includes]))
  }
  return getPagesRoutes(pagesJson.pages).concat(getNotMpRoutes(pagesJson.subPackages))
}

/**
 * 通过读取pages.json文件 生成直接可用的routes
 */
function getPagesRoutes(pages: any[], rootPath: string | null = null) {
  const routes = []
  for (let i = 0; i < pages.length; i++) {
    const item = pages[i]
    const route: Record<string, any> = {}
    for (let j = 0; j < CONFIG.includes.length; j++) {
      const key = CONFIG.includes[j]
      let value = item[key]
      if (key === 'path') {
        value = rootPath ? `/${rootPath}/${value}` : `/${value}`
      }
      if (key === 'aliasPath' && i == 0 && rootPath == null) {
        route[key] = route[key] || '/'
      } else if (value !== undefined) {
        route[key] = value
      }
    }
    routes.push(route)
  }
  return routes
}

/**
 * 解析小程序分包路径
 */
function getNotMpRoutes(subPackages: any[]) {
  let routes: any[] = [],
    subPages,
    root,
    subRoutes
  if (subPackages == null || subPackages.length == 0) {
    return []
  }
  subPackages.forEach((item: any) => {
    subPages = item.pages
    root = item.root
    subRoutes = getPagesRoutes(subPages, root)
    routes = routes.concat(subRoutes)
  })
  return routes
}

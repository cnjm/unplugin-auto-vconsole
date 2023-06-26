export interface Options {
  // 生产环境带有哪个参数字段时需要开启 默认为 enable_console
  field?: string;
  // 是否构建阶段 默认为false
  isBuild?: boolean;
  // 是否开启vconsole,有些时候开发环境不需要开启、需要自定判断
  enabled?: boolean;
  // 注入的入口文件 默认为：src/main.ts
  entry?: string | string[];
  // vconsole的配置 默认空
  config?: Object;
}

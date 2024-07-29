# unplugin-auto-vconsole

[![NPM version](https://img.shields.io/npm/v/unplugin-auto-vconsole?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-auto-vconsole)

当你希望使用 vconsole，并且希望在生产环境使用，并且还不希望正常用户看到，并且还不希望占用正常用户加载速度或者加载的 js 体积时，你可能用得上

1. 可以帮助你快捷的引入 vconsole 以方便进行移动端的调试

2. 当你需要线上环境调试时只需要添加固定参数，即可动态加载并开启 vconsole,eg：http://baidu.com?enable_console=1

3. 普通用户并不会开启，并且是动态引入，不会给普通用户增加额外的 js 文件体积（vconsole 会被单独打包、但用户默认不会加载）

支持以下配置：

```ts
{
  // 生产环境带有哪个参数字段时需要开启 默认为 enable_console
  field?: string;
  // 是否构建阶段 默认为false
  isBuild?: boolean;
  // 是否开启vconsole,有些时候开发环境不需要开启、需要自定判断 默认为 true
  enabled?: boolean;
  // 注入的入口文件 默认为：src/main.ts
  entry?: string | string[];
  // vconsole的配置 默认空
  config?: Object;
}

```

## Install

使用 npm / yarn / pnpm

```bash
npm i vconsole
npm i unplugin-auto-vconsole -D
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import unpluginVconsole from "unplugin-auto-vconsole/vite";

// 当需要更细致的决定是否需要启动vconsole时
function vconsoleEnabled() {
  if (isBuild) {
    return true;
  } else {
    return true;
  }
}

export default defineConfig({
  plugins: [
    unpluginVconsole({
      field: "enable_console",
      isBuild: command === "build",
      entry: resolve("src/main.ts"),
      enabled: vconsoleEnabled(),
      config: { theme: "dark" },
    }),
  ],
});
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import unpluginVconsole from "unplugin-auto-vconsole/rollup";

export default {
  plugins: [
    unpluginVconsole({
      isBuild: command === "build",
      entry: resolve("src/main.ts"),
    }),
  ],
};
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require("unplugin-auto-vconsole/webpack")({
      isBuild: command === "build",
      entry: resolve("src/main.js"),
    }),
  ],
};
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    [
      "unplugin-auto-vconsole/nuxt",
      {
        isBuild: command === "build",
        entry: resolve("src/main.js"),
      },
    ],
  ],
};
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require("unplugin-auto-vconsole/webpack")({
        isBuild: command === "build",
        entry: resolve("src/main.js"),
      }),
    ],
  },
};
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from "esbuild";
import unpluginVconsole from "unplugin-auto-vconsole/esbuild";

build({
  plugins: [
    unpluginVconsole({ isBuild: command === "build", entry: "src/main.js" }),
  ],
});
```

<br></details>

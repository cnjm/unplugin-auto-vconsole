import { resolve } from "path";
import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import unpluginVconsole from "../src/vite";

// console.log(Vconsole);

export default defineConfig(({ command }) => {
  // 可以自行根据是否本地开发环境调试时关闭（因为大多数情况可以直接看控制台输出）
  function vconsoleEnabled() {
    if (command === "build") {
      return true;
    }

    if (command === "serve") {
      return true;
    }
    return false;
  }
  return {
    plugins: [
      Inspect(),
      unpluginVconsole({
        field: "enable_console",
        isBuild: command === "build",
        entry: resolve("main.ts"),
        enabled: vconsoleEnabled(),
        config: { theme: "dark" },
      }),
    ],
  };
});

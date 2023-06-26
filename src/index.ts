import { resolve } from "path";
import { createUnplugin } from "unplugin";
import type { Options } from "./types";

export default createUnplugin((options: Options) => {
  const {
    field = "enable_console",
    enabled = true,
    isBuild = false,
    entry = resolve("src/main.ts"),
    config = {},
  } = options;

  const importStr = `import Vconsole from "vconsole";`;
  const newStr = `new Vconsole(${JSON.stringify(config)});`;

  const queryStr = `
  (async () => {
    function unpluginQuery(name) {
      let search = window.location.search.substr(1);
      let hash = window.location.hash.split("?");
      if (hash && hash.length > 1) {
        search = search + "&" + hash[1];
      }
      let reg = new RegExp("(^|&)" + name + "=(.*?)(&|$)");
      let res = search.match(reg);
      let value = res ? res[2] : null;
      return value;
    }
    if (unpluginQuery(${field})) {
      const { default: Vconsole } = await import("vconsole");
      ${newStr}
    }
  })();
  `;

  let entryPath = Array.isArray(entry) ? entry : [entry];
  entryPath.map((item) => resolve(item));
  if (process.platform === "win32")
    entryPath = entryPath.map((item) => item.replace(/\\/g, "/"));
  return {
    name: "unplugin-auto-vconsole",
    transformInclude(id) {
      return entryPath.includes(id);
    },
    transform(code: string) {
      if (enabled) {
        code = `${isBuild ? queryStr : importStr + newStr}${code}`;
      }
      return {
        code,
        map: null,
      };
    },
  };
});

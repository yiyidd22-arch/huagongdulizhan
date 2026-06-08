/** 生产构建后删除 out/news-data，避免静态 JSON 覆盖 R2 实时数据 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outNewsData = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "out",
  "news-data",
);

if (fs.existsSync(outNewsData)) {
  fs.rmSync(outNewsData, { recursive: true, force: true });
  console.log("Removed out/news-data — production reads live data from R2.");
}

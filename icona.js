import { generate } from "@icona/generator";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const iconsPath = path.join(__dirname, ".icona", "icons.json");
const svgOutputRoot = path.join(__dirname, "assets", "svg");

const svgConfig = {
  path: svgOutputRoot,
  svgoConfig: {
    js2svg: {
      indent: 2,
      pretty: true
    },
    plugins: [
      {
        name: "addAttributesToSVGElement",
        params: {
          attributes: [{ "data-icona-icon": "true" }]
        }
      },
      {
        name: "convertColors",
        params: {
          currentColor: true
        }
      },
      {
        name: "removeAttrs",
        params: {
          attrs: ["id"]
        }
      }
    ]
  }
};

const ensureSvgDirs = async icons => {
  await fs.mkdir(svgOutputRoot, { recursive: true });

  const names = Object.keys(icons);
  const dirSet = new Set();

  for (const name of names) {
    const dir = path.dirname(name);
    if (dir !== ".") dirSet.add(dir);
  }

  await Promise.all(
    Array.from(dirSet, dir =>
      fs.mkdir(path.join(svgOutputRoot, dir), { recursive: true })
    )
  );
};

const run = async () => {
  const iconsData = JSON.parse(await fs.readFile(iconsPath, "utf-8"));
  await ensureSvgDirs(iconsData);

  await generate({
    icons: iconsData,
    config: {
      svg: svgConfig
    }
  });
};

run();

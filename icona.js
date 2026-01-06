import { generate } from "@icona/generator";

const svgConfig = {
  path: "assets/svg",
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

const run = async () => {
  await generate({
    icons: ".icona/icons.json",
    config: {
      svg: svgConfig
    }
  });
};

run();

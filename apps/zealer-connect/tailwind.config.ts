import type { Config } from "tailwindcss";

import sharedTailwindConfig from "@zealer/ui/tailwind.config";

const config: Config = {
  ...sharedTailwindConfig,
  theme: {
    ...sharedTailwindConfig.theme,
    extend: {
      ...sharedTailwindConfig.theme?.extend,
      colors: {
        ...sharedTailwindConfig.theme?.extend?.colors,
        orange: "#FF7917",
        peach: "#FFE0BD",
        grandis: "#FFC989",
        cream: "#F5F5F5",
        gravel: "#4E4E4E",
        iridium: "#3F3F3F",
        platinum: "#E6E6E6",
        ghost: "#CDCDCD",
        porcelain: "#F1F1F1",
        ironside: "#636363",
      },
    },
  },
};

export default config;

// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import eslintConfigPrettier from "eslint-config-prettier";

export default [{ 
  languageOptions: { globals: { ...globals.browser, ...globals.node } } 
}, pluginJs.configs.recommended, ...tseslint.configs.recommended, ...pluginVue.configs["flat/essential"], {
  files: ["*.vue", "**/*.vue"],
  languageOptions: {
    parser: vueParser,
    parserOptions: { parser: tseslint.parser, sourceType: "module" },
  },
}, eslintConfigPrettier, {
  files:["src/components/ui/**/*.vue"],
  rules: {
    "vue/multi-word-component-names": "off"
  }
}, {
  files:["src/types/database.ts"], 
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  }
}, ...storybook.configs["flat/recommended"], ...storybook.configs["flat/recommended"]];

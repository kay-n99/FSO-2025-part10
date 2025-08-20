import { defineConfig } from "eslint/config";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import jestPlugin from "eslint-plugin-jest"; // Import jest plugin

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("eslint:recommended", "plugin:react/recommended", "plugin:jest/recommended"), // Add jest recommended

    plugins: {
        react,
        "react-native": reactNative,
        jest: jestPlugin, // Add jest plugin
    },

    languageOptions: {
        globals: {
            ...reactNative.environments["react-native"]["react-native"],
            ...jestPlugin.environments.globals.jest, // Add jest globals
        },

        parser: babelParser,
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
    },
}]);

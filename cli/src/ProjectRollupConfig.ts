import replace from "@rollup/plugin-replace";
import url from 'rollup-plugin-url'
import path from "path";
import { OutputOptions, Plugin, RollupWatchOptions } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from 'rollup-plugin-postcss'
import typescript from "@rollup/plugin-typescript";
import { projPathResolve } from './resolver'

type RollupUsage = "dev" | "build"

export default class ProjectRollupConfig {
  constructor(private usage: RollupUsage) { 
  }

  private plugin(): any[] {
    const isProd = process.env.NODE_ENV === "production"
    const plugins = [
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify(isProd ? "production": "development")
      }),
      url({
        limit: 8 * 1024,
        include : ["**/*.svg"],
        emitFiles : true,
      }),
      nodeResolve(),
      commonjs({
        include: "node_modules/**"
      }),
      postcss({
        plugins: []
      }),
      typescript({
        tsconfig: projPathResolve("tsconfig.json")
      })
    ]

    return plugins
  }

  private outputOptions(): OutputOptions {
    return {
      file: projPathResolve("build/bundle.js"),
      format: "cjs",
      sourcemap: process.env.node_env !== "production"
    }
  }

  watchOptions(): RollupWatchOptions {
    return {
      input: projPathResolve("src/main.tsx"),
      plugins: this.plugin(),
      output: this.outputOptions(),
      watch: {
        include: projPathResolve("src/**")
      }
    }
  }
}
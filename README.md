# Vue 3 + TypeScript + Vite

This project is a template to kickstart your development journey with Vue 3, TypeScript, and Vite. It utilizes Vue 3 <script setup> Single File Components (SFCs), taking advantage of the script setup docs.

## Usage

1. Clone the repository: git clone https://github.com/vorynkavitaliy/vue-3-ts-marketplace.git
2. Navigate to the project directory: cd your-project
3. Install dependencies: npm install
4. Run the project: npm run start:<mode>

## Build
To build the project, use the following command: npm run build

## Configuration

1. Create a copy of env.example and name it .env.
2. Fill in the necessary configuration values in the .env file.

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

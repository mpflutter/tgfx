#!/usr/bin/env node
process.chdir(__dirname);

process.argv.push("-s");
process.argv.push("../ckadapter");
process.argv.push("-o");
process.argv.push("../ckadapter");
process.argv.push("-p");
process.argv.push("web");
process.argv.push("ckadapter");
require("../../build_tgfx");


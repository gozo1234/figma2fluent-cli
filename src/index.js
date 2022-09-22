#! /usr/bin/env node

const {program} = require('commander');
const importFunc = require('./commands/import.js');

program.command('import <token> <fileKey> [exportTo]')
    .description('Import components from figma design file')
    .action(importFunc);

program.parse(process.argv);
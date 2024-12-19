#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/gendiffLogic.js';

const program = new Command();
gendiff(program);
program.parse(process.argv);
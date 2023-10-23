import { homedir } from 'os';
import { join } from 'path';

export const MISSING_COMMA_DIR = join(homedir(), '.missing-comma');

export const NO_PASS_SYMBOL = 'n395p' as const;
export const NO_PASS_SYMBOL_POSITION = 10 as const;

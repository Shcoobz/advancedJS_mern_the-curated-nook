import path from 'path';
import { fileURLToPath } from 'url';

/**
 * @constant
 * @description Derives the directory name of the current module.
 */
export const __dirname = path.dirname(fileURLToPath(import.meta.url));

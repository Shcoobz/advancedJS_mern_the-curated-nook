import { promises as fsPromises } from 'fs';
import path from 'path';
import express from 'express';
import { __dirname } from '../config/common/dirname.js';
import { ROUTE } from '../config/common/constants.js';

export async function ensureDirectoryExists(baseDir, subDir) {
  const dirPath = path.join(baseDir, subDir);

  try {
    if (!(await fsPromises.stat(dirPath).catch(() => false))) {
      await fsPromises.mkdir(dirPath, { recursive: true });
    }
  } catch (err) {
    console.log(err);
  }
}

export async function appendToLogFile(baseDir, subDir, fileName, content) {
  const fullPath = path.join(baseDir, subDir, fileName);
  try {
    await fsPromises.appendFile(fullPath, content);
  } catch (err) {
    console.log(err);
  }
}

export function serveStaticPublicFiles() {
  const publicPath = path.join(__dirname, ROUTE.STATIC.PUBLIC);

  return express.static(publicPath);
}

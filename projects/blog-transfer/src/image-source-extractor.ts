// Therefore those skilled at the unorthodox
// are infinite as heaven and earth,
// inexhaustible as the great rivers.
// When they come to an end,
// they begin again,
// like the days and months;
// they die and are reborn,
// like the four seasons.
//
// - Sun Tsu, The Art of War.
//
// ArthurHub, 2024

// A class to extract all image sources from all the markdown files in a given folder

import * as path from 'path';
import { promises as fs } from 'fs';

export interface ImageInfo {
  source: string;
  filePath: string;
  index: number;
}

export async function extractImageSources(folderPath: string): Promise<ImageInfo[]> {
  const imageInfos: ImageInfo[] = [];
  const markdownFiles = await getMarkdownFiles(folderPath);

  for (const file of markdownFiles) {
    const filePath = path.join(folderPath, file);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const images = extractImagesFromContent(fileContent, filePath);
    imageInfos.push(...images);
  }

  return imageInfos;
}

async function getMarkdownFiles(dir: string): Promise<string[]> {
  const files = await fs.readdir(dir);
  return files.filter((file) => path.extname(file).toLowerCase() === '.md');
}

function extractImagesFromContent(content: string, filePath: string): ImageInfo[] {
  const imageRegex = /!\[[^\]]*\]\((.*?)\s*(?:"(?:.*)")?\)/g;
  const images: ImageInfo[] = [];
  let match;

  while ((match = imageRegex.exec(content)) !== null) {
    const source = match[1];
    if (source !== undefined) {
      const index = match.index;
      images.push({ source, filePath, index });
    }
  }

  return images;
}

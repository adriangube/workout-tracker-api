import { readFileSync } from 'fs'
import { join } from 'path'

interface Params {
  filename: string,
  folderPath: string,
}

export function loadSQL({
  filename,
  folderPath,
}: Params): string {
  const path = join(process.cwd(), folderPath, filename)
  return readFileSync(path, 'utf8')
}
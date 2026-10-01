import JSZip from 'jszip'
import type { ImportCheck, ImportValidationResult, RequiredFolder } from '@/types/domain'

// Validated against the real ZCP_NUM_V3.zip (2026-09-30):
// zip must contain these 4 top-level folders. "Data Sources" and "Lineage" must have
// at least one file inside. "Models" and "Objects" just need to exist as folders —
// files inside them are optional.
const REQUIRED_FOLDERS: RequiredFolder[] = ['Data Sources', 'Lineage', 'Models', 'Objects']
const FOLDERS_REQUIRING_FILES: RequiredFolder[] = ['Data Sources', 'Lineage']

// This runs entirely in the browser — no backend call. It's a stand-in for the future
// POST /imports endpoint, which will do the same check server-side on the real upload.
// Swap point: once that endpoint exists, replace the call to this function (in
// UploadFilesPage.tsx) with http<ImportValidationResult>('/imports', { method: 'POST', body: formData }).
export async function validateZip(file: File): Promise<ImportValidationResult> {
  const errors: string[] = []
  let checks: ImportCheck[] = REQUIRED_FOLDERS.map((folder) => ({
    folder,
    present: false,
    hasFiles: false,
  }))

  let zip: JSZip
  try {
    zip = await JSZip.loadAsync(file)
  } catch {
    return {
      importId: crypto.randomUUID(),
      fileName: file.name,
      sizeBytes: file.size,
      valid: false,
      checks,
      errors: ['Could not read this file as a zip archive.'],
    }
  }

  // Build a map of top-level folder name -> whether it has any file (not just itself) inside.
  const folderHasFile = new Map<string, boolean>()
  const folderPresent = new Set<string>()

  zip.forEach((relativePath, entry) => {
    const topFolder = relativePath.split('/')[0]
    if (!topFolder) return
    if (entry.dir) {
      // An entry like "Lineage/" marks the folder itself as present.
      if (relativePath === `${topFolder}/`) folderPresent.add(topFolder)
      return
    }
    // Any file under <topFolder>/... means that folder both exists and has files.
    folderPresent.add(topFolder)
    folderHasFile.set(topFolder, true)
  })

  checks = REQUIRED_FOLDERS.map((folder) => ({
    folder,
    present: folderPresent.has(folder),
    hasFiles: folderHasFile.get(folder) ?? false,
  }))

  for (const check of checks) {
    if (!check.present) {
      errors.push(`Missing required folder: "${check.folder}".`)
      continue
    }
    if (FOLDERS_REQUIRING_FILES.includes(check.folder) && !check.hasFiles) {
      errors.push(`"${check.folder}" must contain at least one file.`)
    }
  }

  return {
    importId: crypto.randomUUID(),
    fileName: file.name,
    sizeBytes: file.size,
    valid: errors.length === 0,
    checks,
    errors,
  }
}
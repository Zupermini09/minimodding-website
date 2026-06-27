/** Returns the image path unchanged. All images are served from /public. */
export function storageUrl(path: string): string {
  return path ?? "";
}

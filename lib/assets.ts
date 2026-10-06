// Set NEXT_PUBLIC_BASE_PATH at build time for a host such as GitHub Pages.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export function assetPath(path: string) {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

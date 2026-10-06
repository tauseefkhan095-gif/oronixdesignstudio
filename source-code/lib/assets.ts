// Relative URLs let the same built website run at a domain root or a repository URL.
export function assetPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

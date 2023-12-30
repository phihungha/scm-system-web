export async function uploadFile(url: string, file: File) {
  return fetch(url, { method: 'PUT', body: file });
}

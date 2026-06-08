/** 新闻图片同步：从 CMS 下载并写入 R2 / 本地 public/news-data */

export function contentTypeFromFilename(filename) {
  if (/\.jpe?g$/i.test(filename)) return "image/jpeg";
  if (/\.png$/i.test(filename)) return "image/png";
  if (/\.webp$/i.test(filename)) return "image/webp";
  if (/\.gif$/i.test(filename)) return "image/gif";
  return "application/octet-stream";
}

export function basenameFromPath(rawPath) {
  if (!rawPath) return null;
  try {
    const pathname = rawPath.startsWith("http")
      ? new URL(rawPath).pathname
      : rawPath;
    return pathname.split("/").filter(Boolean).pop() || null;
  } catch {
    return null;
  }
}

export function resolveCmsImageUrl(rawPath, cmsOrigin) {
  if (!rawPath) return null;
  if (rawPath.startsWith("http")) return rawPath;
  return `${cmsOrigin}/${rawPath.replace(/^\//, "")}`;
}

export function toPublicImagePath(basename) {
  return `/news-data/images/${basename}`;
}

export function toR2ImageKey(basename) {
  return `images/${basename}`;
}

export async function fetchImageBuffer(fetchUrl, timeoutMs = 60000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(fetchUrl, {
      signal: controller.signal,
      headers: { "User-Agent": "gaoyuan-news-sync/1.0" },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const basename = basenameFromPath(fetchUrl) || "image.jpg";
    const contentType =
      res.headers.get("content-type") || contentTypeFromFilename(basename);
    return { buffer, contentType, basename };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * @param {object} article
 * @param {string} cmsOrigin
 * @param {Map<string, string>} cache rawPath -> publicPath
 * @param {(args: { r2Key: string, buffer: Buffer, contentType: string, localPath: string }) => Promise<void>} saveImage
 */
export async function normalizeArticleWithImages(
  article,
  cmsOrigin,
  cache,
  saveImage,
) {
  const syncOne = async (rawPath) => {
    if (!rawPath) return null;
    if (cache.has(rawPath)) return cache.get(rawPath);

    const basename = basenameFromPath(rawPath);
    if (!basename) return resolveCmsImageUrl(rawPath, cmsOrigin);

    const fetchUrl = resolveCmsImageUrl(rawPath, cmsOrigin);
    try {
      const { buffer, contentType } = await fetchImageBuffer(fetchUrl);
      const r2Key = toR2ImageKey(basename);
      const publicPath = toPublicImagePath(basename);
      const localPath = `images/${basename}`;

      await saveImage({ r2Key, buffer, contentType, localPath });
      cache.set(rawPath, publicPath);
      return publicPath;
    } catch (err) {
      console.warn(`[news-sync] image failed ${rawPath}:`, err.message || err);
      const fallback = resolveCmsImageUrl(rawPath, cmsOrigin);
      cache.set(rawPath, fallback);
      return fallback;
    }
  };

  const coverImage = await syncOne(article.coverImage);
  const images = (
    await Promise.all((article.images || []).map((p) => syncOne(p)))
  ).filter(Boolean);

  return { ...article, coverImage, images };
}

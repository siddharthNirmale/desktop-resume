const thumbnailCache = new Map();

export const generateThumbnail = (src, size = 64) => {
  if (thumbnailCache.has(src)) {
    return Promise.resolve(thumbnailCache.get(src));
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = size / Math.max(img.width, img.height);

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const base64 = canvas.toDataURL("image/jpeg", 0.6);
      thumbnailCache.set(src, base64);
      resolve(base64);
    };

    img.onerror = () => resolve(src);
  });
};

export const preloadImage = (src) => {
  if (!src) return Promise.resolve();

  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    if (img.complete) {
      resolve();
      return;
    }
    img.onload = resolve;
    img.onerror = resolve;
  });
};

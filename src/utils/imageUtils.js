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

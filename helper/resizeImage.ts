export async function resizeImage(
  file: File,
  maxSize = 4 * 1024 * 1024, // 4 MB
  quality = 0.8,
  maxWidth = 1920,
  maxHeight = 1080
) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        // Resize logic: Maintain aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx!.drawImage(img, 0, 0, width, height);

        // Compress the image
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Image compression failed."));
              return;
            }

            // Check if the blob size is below the target size
            if (blob.size <= maxSize) {
              resolve(blob);
            } else {
              // If still too large, reduce quality and try again
              resizeImage(file, maxSize, quality - 0.1)
                .then(resolve)
                .catch(reject);
            }
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = (error) => reject(error);
      // @ts-ignore
      img.src = event.target.result as string;
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

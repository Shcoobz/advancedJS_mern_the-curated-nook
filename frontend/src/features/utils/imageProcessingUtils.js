export function adjustContrast(imageData, contrast) {
  const data = imageData.data;
  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

  for (let i = 0; i < data.length; i += 4) {
    data[i] = factor * (data[i] - 128) + 128; // red
    data[i + 1] = factor * (data[i + 1] - 128) + 128; // green
    data[i + 2] = factor * (data[i + 2] - 128) + 128; // blue
  }

  return imageData;
}

export function applySobel(imageData) {
  const width = imageData.width;
  const height = imageData.height;
  const kernelX = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
  ];
  const kernelY = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1],
  ];

  let sobelData = [];
  const grayscaleData = [];

  // Convert to grayscale
  for (let i = 0; i < imageData.data.length; i += 4) {
    const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
    grayscaleData.push(avg);
  }

  // Apply Sobel kernels
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let px = (y * width + x) * 4;
      let gx = 0;
      let gy = 0;

      for (let cy = -1; cy <= 1; cy++) {
        for (let cx = -1; cx <= 1; cx++) {
          const cpx = (y + cy) * width + (x + cx);
          gx += grayscaleData[cpx] * kernelX[cy + 1][cx + 1];
          gy += grayscaleData[cpx] * kernelY[cy + 1][cx + 1];
        }
      }

      let magnitude = Math.sqrt(gx * gx + gy * gy);
      sobelData[px] = magnitude;
      sobelData[px + 1] = magnitude;
      sobelData[px + 2] = magnitude;
      sobelData[px + 3] = 255;
    }
  }

  for (let i = 0; i < imageData.data.length; i++) {
    imageData.data[i] = sobelData[i];
  }

  return imageData;
}

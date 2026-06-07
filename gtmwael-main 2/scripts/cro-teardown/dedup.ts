// @ts-ignore — sharp is a devDependency without bundled types in this project
import sharp from 'sharp';

const FP_SIZE = 32; // 32×32 = 1024 grayscale values per image

/**
 * Resize image to FP_SIZE×FP_SIZE grayscale and return a unit-length vector.
 * Normalising to unit length means the dot product of two fingerprints equals
 * their cosine similarity — no separate magnitude division needed at compare time.
 */
export async function fingerprint(absImagePath: string): Promise<Float32Array> {
  const { data } = await sharp(absImagePath)
    .resize(FP_SIZE, FP_SIZE, { fit: 'fill' })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const arr = new Float32Array(data.length);
  let sq = 0;
  for (let i = 0; i < data.length; i++) {
    arr[i] = data[i] / 255;
    sq += arr[i] * arr[i];
  }
  const mag = Math.sqrt(sq);
  if (mag > 0) for (let i = 0; i < arr.length; i++) arr[i] /= mag;
  return arr;
}

/** Cosine similarity in [0, 1]. Both vectors must already be unit-length. */
export function similarity(a: Float32Array, b: Float32Array): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return parseFloat(Math.min(1, Math.max(0, dot)).toFixed(4));
}

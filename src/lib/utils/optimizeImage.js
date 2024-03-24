export default async function optimizeImage(imageFile) {
    const canvas = document.createElement('canvas');
    const bitmap = await createImageBitmap(imageFile);
    // const MAX_WIDTH = Math.min(1200, visualViewport.width);
    // const MAX_HEIGHT = Math.min(1200, visualViewport.height);
    const MAX_WIDTH = bitmap.width;
    const MAX_HEIGHT = bitmap.height;
    
    const MAX_AREA = MAX_WIDTH * MAX_HEIGHT;
    const IMAGE_WIDTH = bitmap.width;
    const IMAGE_HEIGHT = bitmap.height;
    const IMAGE_AREA = IMAGE_WIDTH * IMAGE_HEIGHT;

    let relativeAspect = 1;

    if (MAX_AREA < IMAGE_AREA) {
        relativeAspect =
            IMAGE_WIDTH > IMAGE_HEIGHT ? MAX_WIDTH / IMAGE_WIDTH : MAX_HEIGHT / IMAGE_WIDTH;
    }

    canvas.width = IMAGE_WIDTH * relativeAspect;
    canvas.height = IMAGE_HEIGHT * relativeAspect;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const originalImage = ctx.canvas.toDataURL('image/jpeg', 0.9);
    ctx.filter = 'grayscale(100)';
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const dataURL = ctx.canvas.toDataURL('image/jpeg', 0.9);
    return { dataURL, originalImage};
}
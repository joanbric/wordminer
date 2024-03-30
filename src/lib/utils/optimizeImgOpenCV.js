import cv from '@techstark/opencv-js';

export default async function optimizeOpenCV(
	sourceInput,
	canvasOutput = document.createElement('canvas')
) {
	const canvas = document.createElement('canvas');
	let source = sourceInput;
	if(typeof sourceInput !== 'string') source = await createImageBitmap(sourceInput);

	const { width, height, videoWidth, videoHeight } = source;
	canvas.width = videoWidth || width;
	canvas.height = videoHeight || height;

	const ctx = canvas.getContext('2d');

	ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
	let img = cv.imread(canvas);
	cv.cvtColor(img, img, cv.COLOR_RGBA2GRAY);
	// Apply Gaussian blur to remove noise
	cv.GaussianBlur(img, img, new cv.Size(3, 3), 0);
	cv.adaptiveThreshold(img, img, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 11, 4);

	cv.distanceTransform(img, img, cv.DIST_L2, 5, 0.5);

	cv.normalize(img, img, 0, 1, cv.NORM_MINMAX, -1);
	cv.threshold(img, img, 0, 255, cv.THRESH_BINARY);

	// Perform morphological operations to further clean up the text
	let kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(1, 1));
	cv.morphologyEx(img, img, cv.MORPH_OPEN, kernel);
	cv.erode(img, img, kernel);
	cv.dilate(img, img, kernel);

	// let contours = new cv.MatVector();
	// let hierarchy = new cv.Mat();
	// try {
	// 	cv.findContours(img, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
	// } catch (err) {
	// 	console.error('El error es: ', err);
	// }
	// // Get all contours
	// let cnts = [];
	// for (let i = 0; i < contours.size(); ++i) {
	// 	cnts.push(contours.get(i));
	// }

	// // Initialize the list of contours which belong to actual characters that we will be OCR'ing
	// let chars = [];

	// // Loop over the contours
	// for (let i = 0; i < cnts.length; ++i) {
	// 	let c = cnts[i];
	// 	// Compute the bounding box of the contour
	// 	let rect = cv.boundingRect(c);
	// 	// let x = rect.x;
	// 	// let y = rect.y;
	// 	let w = rect.width;
	// 	let h = rect.height;
	// 	// Check if contour is at least 35px wide and 100px tall, and if so, consider the contour a digit
	// 	if (w >= 35 && h >= 100) {
	// 		chars.push(c);
	// 	}
	// }

	// // Compute the convex hull of the characters
	// let charsMat = cv.matFromArray(chars.length, 1, cv.CV_32FC2, chars.flat());
	// let hull = new cv.Mat();
	// cv.convexHull(charsMat, hull);

	// // Allocate memory for the convex hull mask, draw the convex hull on
	// // the image, and then enlarge it via a dilation
	// let mask = new cv.Mat.zeros(img.rows, img.cols, cv.CV_8UC1);
	// contours.push_back(hull);
	// cv.drawContours(mask, contours, -1, new cv.Scalar(255), cv.FILLED);
	// cv.dilate(mask, mask, new cv.Mat(), new cv.Point(-1, -1), 2);
    
	// // Take the bitwise of the opening image and the mask to reveal *just*
	// // the characters in the image
	// let final = new cv.Mat();
	// cv.bitwise_and(img, img, final, mask);
    
    const scaleRation = window.innerWidth / img.cols;
    cv.resize(img, img, new cv.Size(), scaleRation, scaleRation, cv.INTER_NEAREST);
	
    canvasOutput.width = source.videoWidth;
	canvasOutput.height = source.videoHeight;
	canvasOutput.getContext('2d').drawImage(source, 0, 0, source.videoWidth, source.videoHeight);
    
	cv.imshow(canvas, img);
	cv.imshow(canvasOutput, img);
	const dataURL = canvas.toDataURL('image/jpeg', 0.9);
	img.delete();
	// contours.delete();
	// hierarchy.delete();
    
	if (dataURL.length < 30) throw new Error('dataURL is empty');
	return dataURL;
}

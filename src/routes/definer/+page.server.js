// import imgToTxt from '$lib/utils/imgToTxt';

/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
	runtime: 'edge'
};



import { createWorker } from 'tesseract.js';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		try {
			const data = await request.formData();

			if (!data.has('imgBase64')) return;
			const img = data.get('imgBase64');
			const originalImage = data.get('imgFile');
			const worker = await createWorker('eng', 1, {
                corePath: "../../lib/tesseract.js-core/"
                
            });
			const ret = await worker.recognize(img);
			worker.terminate();
			const {
				data: { words }
			} = ret;

			const text = words
				.filter((word) => word.confidence > 45)
				.map((word) => {
					return {
						text: word.text,
						baseline: word.baseline,
						font_size: word.font_size
					};
				});

			return {
				status: {
					code: 200
				},
				img: originalImage,
				text
			};
		} catch (err) {
            console.error(err)
			return {
				status: {
					code: 500,
					msg: err.message
				}
			};
		}
	}
};

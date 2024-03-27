// import imgToTxt from '$lib/utils/imgToTxt';

// /** @type {import('@sveltejs/adapter-vercel').Config} */
// export const config = {
// 	runtime: 'edge'
// };


/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		try {
			const data = await request.formData();

			if (!data.has('imgBase64')) return;
			const img = data.get('imgBase64');
			const originalImage = data.get('imgFile');
			
			return {
				img,
                originalImage
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

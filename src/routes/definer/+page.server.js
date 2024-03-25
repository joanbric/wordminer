
import imgToTxt from '$lib/utils/imgToTxt';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({request}) => {
        try{
            const data = await request.formData();
            
        if(!data.has('imgBase64')) return
        const img = data.get('imgBase64');
        const originalImage = data.get('imgFile');
        const ret = await imgToTxt(img);
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
            status:{
                code: 200
            },
            img: originalImage,
            text,
        }
    }catch(err){
        return {
            status:{
                code: 500,
                msg: err.message
            },
        }
    }
	}
};
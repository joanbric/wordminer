import { createWorker} from "tesseract.js";

export default async function imgToTxt(img) {
    
    const worker = await createWorker("eng");
    const ret = await worker.recognize(img);
    worker.terminate();
    return ret;

}
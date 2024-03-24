import { test, expect } from 'vitest';
import imgToTxt from "./imgToTxt";


test("imgToTxt", async () => {
    const ret = await imgToTxt('https://tesseract.projectnaptha.com/img/eng_bw.png');
    expect(ret).toBeTypeOf("object");
    expect(ret.data).not.toBeUndefined();
})
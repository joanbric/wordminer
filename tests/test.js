
import {test, expect} from '@playwright/test';


test('Home page has a title?', async ({page}) => {
    await page.goto('http://localhost:5173/');
    await expect(page).toHaveTitle(/WordMiner*/);
})

test('Upload a image', async ({page}) => {
    await page.goto('http://localhost:5173/');
    await page.locator('input[type="file"][name="dropzone"]').setInputFiles('./pics/encoding.png');
    // await page.getByRole('button', {name: 'Drag \'n\' drop some files here, or click to select files'}).click();
    await page.locator('form').dispatchEvent('submit');
    // await expect(page).toHaveURL('http://localhost:5173/');
    await expect(page).toHaveURL("http://localhost:5173/definer");
})
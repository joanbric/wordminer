<script>
	import Loader from '$lib/components/Loader.svelte';
	import SeoTag from '$lib/components/SEOTag.svelte';
	import Alert from '../lib/components/Alert.svelte';
	import optimizeImage from '../lib/utils/optimizeImage';
	import InputCamera from '../lib/components/InputCamera.svelte';
	import { get } from 'svelte/store';

	const seo = {
		title: 'WordMiner - Tu amigo al momento de leer',
		description:
			"Wordminer is a free, open-source word miner. It uses the Tesseract OCR engine to extract text from images. It's powered by [SvelteKit](https://kit.svelte.dev/)."
	};

	let isLoading = false;
	let form;
	let alert;

	async function handleDrop({ detail: { uploadedImg } }) {
		if (!uploadedImg) {
			alert = {
				type: 'success',
				title: 'Imagen procesada',
				message: 'Imagen procesada correctamente'
			};
			return;
		}

		isLoading = true;
		const imgBase64 = await optimizeImage(uploadedImg);
		form.addEventListener('formdata', ({ formData }) => {
			formData.set('imgBase64', imgBase64);
		});
		form.submit();
	}


    async function getPicture({ detail: { uploadedImg } }) {
		if (uploadedImg) {
			const { dataURL, originalImage } = await optimizeImage(uploadedImg);
			form.addEventListener('formdata', ({ formData }) => {
				formData.set('imgBase64', dataURL);
				formData.set('imgFile', originalImage);
			});
			form.submit();
		}
	}

	const closeAlert = () => (alert = undefined);
</script>

<SeoTag {...seo} />
{#if alert}
	<Alert {...alert} on:close={closeAlert} />
{/if}

<div class="container">
	<h1>Wordminer</h1>

	<p>
		Immerse yourself in your book and explore each page with confidence and ease. With just a few
		clicks, you'll have instant access to a treasure trove of knowledge that will enrich your
		reading experience and expand your vocabulary.
	</p>
	<form bind:this={form} action="/definer" method="POST">
		<InputCamera on:capture={getPicture} on:drop={getPicture} />
	</form>
</div>
<Loader {isLoading} />

<style>
	.container {
		padding-top: 3rem;
		text-align: center;
		padding: 0 2rem;
	}
	h1 {
		margin: 3rem 0;
		font-size: 4rem;
	}
	p {
		margin: 3rem 0;
		font-size: 1.4rem;
	}
</style>

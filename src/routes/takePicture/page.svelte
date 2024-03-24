<script>
	import InputCamera from '$lib/components/InputCamera.svelte';
	import optimizeImage from '$lib/utils/optimizeImage';

    const algo = Element.prototype.capture

	let form;
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
    
</script>

<h1>Take a photo</h1>
<p>Use your camera to take a photo</p>
<form bind:this={form} action="/definer" method="POST">
    {#if algo}
	<InputCamera
		on:capture={getPicture}
		on:drop={getPicture}
	/>
    {/if}
</form>

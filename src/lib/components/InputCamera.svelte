<script>
	import { createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';
	import MyDropZone from '$lib/components/MyDropZone.svelte';

	const dispatch = new createEventDispatcher();
	
    let isPermissionsGranted = true;
	let isCaptureSupported = true;
	let inputCapture;

	if (browser) {
		isCaptureSupported = 'capture' in document.createElement('input');
		navigator.permissions
			.query({ name: 'camera' })
			.then((permission) => (isPermissionsGranted = permission.state === 'granted'));
	}

	function getPhoto(event) {
		dispatch('capture', {
			uploadedImg: event.target.files[0]
		});
	}

	function handleDrop({ detail: { uploadedImg } }) {
		dispatch('drop', { uploadedImg });
	}
</script>

{#if isCaptureSupported}
{#if !isPermissionsGranted}
<small>
    <b>Important!:</b> To take a photo, your camera should avaliable and your should grand permissions
    to access it. Thanks!
</small>
{/if}
<label for="camera" class="take-picture">Take photo</label>
<input
		bind:this={inputCapture}
		disabled={!isCaptureSupported}
		id="camera"
		type="file"
		capture="environment"
		accept="image/*"
		on:change={getPhoto}
	/>
{:else}
	<p>Or upload a picture.</p>
	<MyDropZone on:drop={handleDrop} />
{/if}

<style>

	.take-picture {
		display: block;
		text-align: center;
		background-color: var(--clr-pri-light);
		padding: 1rem;
		border-radius: 1rem;
		font-size: 1.2rem;
		margin-block: 100px;
		color: var(--clr-pri-dark);
		font-weight: 600;
	}

	input {
		display: none;
	}
</style>

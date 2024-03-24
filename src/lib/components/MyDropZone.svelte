<script>
	export let isLoading = false;
	import Dropzone from 'svelte-file-dropzone';
	import { createEventDispatcher } from 'svelte';
	const dispatch = new createEventDispatcher();

	function handleDrop({
		detail: {
			acceptedFiles: [uploadedImg]
		}
	}) {
		dispatch('drop', { uploadedImg });
		console.log('Algo pasa');
	}
</script>

<Dropzone
	name="dropzone"
	on:drop={handleDrop}
	accept="image/*"
	disabled={isLoading}
	multiple={false}
	containerClasses="custom-dropzone"
	disableDefaultStyles={true}
	on:dragover={(e) => e.detail.dragEvent.target.classList.add('on-over')}
	on:dragleave={(e) => e.detail.dragEvent.target.classList.remove('on-over')}
/>

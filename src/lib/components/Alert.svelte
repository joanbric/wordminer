<script>
	export let message;
	export let title;
	export let type;
    export let duration = 10 * 1000;

    import { fly } from 'svelte/transition';
    import { createEventDispatcher, onDestroy, onMount } from 'svelte';
    const dispatch = createEventDispatcher();

    function close() {
        dispatch('close');
    }
    let timeout;
    onMount(() =>  timeout = setTimeout(close, duration))
    onDestroy(() => clearTimeout(timeout))
</script>

<div transition:fly={{y:-200, duration: 1000 }} class="alert alert-{type}" role="alert">
    <div><button on:click={close}>close</button></div>
	<h5>{title}</h5>
	<p>{message}</p>
</div>

<style>
	.alert {
		position: fixed;
		top: 10px;
		right: 20px;
		z-index: 100;
		border: 1px solid yellow;
		padding: 10px 20px;
		border-radius: 12px;
		background-color: rgba(59, 59, 30, 0.667);
		box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.2);
        text-align: left;
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';

	import Icon from '../icon/Icon.svelte';

	let { path, message, children } = $props();

	let popoverElement = $state<HTMLDivElement>();

	onMount(() => {
		popoverElement?.showPopover();

		return () => {
			popoverElement?.hidePopover();
		};
	});
</script>

<div popover="manual" bind:this={popoverElement}>
	<Icon {path} />
	<p>{message}</p>
	{@render children()}
</div>

<style lang="postcss">
	[popover] {
		position: fixed;
		inset-block-start: unset;
		inset-inline-end: unset;
		inset-block-end: 1rem;
		inset-inline-start: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 0;
		padding: 0.5rem;
	}
</style>

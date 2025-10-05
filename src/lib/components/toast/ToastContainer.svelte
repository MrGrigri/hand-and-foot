<script lang="ts">
	import { mdiClose } from '@mdi/js';
	import { getToastIcon, removeToast, toasts } from '$lib/stores';
	import Icon from '../icon/Icon.svelte';
	import Toast from './Toast.svelte';
</script>

<section>
	{#each [...toasts] as [key, value] (key)}
		<Toast path={getToastIcon(value.type)} message={value.message}>
			<button type="button" aria-label="close message" onclick={() => removeToast(value.id)}>
				<Icon path={mdiClose} />
			</button>
		</Toast>
	{/each}
</section>

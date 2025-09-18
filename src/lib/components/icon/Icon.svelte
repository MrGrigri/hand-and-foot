<script lang="ts">
	import { mdiVectorSquare } from '@mdi/js';

	let { size = 24, fill = 'currentColor', path = mdiVectorSquare } = $props();
</script>

<svg viewBox="0 0 24 24" width={size} height={size} {fill}>
	<path d={path} />
</svg>

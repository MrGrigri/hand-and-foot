<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>{page.status}: {page?.error?.message}</h1>
<p>
	{#if page.status === 404}
		The game you are looking for does not exist or the ID is invalid.
	{:else}
		Something went wrong.
	{/if}
</p>

<script lang="ts">
	import { invalidate } from '$app/navigation';
	import SiteHeader from '$lib/components/site-header/SiteHeader.svelte';
	import { onMount } from 'svelte';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) invalidate('supabase:auth');
		});
		return () => data.subscription.unsubscribe();
	});
</script>

<SiteHeader isLoggedIn={!!session} />

<main>
	{@render children()}
</main>

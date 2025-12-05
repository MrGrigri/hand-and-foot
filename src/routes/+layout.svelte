<script lang="ts">
	import { invalidate } from '$app/navigation';
	import SiteHeader from '$lib/components/site-header/SiteHeader.svelte';
	import ToastContainer from '$lib/components/toast/ToastContainer.svelte';
	import { SUPABASE_AUTH } from '$lib/constants';

	let { data: propData, children } = $props();
	let { supabase, claims } = $derived(propData);

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== claims?.exp) invalidate(SUPABASE_AUTH);
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<SiteHeader isLoggedIn={!!claims} />

<main>
	{@render children()}
</main>

<ToastContainer />

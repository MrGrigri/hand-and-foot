<script lang="ts">
	import { mdiChevronRight, mdiPencilOutline } from '@mdi/js';

	import Icon from '$lib/components/icon/Icon.svelte';
	import type { Games } from '$lib/types/database/games';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const games: Games = $derived<Games>(data.games);
	const tagline: string = $derived<string>(data.tagline);
</script>

<h2>Game Scores</h2>

<div>
	{#if !games || games.length <= 0}
		<p>No games yet?</p>
		<p>{tagline}</p>
		<button type="button">Add New Game</button>
		<a href="/completed">View completed games</a>
	{:else}
		<ul class="games">
			{#each games as game (game.id)}
				<li id={game.id} class="game">
					<p class="title">{game.title}</p>
					<p class="subtitle">
						<time datetime={new Date(game.last_played_at).toDateString()}
							>{new Date(game.last_played_at).toDateString()}</time
						>
					</p>
					<menu class="actions">
						<button class="action" type="button" aria-label="Edit details for Xxxx">
							<Icon path={mdiPencilOutline} />
						</button>
						<a
							class="action"
							href={`/dashboard/${game.id}`}
							aria-label="View more details for Xxxx"
							data-sveltekit-prefetch
						>
							<Icon path={mdiChevronRight} />
						</a>
					</menu>
				</li>
			{/each}
		</ul>
		<button type="button">Add New Game</button>
	{/if}
</div>

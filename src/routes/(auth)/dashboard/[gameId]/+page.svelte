<script lang="ts">
	import type { PageProps } from './$types';
	import { getGame } from '$lib/api/games/get-game.remote';
	import NewGame from './components/NewGame.svelte';

	let { data }: PageProps = $props();
</script>

{#await getGame(data.gameId)}
	<p>Getting data.</p>
{:then gameData}
	{#if !gameData.rounds?.length || !gameData.teams?.length}
		<hgroup>
			<h2>{gameData.game?.title}</h2>
			<p>
				{new Date(gameData.game?.last_played_at).toDateString()} | {gameData.game?.total_teams} teams
			</p>
		</hgroup>
		<NewGame />
	{:else}
		<pre>{JSON.stringify(gameData, null, 2)}</pre>
	{/if}
{/await}

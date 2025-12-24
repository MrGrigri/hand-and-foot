<script lang="ts">
	import type { PageProps } from './$types';

	import { getGame } from '$lib/api/games/get-game.remote';

	import NewRound from './components/NewRound.svelte';

	let { data }: PageProps = $props();

	const getLastPlayedAt = (value: string): string => {
		return new Date(value).toDateString();
	};
</script>

{#await getGame(data.gameId)}
	<p>Getting data.</p>
{:then gameData}
	{@const gameTitle = gameData.game.title}
	{@const lastPlayedAt = getLastPlayedAt(gameData.game.last_played_at)}
	{@const totalTeams = gameData.game.total_teams}
	{@const gameDataString = JSON.stringify(gameData, null, 2)}

	<hgroup>
		<h2>{gameTitle}</h2>
		<p>{lastPlayedAt} | {totalTeams} teams</p>
	</hgroup>

	{#if !gameData.rounds.length || !gameData.teams.length}
		<NewRound gameId={data.gameId} />
	{:else}
		<pre>{gameDataString}</pre>
	{/if}
{/await}

<script lang="ts">
	import { faker } from '@faker-js/faker';
	import { mdiChevronRight } from '@mdi/js';

	import { getGames } from '$lib/api/games/get-games.remote';
	import Icon from '$lib/components/icon/Icon.svelte';
	import { capitalizeAllWords } from '$lib/helpers';
	import NewGameForm from './components/NewGameForm.svelte';

	let dialogElement = $state<HTMLDialogElement>();
	let newGameTitle = $state<string>();

	const handleAddNewGameClick = () => {
		newGameTitle = capitalizeAllWords(`${faker.word.adjective()} ${faker.word.noun()}`);
		dialogElement?.showModal();
	};

	const handleCloseModalClick = (e: MouseEvent & { currentTarget: HTMLButtonElement }) => {
		if (!('command' in e.currentTarget)) {
			dialogElement?.close();
		}
	};

	const getDateString = (date: string): string => new Date(date).toDateString();
</script>

<svelte:head>
	<title>Hand & Foot - Dashboard</title>

	<meta name="description" content="User dashboard for all of their games" />
</svelte:head>

<header aria-label="Current games">
	<h2>Your Games</h2>
	<button type="button" onclick={handleAddNewGameClick}>Add New Game</button>
</header>

{#await getGames()}
	<p>Loading games…</p>
{:then games}
	<div>
		{#if games}
			<ul>
				{#each games as game (game.id)}
					<li>
						<span>{game.title} | </span>
						<span>
							<time datetime={getDateString(game.last_played_at)}
								>{getDateString(game.last_played_at)}</time
							> |
						</span>
						<span>No. Teams: {game.total_teams} |</span>
						<span>Curr. Round: {game.current_round} |</span>
						<a
							href={`/dashboard/${game.id}`}
							aria-label={`View more details for ${game.title}`}
							data-sveltekit-prefetch
						>
							Go to game <Icon path={mdiChevronRight} />
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p>No games yet?!</p>
		{/if}
	</div>
{:catch}
	<p>Failed to load games</p>
{/await}

<dialog id="new_game_dialog" closedby="any" bind:this={dialogElement}>
	<header>
		<p>
			Add new game <button
				onclick={handleCloseModalClick}
				command="close"
				commandfor="new_game_dialog">Close</button
			>
		</p>
	</header>

	<NewGameForm />
</dialog>

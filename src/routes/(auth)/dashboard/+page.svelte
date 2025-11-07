<script lang="ts">
	import { faker } from '@faker-js/faker';
	import { mdiChevronRight } from '@mdi/js';
	import { isHttpError } from '@sveltejs/kit';

	import { getGames } from '$lib/api/games/get-games.remote';
	import Icon from '$lib/components/icon/Icon.svelte';
	import { capitalizeAllWords } from '$lib/helpers';
	import { addToast } from '$lib/stores';
	import { addGame } from '$lib/api/games/add-game.remote';
	import { addGameSchema } from '$lib/schemas/add-game-schema';
	import type { RemoteFormEnhanceCallback } from '$lib/types/utils/enhance-callback';

	let dialogElement = $state<HTMLDialogElement>();
	let newGameTitle = $state<string>();
	let isSubmitting = $state(false);

	let { title, teams } = addGame.fields;

	const handleAddNewGameClick = () => {
		newGameTitle = capitalizeAllWords(`${faker.word.adjective()} ${faker.word.noun()}`);
		dialogElement?.showModal();
	};

	const handleCloseModalClick = () => {
		dialogElement?.close();
	};

	const handleAddNewGameSubmit: RemoteFormEnhanceCallback = async ({ submit }) => {
		try {
			isSubmitting = true;

			await submit();

			addToast('Game added', 'info');

			dialogElement?.close();
		} catch (error) {
			if (isHttpError(error)) {
				addToast(error.body.message, 'error');
			}
		} finally {
			isSubmitting = false;
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
		<ul>
			{#each games as game (game.id)}
				<li>
					<p>{game.title}</p>
					<p>
						<time datetime={getDateString(game.last_played_at)}
							>{getDateString(game.last_played_at)}</time
						>
					</p>
					<p>No. Teams: {game.total_teams}</p>
					<p>Curr. Round: {game.current_round}</p>
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
	</div>
{:catch _err}
	<p>Failed to load games</p>
{/await}

<dialog bind:this={dialogElement}>
	<header>
		<p>Add new game</p>
		<button onclick={handleCloseModalClick}>Close</button>
	</header>
	<form {...addGame.preflight(addGameSchema).enhance(handleAddNewGameSubmit)}>
		<div>
			<label for="title">Game Title</label>
			<input required id="title" {...title.as('text')} placeholder={newGameTitle} />
			{#if title.issues()?.[0]}
				{@const issue = title.issues()?.[0]}
				<p>{issue?.message}</p>
			{/if}
		</div>

		<fieldset>
			<legend>Number of players</legend>

			<div>
				{#each ['2', '3', '4'] as numberOfTeams}
					<input
						id={`${numberOfTeams}_teams`}
						{...teams.as('radio', numberOfTeams)}
						checked={numberOfTeams === '3' || null}
						type="radio"
					/>
					<label for={`${numberOfTeams}_teams`}>{numberOfTeams}</label>
				{/each}
				{#if teams.issues()?.[0]}
					{@const issue = teams.issues()?.[0]}
					<p>{issue?.message}</p>
				{/if}
			</div>
		</fieldset>

		<button type="submit" disabled={isSubmitting ?? null}>Add new game</button>
	</form>
</dialog>

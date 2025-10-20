<script lang="ts">
	import { faker } from '@faker-js/faker';
	import { mdiChevronRight } from '@mdi/js';
	import { isHttpError, type SubmitFunction } from '@sveltejs/kit';

	import { getGames } from '$lib/api/games/get-games.remote';
	import { getRandomTagline } from '$lib/api/taglines/get-random-tagline.remote';
	import Icon from '$lib/components/icon/Icon.svelte';
	import { capitalizeAllWords } from '$lib/helpers';
	import { addToast } from '$lib/stores';
	import { addGame } from '$lib/api/games/add-game.remote';
	import { addGameSchema } from '$lib/schemas/add-game-schema';
	import type { RemoteFormEnhanceCallback } from '$lib/types/utils/enhance-callback';

	let dialogElement = $state<HTMLDialogElement>();
	let newGameTitle = $state<string>();
	let isSubmitting = $state(false);
	let getGamesResponse = getGames();

	let { title, players } = addGame.fields;

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

<div>
	{#if getGamesResponse.error}
		<p>Something went wrong</p>
	{:else if getGamesResponse.loading}
		<p>Loading...</p>
	{:else}
		<ul>
			{#each getGamesResponse.current as game (game.id)}
				<li class="card">
					<p class="title">{game.title}</p>
					<p class="date">
						<time datetime={getDateString(game.last_played_at)}
							>{getDateString(game.last_played_at)}</time
						>
					</p>
					<p class="players">{game.players}</p>
					<p class="round">{game.current_round}</p>
					<a
						class="action"
						href={`/dashboard/${game.id}`}
						aria-label={`View more details for ${game.title}`}
						data-sveltekit-prefetch
					>
						<Icon path={mdiChevronRight} />
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

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
				{#each ['4', '6', '8'] as player}
					<input
						id={`${player}_players`}
						{...players.as('radio', player)}
						checked={player === '6' || null}
						type="radio"
					/>
					<label for={`${player}_players`}>{player}</label>
				{/each}
				{#if players.issues()?.[0]}
					{@const issue = players.issues()?.[0]}
					<p>{issue?.message}</p>
				{/if}
			</div>
		</fieldset>

		<button type="submit" disabled={isSubmitting ?? null}>Add new game</button>
	</form>
</dialog>

<style>
	.card {
		display: grid;
		grid-template-areas:
			'title title title action'
			'date players round action';
		grid-template-columns: auto auto auto auto;
		align-items: center;

		.title {
			grid-area: title;
		}

		.date {
			grid-area: date;
		}

		.players {
			grid-area: players;
		}

		.round {
			grid-area: round;
		}

		.action {
			grid-area: action;
			display: flex;
			align-items: center;
		}
	}
</style>

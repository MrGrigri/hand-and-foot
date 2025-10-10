<script lang="ts">
	import { faker } from '@faker-js/faker';
	import { mdiChevronRight, mdiPencilOutline } from '@mdi/js';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { enhance } from '$app/forms';
	import Icon from '$lib/components/icon/Icon.svelte';
	import { capitalizeAllWords } from '$lib/helpers';
	import { addToast } from '$lib/stores';
	import type { Games } from '$lib/types/database/games';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	let dialogElement = $state<HTMLDialogElement>();
	let newGameTitle = $state<string>();
	let isSubmitting = $state(false);

	const games: Games = $derived<Games>(data.games);
	const tagline: string = $derived<string>(data.tagline);

	const handleAddNewGameClick = () => {
		newGameTitle = capitalizeAllWords(`${faker.word.adjective()} ${faker.word.noun()}`);
		dialogElement?.showModal();
	};

	const handleCloseModalClick = () => {
		dialogElement?.close();
	};

	const handleAddNewGameSubmit: SubmitFunction = ({ cancel }) => {
		isSubmitting = true;

		return async ({ result, update }) => {
			if (result.type === 'failure') {
				isSubmitting = false;
				dialogElement?.close();
				addToast('Something went wrong', 'error');
				return cancel();
			}

			await update();

			isSubmitting = false;
			dialogElement?.close();
		};
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
	{#if !games || games.length <= 0}
		<p>No games yet? {tagline}</p>
	{:else}
		<ul>
			{#each games as game (game.id)}
				<li id={game.id}>
					<p>{game.title}</p>
					<p>
						<time datetime={getDateString(game.last_played_at)}
							>{getDateString(game.last_played_at)}</time
						>
					</p>
					<menu>
						<button type="button" aria-label="Edit details for Xxxx">
							<Icon path={mdiPencilOutline} />
						</button>
						<a
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
	{/if}
</div>

<dialog bind:this={dialogElement}>
	<header>
		<p>Add new game</p>
		<button onclick={handleCloseModalClick}>Close</button>
	</header>
	<form method="POST" use:enhance={handleAddNewGameSubmit}>
		<div>
			<label for="title">Game Title</label>
			<input required id="title" name="title" type="text" placeholder={newGameTitle} />
		</div>

		<fieldset>
			<legend>Number of players</legend>

			<div>
				<input id="4_players" name="players" value="4" type="radio" />
				<label for="4_players">4</label>

				<input id="6_players" name="players" value="6" type="radio" checked />
				<label for="6_players">6</label>

				<input id="8_players" name="players" value="8" type="radio" />
				<label for="8_players">8</label>
			</div>
		</fieldset>

		<button type="submit" disabled={isSubmitting ?? null}>Add new game</button>
	</form>
</dialog>

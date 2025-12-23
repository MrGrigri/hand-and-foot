<script lang="ts">
	import { faker } from '@faker-js/faker';
	import { isHttpError } from '@sveltejs/kit';

	import type { RemoteFormEnhanceCallback } from '$lib/types/utils/enhance-callback';

	import { capitalizeAllWords } from '$lib';
	import { addGame } from '$lib/api/games/add-game.remote';
	import { addGameSchema } from '$lib/schemas/add-game-schema';
	import { addToast } from '$lib/stores';

	import TeamName from './TeamName.svelte';

	let { shouldAutoFocus = true } = $props();

	const MIN_TEAM_COUNT = 2;
	const MAX_TEAM_COUNT = 5;

	const NUMBER_MAP: Record<number, string> = {
		1: 'One',
		2: 'Two',
		3: 'Three',
		4: 'Four',
		5: 'Five'
	} as const;

	const createGameTitle = () =>
		capitalizeAllWords(`${faker.word.adjective()} ${faker.word.noun()}`);
	const createTeamName = () => `${faker.person.firstName()} & ${faker.person.firstName()}`;

	type Team = {
		id: string;
		name: string;
	};

	let teams: Array<Team> = $state<Array<Team>>([
		{ id: crypto.randomUUID(), name: '' },
		{ id: crypto.randomUUID(), name: '' }
	]);
	let isSubmitting = $state(false);

	const addTeam = () => {
		if (teams.length >= MAX_TEAM_COUNT) return;

		teams = [...teams, { id: crypto.randomUUID(), name: '' }];
	};

	const removeTeam = (id: string) => {
		if (teams.length <= MIN_TEAM_COUNT) return;

		teams = [...teams.filter((team) => team.id !== id)];
	};

	const updateTeam = (id: string, name: string) => {
		const teamToUpdate = teams.findIndex((team) => team.id == id);

		if (teamToUpdate === -1) return;

		teams = teams.with(teamToUpdate, { id, name });
	};

	const moveTeamUp = (id: string) => {
		const teamToMoveUpIndex = teams.findIndex((team) => team.id === id);

		if (teamToMoveUpIndex <= 0) return;

		const teamToMoveDownIndex = teamToMoveUpIndex - 1;

		teams = teams
			.with(teamToMoveDownIndex, teams[teamToMoveUpIndex])
			.with(teamToMoveUpIndex, teams[teamToMoveDownIndex]);
	};

	const moveTeamDown = (id: string) => {
		const teamToMoveDownIndex = teams.findIndex((team) => team.id === id);

		if (teamToMoveDownIndex >= teams.length - 1) return;

		const teamToMoveUpIndex = teamToMoveDownIndex + 1;

		teams = teams
			.with(teamToMoveUpIndex, teams[teamToMoveDownIndex])
			.with(teamToMoveDownIndex, teams[teamToMoveUpIndex]);
	};

	const handleAddNewGameSubmit: RemoteFormEnhanceCallback = async ({ form, submit }) => {
		try {
			isSubmitting = true;

			await submit();

			const dialogElement = form.closest('dialog');

			if (dialogElement) {
				dialogElement.close();
			}
		} catch (error) {
			if (isHttpError(error)) {
				addToast(error.body.message, 'error');
			}
		} finally {
			isSubmitting = false;
		}
	};
</script>

<form {...addGame.preflight(addGameSchema).enhance(handleAddNewGameSubmit)}>
	<div>
		<label for="title">Game title</label>
		<!-- svelte-ignore a11y_autofocus -->
		<input
			id="title"
			type="text"
			placeholder={createGameTitle()}
			autofocus={shouldAutoFocus}
			name="title"
		/>
	</div>

	<fieldset name="teams">
		<legend>Team names</legend>

		<p>Sweet spot is three teams...five is just too much.</p>

		<div class="teams">
			{#each teams as { id, name }, idx (id)}
				{@const isFirst = idx === 0}
				{@const isSecond = idx === 1}
				{@const isLast = idx === teams.length - 1}
				{@const labelText = `Team ${NUMBER_MAP[idx + 1]}`}
				{@const teamName = createTeamName()}
				{@const inputNameBase = `teams[${idx}]`}

				<TeamName
					disableDeleteButton={isFirst || isSecond}
					disableDownButton={isLast}
					disableUpButton={isFirst}
					{labelText}
					inputName={`${inputNameBase}.name`}
					inputId={id}
					inputValue={name}
					inputPlaceholder={teamName}
					handleDeleteTeam={removeTeam}
					handleUpdateTeam={updateTeam}
					handleMoveUp={moveTeamUp}
					handleMoveDown={moveTeamDown}
				/>
			{/each}
		</div>

		<button
			type="button"
			disabled={teams.length >= MAX_TEAM_COUNT || teams.length < MIN_TEAM_COUNT}
			onclick={addTeam}>Add New Team</button
		>
	</fieldset>

	<button type="submit" disabled={isSubmitting ?? null}>
		{#if isSubmitting}
			<span>Adding new game...</span>
		{:else}
			<span>Add new game</span>
		{/if}
	</button>
</form>

<style lang="postcss">
	:global {
		@scope (.teams) {
			:scope {
				display: grid;
				grid-template-columns: auto auto auto 1fr auto;
				align-items: stretch;
				gap: 0.5rem;
				padding-block: 1rem;
			}

			.team {
				display: grid;
				grid-template-columns: subgrid;
				grid-column: 1 / 6;
			}

			.team__label {
				align-self: center;
				justify-self: end;
			}
		}
	}
</style>

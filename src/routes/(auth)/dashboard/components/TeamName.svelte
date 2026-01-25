<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import { mdiArrowDown, mdiArrowUp, mdiTrashCanOutline } from '@mdi/js';

	type TeamNameProps = {
		disableDeleteButton: boolean;
		disableDownButton: boolean;
		disableUpButton: boolean;
		handleDeleteTeam: (id: string) => void;
		handleMoveDown: (id: string) => void;
		handleMoveUp: (id: string) => void;
		handleUpdateTeam: (id: string, name: string) => void;
		inputId: string;
		inputName: string;
		inputPlaceholder: string;
		inputValue: string;
		labelText: string;
	};

	let {
		disableDeleteButton = false,
		disableDownButton = false,
		disableUpButton = false,
		handleDeleteTeam,
		handleMoveDown,
		handleMoveUp,
		handleUpdateTeam,
		inputId,
		inputName,
		inputPlaceholder,
		inputValue,
		labelText
	}: TeamNameProps = $props();
</script>

<div>
	<button
		type="button"
		aria-label={`Move ${labelText} up`}
		disabled={disableUpButton}
		aria-disabled={disableUpButton}
		onclick={() => handleMoveUp(inputId)}
	>
		<Icon path={mdiArrowUp} />
	</button>

	<button
		type="button"
		aria-label={`Move ${labelText} down`}
		disabled={disableDownButton}
		aria-disabled={disableDownButton}
		onclick={() => handleMoveDown(inputId)}
	>
		<Icon path={mdiArrowDown} />
	</button>

	<label for={inputId}>{labelText}</label>
	<input
		id={inputId}
		type="text"
		name={inputName}
		placeholder={inputPlaceholder}
		bind:value={inputValue}
		oninput={() => handleUpdateTeam(inputId, inputValue)}
	/>

	<button
		type="button"
		aria-label={`Remove ${labelText} team`}
		disabled={disableDeleteButton}
		aria-disabled={disableDeleteButton}
		onclick={() => handleDeleteTeam(inputId)}
	>
		<Icon path={mdiTrashCanOutline} />
	</button>
</div>

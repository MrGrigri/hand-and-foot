<script lang="ts">
	import { addRound } from '$lib/api/rounds/add-round.remote';
	import { addRoundSchema } from '$lib/schemas/add-round-schema';

	let { gameId } = $props();
</script>

<p>Start a new round.</p>
<form {...addRound.preflight(addRoundSchema)}>
	<button type="submit" name="id" value={gameId}>New Round</button>
</form>

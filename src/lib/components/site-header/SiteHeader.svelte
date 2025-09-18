<script lang="ts">
	let { isLoggedIn = false } = $props();
</script>

<header>
	<h1>Hand & Foot</h1>

	<menu>
		<ul>
			<li><a href="/how-to">Help</a></li>
			{#if isLoggedIn}
				<li>
					<a href="/dashboard">Dashboard</a>
				</li>
				<li>
					<form action="/auth?/logout" method="POST">
						<button type="submit">Logout</button>
					</form>
				</li>
			{/if}
		</ul>
	</menu>
</header>

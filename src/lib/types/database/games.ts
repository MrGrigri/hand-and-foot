export type Game = {
	created_at: string;
	current_round: string;
	id: string;
	last_played_at: string;
	owner_id: string;
	title: string;
	total_teams: string;
};

export type Games = Array<Game>;

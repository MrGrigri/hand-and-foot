export type Game = {
	id: string;
	created_at: string;
	title: string;
	owner_id: string;
	last_played_at: string;
	num_players: string;
	current_round: string;
};

export type Games = Array<Game>;

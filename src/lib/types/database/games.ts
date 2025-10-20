export type Game = {
	created_at: string;
	current_round: string;
	id: string;
	last_played_at: string;
	players: string;
	owner_id: string;
	title: string;
};

export type Games = Array<Game>;

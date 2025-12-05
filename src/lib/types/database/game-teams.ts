export type GameTeam = {
	id: string;
	game_id: string;
	team_name: string;
	total_score: number;
	order: number;
};

export type GameTeams = Array<GameTeam>;

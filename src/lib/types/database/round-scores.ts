export type RoundScore = {
	id: string;
	game_id: string;
	game_team_id: string;
	round_number: number;
	points_from_books: number;
	going_out_bonus: number;
	loss_penalty: number;
	bones: number;
	round_total_score: number;
};

export type RoundScores = Array<RoundScore>;

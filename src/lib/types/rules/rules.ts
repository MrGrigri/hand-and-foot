export type Rule = {
	errorDescription: string;
	key: string;
	regex: RegExp;
};

export type Rules = Array<Rule>;

export type ValidateRulesResponse = { errors: Array<string>; progress: number };

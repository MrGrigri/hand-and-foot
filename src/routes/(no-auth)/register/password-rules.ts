import type { Rules, ValidateRulesResponse } from '$lib/types/rules/rules';

export const validateRules = (value: string, rules: Rules): ValidateRulesResponse => {
	let errors: Array<string> = [];
	let progress: number = rules.length;

	for (let i = 0; i < rules.length; i++) {
		const rule = rules[i];

		if (!rule.regex.test(value)) {
			errors = [...errors, rule.key];
			--progress;
		}
	}

	return { errors, progress };
};

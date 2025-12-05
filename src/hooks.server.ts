import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { authGuardHandle, supabaseHandle } from '$lib';

export const handle: Handle = sequence(supabaseHandle, authGuardHandle);

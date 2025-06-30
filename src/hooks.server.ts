import { authGuardHandle, supabaseHandle } from '$lib';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = sequence(supabaseHandle, authGuardHandle);

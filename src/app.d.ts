// See https://svelte.dev/docs/kit/types#app.d.ts

import type { JwtPayload, Session, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types.ts';

type Nullish<T> = T | null | undefined;

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			supabase: SupabaseClient<Database, any, GenericSchema>;
			safeGetSession: () => Promise<{ session: Nullish<Session>; claims: Nullish<JwtPayload> }>;
			session: Nullish<Session>;
			claims: Nullish<JwtPayload>;
		}
		interface PageData {
			claims: Nullish<JwtPayload>;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { Database } from './database.types.ts';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			supabase: SupabaseClient<Database, any, GenericSchema>;
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
			session: Session | null;
			user: User | null;
		}
		interface PageData {
			session: Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

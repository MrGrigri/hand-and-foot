import type { RemoteForm } from '@sveltejs/kit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RemoteFormEnhanceCallback = Parameters<RemoteForm<any, any>['enhance']>[0];

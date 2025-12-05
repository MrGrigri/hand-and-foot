/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RemoteForm, RemoteFormInput } from '@sveltejs/kit';

export type RemoteFormEnhanceCallback = Parameters<RemoteForm<RemoteFormInput, any>['enhance']>[0];

export type EnhanceCallback<ExtendedForm extends RemoteForm<RemoteFormInput | void, any>> =
	Parameters<ExtendedForm['enhance']>[0];

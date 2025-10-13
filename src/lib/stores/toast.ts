import {
	mdiAlertOutline,
	mdiAlertRhombusOutline,
	mdiHelpCircleOutline,
	mdiInformationSlabCircleOutline
} from '@mdi/js';

import type {
	AddToastFunction,
	GetToastIconFunction,
	RemoveToastFunction,
	Toast
} from '$lib/types/toast/toast';

import { SvelteMap } from 'svelte/reactivity';

export const toasts = new SvelteMap<string, Toast>();
export const timeoutIds = new SvelteMap<string, number>();

export const addToast: AddToastFunction = (message, type = 'default', delay = 3000) => {
	const toastId = window.crypto.randomUUID();

	toasts.set(toastId, {
		id: toastId,
		message,
		type
	});
	timeoutIds.set(
		toastId,
		window.setTimeout(() => removeToast(toastId), delay)
	);
};

export const removeToast: RemoveToastFunction = (toastId) => {
	toasts.delete(toastId);
	timeoutIds.delete(toastId);

	window.clearTimeout(timeoutIds.get(toastId));

	return toastId;
};

export const removeAllToasts = (): void => {
	toasts.forEach((toast) => toasts.delete(toast.id));
};

export const getToastIcon: GetToastIconFunction = (type) => {
	return {
		default: mdiHelpCircleOutline,
		info: mdiInformationSlabCircleOutline,
		warning: mdiAlertRhombusOutline,
		error: mdiAlertOutline
	}[type];
};

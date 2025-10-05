import {
	mdiHelpCircleOutline,
	mdiInformationSlabCircleOutline,
	mdiAlertRhombusOutline,
	mdiAlertOutline
} from '@mdi/js';
import { SvelteMap } from 'svelte/reactivity';

export type ToastTypes = 'default' | 'info' | 'warning' | 'error';
export type Toast = {
	id: string;
	message: string;
	type: ToastTypes;
};
export type AddToastFunction = (message: string, type?: ToastTypes, delay?: number) => void;
export type RemoveToastFunction = (toastId: string) => string;
export type GetToastIconFunction = (type: ToastTypes) => string;

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

export const getToastIcon: GetToastIconFunction = (type) => {
	return {
		default: mdiHelpCircleOutline,
		info: mdiInformationSlabCircleOutline,
		warning: mdiAlertRhombusOutline,
		error: mdiAlertOutline
	}[type];
};

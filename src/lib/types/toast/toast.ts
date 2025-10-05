export type ToastTypes = 'default' | 'error' | 'info' | 'warning';

export type Toast = {
	id: string;
	message: string;
	type: ToastTypes;
};

export type AddToastFunction = (message: string, type?: ToastTypes, delay?: number) => void;

export type RemoveToastFunction = (toastId: string) => string;

export type GetToastIconFunction = (type: ToastTypes) => string;

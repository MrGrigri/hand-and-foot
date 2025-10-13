export type InputEvent<T> = Event & { currentTarget: EventTarget & T };

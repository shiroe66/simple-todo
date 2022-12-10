import { createEffect, createEvent, Effect } from 'effector';

const $event = createEffect<string, string>((param: string) => {
  return 'string';
});

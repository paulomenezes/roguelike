import { MOVE } from '../types';

export const move = (name, dx, dy) => ({
  type: MOVE,
  name,
  dx,
  dy,
});

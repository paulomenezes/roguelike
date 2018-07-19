import { MOVE } from '../types';

const initialState = {
  player: {
    x: 0,
    y: 0,
    char: '@',
    color: 'white',
  },
  npc: {
    x: 20,
    y: 20,
    char: '@',
    color: 'yellow',
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MOVE:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          x: state[action.name].x + action.dx,
          y: state[action.name].y + action.dy,
        },
      };
    default:
      return state;
  }
}

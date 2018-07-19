import { SET_MAP } from '../types';

const initialState = {
  game: {
    width: 80,
    height: 50,
  },
  map: {
    width: 80,
    height: 45,
    fovRadius: 10,
    tiles: [],
    fov: [],
  },
  room: {
    maxSize: 10,
    minSize: 6,
    maxRooms: 30,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MAP:
      return {
        ...state,
        map: {
          ...state.map,
          tiles: action.tiles,
        },
      };
    default:
      return state;
  }
}

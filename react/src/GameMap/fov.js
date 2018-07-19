import Tile from '../GameMap/Tile';

export const initializeFov = ({ game }) => {
  const tiles = [];
  for (let y = 0; y < game.height; y++) {
    const column = [];
    for (let x = 0; x < game.width; x++) {
      column.push(new Tile(true));
    }

    tiles.push(column);
  }
};

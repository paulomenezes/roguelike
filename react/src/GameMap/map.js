import _ from 'lodash';

import Tile from '../GameMap/Tile';
import Rect from './Rect';

export const generateTiles = ({ game, room, map }) => {
  const tiles = [];
  for (let y = 0; y < game.height; y++) {
    const column = [];
    for (let x = 0; x < game.width; x++) {
      column.push(new Tile(true));
    }

    tiles.push(column);
  }

  const rooms = [];
  let numRooms = 0;

  const playerPosition = {
    x: 0,
    y: 0,
  };

  for (let i = 0; i < room.maxRooms; i++) {
    const w = _.random(room.minSize, room.maxSize);
    const h = _.random(room.minSize, room.maxSize);

    const x = _.random(0, map.width - w - 1);
    const y = _.random(0, map.height - h - 1);

    const newRoom = new Rect(x, y, w, h);

    let intersects = false;
    for (let j = 0; j < rooms.length; j++) {
      if (newRoom.intersect(rooms[j])) {
        intersects = true;
        break;
      }
    }

    if (!intersects) {
      createRoom(tiles, newRoom);

      const [newX, newY] = newRoom.center();

      if (numRooms === 0) {
        playerPosition.x = newX;
        playerPosition.y = newY;
      } else {
        const [prevX, prevY] = rooms[numRooms - 1].center();

        if (_.range(0, 1) === 1) {
          createHTunnel(tiles, prevX, newX, prevY);
          createVTunnel(tiles, prevY, newY, newX);
        } else {
          createVTunnel(tiles, prevY, newY, prevX);
          createHTunnel(tiles, prevX, newX, newY);
        }
      }

      rooms.push(newRoom);
      numRooms += 1;
    }
  }

  calculateFOV(tiles, playerPosition);

  return { tiles, playerPosition };
};

export const calculateFOV = (tiles, playerPosition) => {
  const from = playerPosition;
  const to = [];

  for (let y = playerPosition.y - 5; y <= playerPosition.y + 5; y++) {
    for (let x = playerPosition.x - 5; x <= playerPosition.x + 5; x++) {
      const d = distance(playerPosition.x, playerPosition.y, x, y);

      if (d === 5 && y >= 0 && x >= 0) {
        to.push({
          x,
          y,
        });

        // tiles[y][x].explored = true;
        const deltaX = playerPosition.x - x;
        const deltaY = playerPosition.y - y;

        if (deltaX === 0 && Math.abs(deltaY) === 5) {
          to.push({ y, x: x - 1 });
          to.push({ y, x: x + 1 });

          to.push({ y: y + Math.sign(deltaY), x: x - 2 });
          to.push({ y: y + Math.sign(deltaY), x: x + 2 });
        } else if (Math.abs(deltaX) === 5 && deltaY === 0) {
          to.push({ y: y - 1, x });
          to.push({ y: y + 1, x });

          to.push({ y: y - 2, x: x + Math.sign(deltaX) });
          to.push({ y: y + 2, x: x + Math.sign(deltaX) });
        }
      }
    }
  }

  console.log(from, to);
  for (let index = 0; index < to.length; index++) {
    const el = to[index];
    let k = 0;
    let startX = from.x;
    let startY = from.y;

    while (k < 5) {
      tiles[startY][startX].explored = true;

      if (startX > el.x) {
        startX--;
      }
      if (startY > el.y) {
        startY--;
      }
      if (startX < el.x) {
        startX++;
      }
      if (startY < el.y) {
        startY++;
      }

      if (tiles[startY][startX].blockSight) {
        break;
      }

      k++;
    }
  }
};

const distance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

const createRoom = (tiles, room) => {
  for (let x = room.x1 + 1; x < room.x2; x++) {
    for (let y = room.y1 + 1; y < room.y2; y++) {
      tiles[y][x].blocked = false;
      tiles[y][x].blockSight = false;
    }
  }
};

const createHTunnel = (tiles, x1, x2, y) => {
  for (let x = Math.min(x1, x2); x < Math.max(x1, x2) + 1; x++) {
    tiles[y][x].blocked = false;
    tiles[y][x].blockSight = false;
  }
};

const createVTunnel = (tiles, y1, y2, x) => {
  for (let y = Math.min(y1, y2); y < Math.max(y1, y2) + 1; y++) {
    tiles[y][x].blocked = false;
    tiles[y][x].blockSight = false;
  }
};

export const isBlocked = (tiles, x, y) => {
  return tiles[y][x].blocked;
};

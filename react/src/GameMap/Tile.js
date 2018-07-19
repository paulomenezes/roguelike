export default class Tile {
  constructor(blocked, blockSight) {
    this.blocked = blocked;

    if (blockSight === undefined) {
      blockSight = this.blocked;
    }

    this.blockSight = blockSight;
    this.explored = false;
  }
}

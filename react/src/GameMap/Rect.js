export default class Rect {
  constructor(x, y, w, h) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = x + w;
    this.y2 = y + h;
  }

  center = () => {
    const x = parseInt((this.x1 + this.x2) / 2, 10);
    const y = parseInt((this.y1 + this.y2) / 2, 10);
    return [x, y];
  };

  intersect = other => {
    return (
      this.x1 <= other.x2 &&
      this.x2 >= other.x1 &&
      this.y1 <= other.y2 &&
      this.y2 >= other.y1
    );
  };
}

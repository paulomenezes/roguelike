export const setInputs = callback => {
  window.addEventListener('keydown', event => {
    let dx = 0;
    let dy = 0;

    switch (event.key) {
      case 'ArrowUp':
        dy--;
        break;
      case 'ArrowDown':
        dy++;
        break;
      case 'ArrowLeft':
        dx--;
        break;
      case 'ArrowRight':
        dx++;
        break;
      default:
        dx = 0;
        dy = 0;
        break;
    }

    callback('move', dx, dy);
  });
};

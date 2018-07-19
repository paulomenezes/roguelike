import React from 'react';

import Entity from '../Entity/Entity';

export const renderMap = tile => {
  return (
    <div
      className={`tile ${tile.blockSight ? 'wall' : 'ground'} ${tile.explored &&
        'explored'}`}
    />
  );
};

export const renderEntities = (entities, x, y) => {
  return Object.keys(entities).map((key, i) => {
    const entity = entities[key];

    return (
      x === entity.x &&
      y === entity.y && (
        <Entity key={key} name={key} char={entity.char} color={entity.color} />
      )
    );
  });
};

export const renderCell = (row, y, entities) => {
  return row.map((tile, x) => (
    <div key={`${x}-${y}`} className="cel">
      {renderMap(tile)}
      {renderEntities(entities, x, y)}
    </div>
  ));
};

export const renderRow = (map, entities) => {
  return map.tiles.map((row, y) => (
    <div className="row" key={y}>
      {renderCell(row, y, entities)}
    </div>
  ));
};

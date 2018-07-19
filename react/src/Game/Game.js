import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Game.css';

import { move } from '../Entity/actions';
import { setMap } from './actions';

import { renderRow } from './render';
import { setInputs } from './inputs';
import { generateTiles, isBlocked, calculateFOV } from '../GameMap/map';

class Game extends Component {
  componentWillMount() {
    const { tiles, playerPosition } = generateTiles(this.props.game);
    this.props.setMap(tiles);
    this.props.move('player', playerPosition.x, playerPosition.y);

    setInputs((type, dx, dy) => {
      if (type === 'move') {
        const player = this.props.entities.player;
        if (!isBlocked(this.props.game.map.tiles, player.x + dx, player.y + dy)) {
          this.props.move('player', dx, dy);

          calculateFOV(this.props.game.map.tiles, {
            x: player.x + dx,
            y: player.y + dy,
          });
        }
      }
    });
  }

  render() {
    return <div>{renderRow(this.props.game.map, this.props.entities)}</div>;
  }
}

const mapStateToProps = state => ({
  game: state.game,
  entities: state.entities,
});

const mapDispatchToProps = dispatch => ({
  move: (name, dx, dy) => dispatch(move(name, dx, dy)),
  setMap: tiles => dispatch(setMap(tiles)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

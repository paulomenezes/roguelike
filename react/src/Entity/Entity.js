import React, { Component } from 'react';

class Entity extends Component {
  render() {
    return (
      <div className={`entity ${this.props.name}`} style={{ color: this.props.color }}>
        {this.props.char}
      </div>
    );
  }
}

export default Entity;

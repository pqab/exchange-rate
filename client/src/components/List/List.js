import React, { Component } from 'react';

import './List.css';

export default class List extends Component {
  render() {
    return (
      <ul className={`list ${this.props.onClick && 'click'}`}>
        {
          this.props.items && Object.keys(this.props.items).map((item) =>
            <li key={`${this.props.id}-list-${item}`} title={this.props.items[item]} data-value={item} onClick={this.props.onClick && (() => this.props.onClick(item))}>
              <span className="key">{item}</span>
              <span className="value">{this.props.items[item]}</span>
            </li>
          )
        }
      </ul>
    );
  }
}

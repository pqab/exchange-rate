import React, { Component } from 'react';

import './Select.css';

export default class Select extends Component {
  render() {
    return (
      <div>
        <p className="name">{this.props.name}</p>
        {this.props.type === 'text' &&
          <div className="container">
            <input list={this.props.id} onInput={this.props.onInput && ((e) => this.props.onInput(e))} />
            <datalist id={this.props.id} className="select">
              {
                this.props.options && Object.keys(this.props.options).map((option) =>
                  <option key={`${this.props.id}-option-${option}`} value={option} title={this.props.options[option]}>{option}</option>
                )
              }
            </datalist>
            {
              this.props.selects && this.props.selects.map((select) =>
                <span key={`${this.props.id}-select-${select}`} className="select" onClick={() => this.props.onClick(this.props.name, select)}>{select}</span>
              )
            }
          </div>
        }
        {this.props.type === 'date' &&
          <div className="container">
            <input type="date" onInput={this.props.onInput && ((e) => this.props.onInput(e))} max={this.props.max} />
          </div>
        }
      </div>
    );
  }
}

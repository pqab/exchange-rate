import React, { Component } from 'react';

import './App.css';
import config from './config/config';

import List from './components/List/List';
import Select from './components/Select/Select';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: [],
      currencies: {},
      date: '',
      rates: [],
      target: []
    };
  }
  componentDidMount() {
    this.fetchData(`${config.apiUrl}currency`, 'currencies');
  }
  handleBase(data) {
    const text = (typeof data === 'string'? data : data.target.value).toUpperCase();
    if (this.state.base.includes(text) || !this.state.currencies[text])
      return false;
    this.setState(prevState => {
      return {
        base: [text],
        target: prevState.target.filter(value => {
          return text !== value
        }).concat(typeof data === 'string'? prevState.base : [])
      }
    })
    this.fetchData(`${config.apiUrl}rate/${this.state.date? `historical/${this.state.date}` : 'latest'}?base=${text}`, 'rates');
    if (typeof data !== 'string')
      data.target.value = '';
  }
  handleTarget(e) {
    const text = e.target.value.toUpperCase();
    if (this.state.target.includes(text) || !this.state.currencies[text])
      return;
    this.setState(prevState => {
      return {
        target: text? prevState.target.concat([text]) : []
      }
    })
    e.target.value = '';
  }
  handleRemove(name, key) {
    name = name.toLowerCase();
    if (!this.state[name])
      return;
    this.setState(prevState => {
      return {
        [name]: prevState[name].filter(value => {
          return key !== value
        })
      }
    })
  }
  handleDate(e) {
    var date = e.target.value;
    if (date)
      date = this.formatDate(new Date(date));
    this.setState({
      date: date
    })
    if (this.state.base.length > 0)
      this.fetchData(`${config.apiUrl}rate/${date? `historical/${date}` : 'latest'}?base=${this.state.base[0]}`, 'rates');
  }
  filterTarget(obj) {
    if (this.state.target.length === 0)
      return obj;
    return Object.keys(obj)
                .filter(key => this.state.target.includes(key))
                .reduce((res, key) => {
                  res[key] = obj[key]
                  return res;
                }, {});
  }
  fetchData(apiUrl, key) {
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            [key]: result
          });
        },
        (err) => {
          console.log(err)
          this.setState({
            err
          });
        }
      )
  }
  formatDate(date) {
    var dd = date.getDate(),
        mm = date.getMonth() + 1,
        yyyy = date.getFullYear();
    dd = `0${dd}`.slice(`0${dd}`.length - 2);
    mm = `0${mm}`.slice(`0${mm}`.length - 2);
    return `${yyyy}-${mm}-${dd}`;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Exchange Rate</h1>
        </header>
        <div className="App-main">
          <Select id="base" name="Base" type="text" onInput={this.handleBase.bind(this)} onClick={this.handleRemove.bind(this)} options={this.state.currencies} selects={this.state.base} />
          <Select id="target" name="Target" type="text" onInput={this.handleTarget.bind(this)} onClick={this.handleRemove.bind(this)} options={this.state.currencies} selects={this.state.target} />
          <Select id="date" name="Date" type="date" onInput={this.handleDate.bind(this)} max={this.formatDate(new Date())} />
          <List id="list" items={this.state.base.length > 0? this.filterTarget(this.state.rates) : this.state.currencies} onClick={this.handleBase.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;

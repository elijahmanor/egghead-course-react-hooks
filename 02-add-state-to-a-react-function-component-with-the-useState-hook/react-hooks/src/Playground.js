import React, { Component } from "react";

export default class Playground extends Component {
  constructor(...args) {
    super(...args);
    this.state = { text: "", checked: false };
  }
  render() {
    const { text, checked } = this.state;
    return (
      <section>
        <input
          type="text"
          value={text}
          onChange={e => this.setState({ text: e.target.value })}
        />
        <input
          type="checkbox"
          checked={checked}
          onChange={e => this.setState({ checked: e.target.checked })}
        />
        <ul>
          <li>{text}</li>
          <li>{checked.toString()}</li>
        </ul>
      </section>
    );
  }
}

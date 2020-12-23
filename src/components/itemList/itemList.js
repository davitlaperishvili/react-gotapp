import React, { Component } from "react";
import "./itemList.css";

import gotServices from "../../services/gotServices";
export default class ItemList extends Component {
  gotServices = new gotServices();
  state = {
    charList: null
  };
  componentDidMount() {
    this.gotServices.getAllCharacters().then(charList => {
      this.setState({
        charList
      });
    });
  }
  renderItem(arr) {
    return arr.map((item, i) => {
      return (
        <li
          key={i}
          className="list-group-item"
          onClick={() => this.props.onCharSelected( 41 + i)}
        >
          {item.name}
        </li>
      );
    });
  }
  render() {
    const { charList } = this.state;
    if (!charList) {
      return <span> Loading... </span>;
    }
    const items = this.renderItem(charList);
    return <ul className="item-list list-group">{items}</ul>;
  }
}

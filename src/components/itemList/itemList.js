import React, { Component } from "react";
import "./itemList.css";

export default class ItemList extends Component {
  state = {
    itemList: null
  };
  componentDidMount() {
    const { getData } = this.props;
    getData().then(itemList => {
      this.setState({
        itemList
      });
    });
  }
  renderItem(arr) {
    return arr.map((item, i) => {
      return (
        <li
          key={i}
          className="list-group-item"
          onClick={() => this.props.onCharSelected(41 + i)}
        >
          {item.name}
        </li>
      );
    });
  }
  render() {
    const { itemList } = this.state;
    if (!itemList) {
      return <span> Loading... </span>;
    }
    const items = this.renderItem(itemList);
    return <ul className="item-list list-group">{items}</ul>;
  }
}

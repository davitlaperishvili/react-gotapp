import React, { Component } from "react";
import "./itemDetails.css";
import gotServices from "../../services/gotServices";

const Field = ({ item, field, label }) => {
  const fieldLabel =
    item[field] && item[field] != "" ? item[field] : "no data :(";
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{fieldLabel}</span>
    </li>
  );
};

export { Field };

export default class ItemDetails extends Component {
  gotServices = new gotServices();
  state = {
    item: null
  };
  componentDidMount() {
    this.updateItem();
  }
  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }
  updateItem() {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }
    getData(itemId).then(item => {
      this.setState({ item });
    });
  }
  render() {
    if (!this.state.item) {
      return <span> Please select a charactor </span>;
    }
    const { item } = this.state;
    const { name } = this.state.item;
    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, child => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </div>
    );
  }
}

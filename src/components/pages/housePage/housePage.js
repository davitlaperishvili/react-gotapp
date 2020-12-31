import React, { Component } from "react";
import ItemList from "../../itemList";
import ItemDetails, { Field } from "../../itemDetails";
import ErrorMessage from "../../errorMessage";
import gotServices from "../../../services/gotServices";
import RowBlock from "../../rowBlock";

export default class HousePage extends Component {
  gotServices = new gotServices();
  state = {
    selectedHouse: 1,
    error: false
  };

  onItemSelected = id => {
    this.setState({
      selectedHouse: id
    });
  };
  componentDidCatch() {
    this.setState({
      error: true
    });
  }
  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }
    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotServices.getAllHouses}
        renderItem={({ name }) => `${name}`}
        itemCount={1}
      />
    );
    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedHouse}
        getData={this.gotServices.getHouse}
      >
        <Field field="region" label="Region" />
        <Field field="titles" label="Titles" />
        <Field field="words" label="Words" />
        <Field field="ancestralWeapons" label="Ancestral Weapons" />
      </ItemDetails>
    );
    return <RowBlock left={itemList} right={itemDetails} />;
  }
}

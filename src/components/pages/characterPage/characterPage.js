import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import ItemList from "../../itemList";
import ItemDetails, { Field } from "../../itemDetails";
import ErrorMessage from "../../errorMessage";
import gotServices from "../../../services/gotServices";
import RowBlock from "../../rowBlock";

export default class CharacterPage extends Component {
  gotServices = new gotServices();
  state = {
    selectedChar: 130,
    error: false
  };

  onItemSelected = id => {
    this.setState({
      selectedChar: id
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
        getData={this.gotServices.getAllCharacters}
        renderItem={({ name, gender }) => `${name} (${gender})`}
        itemCount={41}
      />
    );
    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedChar}
        getData={this.gotServices.getCharacter}
      >
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
        <Field field="died" label="Died" />
        <Field field="culture" label="Culture" />
      </ItemDetails>
    );
    return <RowBlock left={itemList} right={itemDetails} />;
  }
}

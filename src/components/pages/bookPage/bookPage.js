import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import ItemList from "../../itemList";
import ItemDetails, { Field } from "../../itemDetails";
import ErrorMessage from "../../errorMessage";
import gotServices from "../../../services/gotServices";
import RowBlock from "../../rowBlock";

export default class BookPage extends Component {
  gotServices = new gotServices();
  state = {
    selectedBook: 1,
    error: false
  };

  onItemSelected = id => {
    this.setState({
      selectedBook: id
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
        getData={this.gotServices.getAllBooks}
        renderItem={({ name }) => `${name}`}
        itemCount={1}
      />
    );
    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedBook}
        getData={this.gotServices.getBook}
      >
        <Field field="numberOfPages" label="Number of pages" />
        <Field field="publiser" label="Publiser" />
        <Field field="released" label="Released" />
      </ItemDetails>
    );
    return <RowBlock left={itemList} right={itemDetails} />;
  }
}

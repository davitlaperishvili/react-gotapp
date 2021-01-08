import React, { Component } from "react";
import gotServices from "../../../services/gotServices";
import ItemDetails, { Field } from "../../itemDetails";
import "./bookPage.css";
import { withRouter } from "react-router-dom";

class BookItem extends Component {
  gotServices = new gotServices();

  render() {
    return (
      <ItemDetails
        itemId={this.props.bookId}
        getData={this.gotServices.getBook}
      >
        <Field field="numberOfPages" label="Number of pages" />
        <Field field="publiser" label="Publiser" />
        <Field field="released" label="Released" />
        <button
          className="go-back"
          onClick={() => {
            this.props.history.push(`/books/`);
          }}
        >
          {" "}
          Go back{" "}
        </button>
      </ItemDetails>
    );
  }
}
export default withRouter(BookItem);

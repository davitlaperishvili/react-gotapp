import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import CharacterPage from "../characterPage";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import gotServices from "../../services/gotServices";
import "./app.css";

export default class App extends Component {
  gotServices = new gotServices();
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      error: false
    };
    this.hideChar = () => {
      this.setState(({ display }) => ({
        display: !display
      }));
    };
  }
  componentDidCatch() {
    this.setState({
      error: true
    });
  }
  render() {
    const { display } = this.state;
    const displayChar = display ? <RandomChar /> : null;
    if (this.state.error) {
      return <ErrorMessage />;
    }
    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              {displayChar}
              <button className="char_button" onClick={this.hideChar}>
                {" "}
                Button{" "}
              </button>
            </Col>
          </Row>
          <CharacterPage />
          <Row>
            <Col md="6">
              <ItemList
                onCharSelected={this.onCharSelected}
                getData={this.gotServices.getAllBooks}
              />
            </Col>
            <Col md="6">
              <CharDetails charId={this.state.selectedChar} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import CharacterPage from "../characterPage";
import "./app.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    };
    this.hideChar = () => {
      this.setState(({ display }) => ({
        display: !display
      }));
    };
  }
  render() {
    const { display, selectedChar } = this.state;
    const displayChar = display ? <RandomChar /> : null;
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
          <CharactedPage />
        </Container>
      </>
    );
  }
}

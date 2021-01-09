import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import CharacterPage from "../pages/characterPage";
import BookPage from "../pages/bookPage";
import BookItem from "../pages/bookPage/bookItem";
import HousePage from "../pages/housePage";
import gotServices from "../../services/gotServices";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
      <Router>
        <div className="app">
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 5, offset: 0 }}>
                {displayChar}
                <button className="char_button" onClick={this.hideChar}>
                  Toggle Random Character
                </button>
              </Col>
            </Row>
            <Route path="/characters/" component={CharacterPage} />
            <Route path="/houses/" component={HousePage} />
            <Route path="/books/" exact component={BookPage} />
            <Route
              path="/books/:id"
              exact
              render={({ match }) => {
                const { id } = match.params;
                return <BookItem bookId={id} />;
              }}
            />
          </Container>
        </div>
      </Router>
    );
  }
}

// <Row>
//     <Col md="6">
//       <ItemList
//         onItemSelected={this.onItemSelected}
//         getData={this.gotServices.getAllBooks}
//       />
//     </Col>
//     <Col md="6">
//       <CharDetails charId={this.state.selectedChar} />
//     </Col>
//   </Row>

import React, { Component } from "react";
import "./randomChar.css";
import gotServices from "../../services/gotServices";
import ErrorMessage from "../errorMessage";

export default class RandomChar extends Component {
  gotServices = new gotServices();
  state = {
    char: {},
    loading: true,
    error: false
  };
  componentDidMount() {
    this.updateChar();
    this.timerId = setInterval(this.updateChar, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onCharLoaded = char => {
    this.setState({
      char,
      loading: false,
      error: false
    });
  };
  onError = err => {
    this.setState({
      error: true,
      loading: false
    });
  };
  updateChar = () => {
    const id = Math.floor(Math.random() * 240 + 25); //25 - 140
    //const id = 1300000;
    this.gotServices
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };
  render() {
    const { char, loading, error } = this.state;
    const content = !(loading || error) ? <View char={char} /> : null;
    const loadingContent = loading ? "Loading..." : null;
    const errorContent = error ? <ErrorMessage /> : null;
    return (
      <div className="random-block rounded">
        {content} {loadingContent} {errorContent}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;
  return (
    <>
      <h4>Random Character: {name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender </span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born </span>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died </span>
          <span>{died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture </span>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  );
};

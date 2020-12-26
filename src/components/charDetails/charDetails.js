import React, { Component } from "react";
import "./charDetails.css";
import gotServices from "../../services/gotServices";

const Field = ({ char, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{char[field]}</span>
    </li>
  );
};

export { Field };

export default class CharDetails extends Component {
  gotServices = new gotServices();
  state = {
    char: null
  };
  componentDidMount() {
    this.updateChar();
  }
  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }
  updateChar() {
    const { charId } = this.props;
    if (!charId) {
      return;
    }
    this.gotServices.getCharacter(charId).then(char => {
      this.setState({
        char
      });
    });
  }
  render() {
    if (!this.state.char) {
      return <span> Please select a charactor </span>;
    }
    const { char } = this.state;
    const { name } = this.state.char;
    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, child => {
            return React.cloneElement(child, { char });
          })}
        </ul>
      </div>
    );
  }
}

import React, { Component } from "react";
import Amount from "./Amount";

class Person extends Component {

  constructor(props) {
    super(props);

    var name = this.props.person || "";
    var amount = this.props.amount || 0;
    amount = parseFloat(amount);
    var max = this.props.max || null;

    var canContinue = name && amount > 0 && (!amount || amount <= max);
    var autofocus = name && !canContinue;

    this.state = {
      name: name,
      amount: amount,
      max: max,
      canContinue: canContinue,
      autofocus: autofocus
    };

    this.onNext = this.onNext.bind(this);
    this.onAmountChanged = this.onAmountChanged.bind(this);
    this.onNameChanged = this.onNameChanged.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onNext() {
    if (this.state.canContinue && this.props.onValues) {
      this.props.onValues(this.state.name, parseFloat(this.state.amount));
    }
  }

  onAmountChanged(amount) {
    this.setState({
      amount: amount,
      name: this.state.name,
      canContinue: this.state.name && amount > 0 && amount <= this.state.max,
      max: this.state.max
    });
  }

  onNameChanged(event) {
    var name = event.target.value;
    if (name) {
      this.setState({
        amount: this.state.amount,
        name: event.target.value,
        canContinue: name && this.state.amount > 0 && this.state.amount <= this.state.max,
        max: this.state.max
      });
    }
  }

  onKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.onNext();
    }
  }

  render() {
    return (
      <div>
        <p className="app-intro app-instruction">
          {this.props.title || "?"}
        </p>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend" aria-hidden="true">
                <span className="input-group-text">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              <input
                name={this.props.name}
                className="form-control form-control-lg"
                onChange={this.onNameChanged}
                onKeyPress={this.onKeyPress}
                placeholder={this.props.person || "Name"}
                defaultValue={this.props.person || ""}
                type="text"
                aria-label={this.props.personLabel}
                autoFocus
                label={this.props.personLabel} />
            </div>
          </div>
          <div className="form-group">
            <Amount
              name="total-person-1"
              min={0.01}
              max={this.props.max}
              currency={this.props.currency}
              label={this.props.amountLabel}
              value={this.props.amount || ""}
              autofocus={this.state.autofocus}
              onEnterKey={this.onNext}
              onValueChanged={this.onAmountChanged}
              canEditAmount={this.props.canEditAmount} />
          </div>
          <button type="button" className="btn btn-lg btn-primary" onClick={this.onNext} disabled={!this.state.canContinue}>{this.props.buttonText}</button>
        </form>
      </div>
    );
  }
}

export default Person;

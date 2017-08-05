import React, { Component } from "react";
import Amount from "./Amount";

class Person extends Component {

  constructor(props) {
    super(props);

    var name = this.props.person || "";
    var amount = this.props.amount || 0;
    var max = this.props.max || null;

    this.state = {
      name: name,
      amount: amount,
      max: max,
      canContinue: name && amount > 0 && (!amount || amount <= max)
    };

    this.onNext = this.onNext.bind(this);
    this.onAmountChanged = this.onAmountChanged.bind(this);
    this.onNameChanged = this.onNameChanged.bind(this);
  }

  onNext() {
    if (this.props.onValues) {
      this.props.onValues(this.state.name, this.state.amount);
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

  render() {
    return (
      <div>
        <p className="app-intro app-instruction lead">
          {this.props.title || "?"}
        </p>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon" aria-hidden="true">
                <span className="glyphicon glyphicon-user"></span>
              </span>
              <input name={this.props.name}
                     className="form-control"
                     onChange={this.onNameChanged}
                     placeholder={this.props.person || "Name"}
                     value={this.props.person || ""}
                     type="text"
                     aria-label={this.personLabel}
                     autoFocus
                     label={this.personLabel} />
            </div>
          </div>
          <div className="form-group">
            <Amount name="total-person-1"
                    min={0.01}
                    max={this.props.max}
                    label={this.props.amountLabel}
                    onValueChanged={this.onAmountChanged}
                    value={this.props.amount || ""}
                    canEditAmount={this.props.canEditAmount} />
          </div>
          <button type="button" className="btn btn-primary" onClick={this.onNext} disabled={!this.state.canContinue}>{this.props.buttonText}</button>
        </form>
      </div>
    );
  }
}

export default Person;

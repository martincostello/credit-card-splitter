import React, { Component } from "react";
import Amount from "./Amount";

class Total extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      canContinue: false
    };

    this.onNext = this.onNext.bind(this);
    this.onValueChanged = this.onValueChanged.bind(this);
  }

  onNext() {
    if (this.props.onTotal) {
      this.props.onTotal(this.state.total);
    }
  }

  onValueChanged(total) {
    this.setState({
      total: total,
      canContinue: true
    });
  }

  render() {
    return (
      <div className="text-center" id="panel-total">
        <p className="app-intro lead">
          To get started, enter the total amount for the credit card bill:
        </p>
        <form className="form-inline">
          <div className="form-group">
            <Amount name="total"
                    min={0.01}
                    label="Enter the total amount for the credit card bill in pounds and pence."
                    onEnterKey={this.onNext}
                    onValueChanged={this.onValueChanged} />
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.onNext} disabled={!this.state.canContinue}>Set total</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Total;

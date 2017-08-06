import React, { Component } from "react";
import Amount from "./Amount";

class Split extends Component {

  constructor(props) {
    super(props);
    this.state = {
      share: this.props.share,
      split: 0,
      canAdd: false,
      currentValue: 0
    };
    this.onNext = this.onNext.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onAmountChanged = this.onAmountChanged.bind(this);
  }

  onNext() {
    if (this.props.onSplits) {
      this.props.onSplits((this.state.split / 2));
    }
  }

  onAdd(event) {
    this.setState({
      share: this.state.share,
      split: this.state.split + this.state.currentValue,
      canAdd: false,
      currentValue: ""
    });
  }

  onAmountChanged(amount) {
    this.setState({
      share: this.state.share,
      split: this.state.split,
      canAdd: (this.state.share - this.state.split) >= amount,
      currentValue: amount
    });
  }

  render() {
    return (
      <div>
        <p className="app-intro">
          {this.props.title || "?"}
        </p>
        <p>
          Apparent total: £{this.state.share.toFixed(2)}
        </p>
        <p>
          Current split: £{(this.state.split / 2).toFixed(2)} each
        </p>
        <form className="form-inline text-center">
          <div className="form-group">
            <Amount name="amount"
                    value={this.state.currentValue}
                    label="Enter the value of the transaction."
                    onValueChanged={this.onAmountChanged}
                    onEnterKey={this.onAdd}
                    min={0.01}
                    max={(this.state.share - this.state.split)} />
          </div>
          <div className="form-group">
            <button type="button"
                    className="btn btn-primary"
                    onClick={this.onAdd}
                    disabled={!this.state.canAdd}
                    aria-label="Add this transaction."
                    title="Add this transaction.">Add</button>
          </div>
          <div className="form-group">
            <button type="button"
                    className="btn btn-success"
                    onClick={this.onNext}
                    aria-label={this.props.nextLabel}
                    title={this.props.nextLabel}>{this.props.nextButton}</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Split;

import React, { Component } from "react";

import Amount from "./Amount";
import FormatNumber from "./Helpers";

class Split extends Component {

  constructor(props) {
    super(props);
    this.state = {
      share: this.props.share,
      split: 0,
      canAdd: false,
      currentValue: 0,
      values: []
    };
    this.onNext = this.onNext.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onAmountChanged = this.onAmountChanged.bind(this);
  }

  onNext() {
    if (this.props.onSplits) {
      this.props.onSplits((this.state.split / 2));
    }
  }

  onAdd(event) {
    if (this.state.currentValue && this.state.canAdd) {

      this.setState({
        share: this.state.share,
        split: this.state.split + this.state.currentValue,
        canAdd: false,
        currentValue: "",
        values: this.state.currentValue ? this.state.values.concat(this.state.currentValue) : this.state.values.slice()
      });

      this.refs.amount.clear();
    }
  }

  onRemove(index) {

    var removed = this.state.values[index];
    var newSplit = this.state.split - removed;

    var values = this.state.values;
    values.splice(index, 1);

    this.setState({
      share: this.state.share,
      split: newSplit,
      canAdd: this.state.canAdd,
      currentValue: this.state.currentValue,
      values: values.slice()
    });
  }

  onAmountChanged(amount) {
    this.setState({
      share: this.state.share,
      split: this.state.split,
      canAdd: (this.state.share - this.state.split) >= amount,
      currentValue: amount,
      values: this.state.values.slice()
    });
  }

  render() {
    return (
      <div>
        <p className="app-intro">
          {this.props.title || "?"}
        </p>
        <p>
          Apparent total: {this.props.currency}{FormatNumber(this.state.share)}
        </p>
        <p>
          Current split: {this.props.currency}{FormatNumber(this.state.split / 2)} each
        </p>
        <form>
          <div className="form-row">
            <div className="col col-md-4 offset-md-3">
              <Amount
                ref="amount"
                name="amount"
                value={this.state.currentValue}
                label="Enter the value of the transaction."
                currency={this.props.currency}
                autofocus={true}
                onValueChanged={this.onAmountChanged}
                onEnterKey={this.onAdd}
                min={0.01}
                max={FormatNumber(this.state.share - this.state.split)} />
            </div>
            <div className="col col-md-2">
              <button
                  type="button"
                  className="btn btn-lg btn-primary mr-1"
                  onClick={this.onAdd}
                  disabled={!this.state.canAdd}
                  aria-label="Add this transaction."
                  title="Add this transaction.">Add</button>
              <button
                type="button"
                className="btn btn-lg btn-success ml-1"
                onClick={this.onNext}
                aria-label={this.props.nextLabel}
                title={this.props.nextLabel}>{this.props.nextButton}</button>
            </div>
          </div>
        </form>
        <hr />
        <div>
          <ul className="list-group">
            {this.state.values.map((value, index) => (
              <li key={index} className="list-group-item col-lg-6 offset-md-3">
                <small>{FormatNumber(value)}</small>
                <button
                  type="button"
                  className="btn btn-danger btn-sm float-right"
                  aria-label="Delete"
                  title="Delete this value"
                  onClick={() => this.onRemove(index)}>
                  <i className="fas fa-trash" aria-hidden="true"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Split;

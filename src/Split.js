import React, { Component } from "react";
import Amount from "./Amount";

class Split extends Component {
  render() {
    return (
      <div className={this.props.hide === true ? "hide" : ""} id={this.props.id || ""}>
        <p className="app-instruction app-intro lead">
          {this.props.title || "?"}
        </p>
        <form className="form-inline text-center">
          <div className="form-group">
            <Amount name="amount" label="Enter the value of the transaction." />
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-primary" aria-label="Add this transaction." title="Add this transaction.">Add</button>
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-success" aria-label={this.props.nextLabel} title={this.props.nextLabel}>{this.props.nextButton}</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Split;

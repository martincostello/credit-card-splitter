import React, { Component } from "react";
import Amount from "./Amount";

class Total extends Component {
  render() {
    return (
      <div className={(this.props.hide === true ? "hide" : "") + " text-center"} id="panel-total">
        <p className="app-intro lead">
          {this.props.title}
        </p>
        <form className="form-inline">
          <div className="form-group">
            <Amount name="total" label={this.props.amountTooltip} />
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-primary">{this.props.buttonText}</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Total;

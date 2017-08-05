import React, { Component } from "react";

class Amount extends Component {
  render() {
    return (
      <div className="input-group">
        <span className="input-group-addon" aria-hidden="true">{this.props.currency || "£"}</span>
        <input name={this.props.name || ""} className="form-control" placeholder={this.props.placeholder || "0.00"} min="0.00" step="0.01" type="number" aria-label={this.props.label || ""} label={this.props.label || ""} />
      </div>
    );
  }
}

export default Amount;

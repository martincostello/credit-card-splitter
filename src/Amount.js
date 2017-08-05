import React, { Component } from "react";

class Amount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var parsed = parseFloat(event.target.value);
    if (parsed && !isNaN(parsed) && parsed >= this.props.min) {
      var split = event.target.value.split(".");
      if (split.length < 2 || split[1].length < 3) {
        this.setState({value: parsed});
        if (this.props.onValueChanged) {
          this.props.onValueChanged(parsed);
        }
      }
    }
  }

  render() {
    return (
      <div className="input-group">
        <span className="input-group-addon" aria-hidden="true">{this.props.currency || "£"}</span>
        <input name={this.props.name || ""}
               className="form-control"
               placeholder={this.props.placeholder || "0.00"}
               min={this.props.min || "0.00"}
               step="0.01"
               type="number"
               value={this.state.value || ""}
               onChange={this.handleChange}
               aria-label={this.props.label || ""}
               label={this.props.label || ""} />
      </div>
    );
  }
}

export default Amount;

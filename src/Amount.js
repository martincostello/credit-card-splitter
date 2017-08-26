import React, { Component } from "react";

class Amount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || "",
      canEdit: this.props.canEditAmount === undefined || this.props.canEditAmount === true
    };
    this.handleChange = this.handleChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  handleChange(event) {

    var value = event.target.value;

    if (!value) {
      this.setState({ value: "" });
      return;
    }

    var parsed = parseFloat(event.target.value);

    if (parsed === 0) {
      this.setState({ value: parsed });
    }
    else if (parsed && !isNaN(parsed) && parsed >= this.props.min) {
      var split = event.target.value.split(".");
      if (split.length < 2 || split[1].length < 3) {
        this.setState({ value: parsed });
        if (this.props.onValueChanged) {
          this.props.onValueChanged(parsed);
        }
      }
    }
  }

  onKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (this.props.onEnterKey) {
        this.props.onEnterKey(event);
      }
    }
  }

  render() {
    return (
      <div className="input-group">
        <span className="input-group-addon" aria-hidden="true">{this.props.currency || "£"}</span>
        <input
          autoFocus={this.props.autofocus}
          name={this.props.name || ""}
          className="form-control"
          placeholder={this.props.placeholder || "0.00"}
          min={this.props.min || "0.00"}
          max={this.props.max || ""}
          step="0.01"
          type="number"
          disabled={!this.state.canEdit}
          value={this.state.value}
          onChange={this.handleChange}
          onKeyPress={this.onKeyPress}
          aria-label={this.props.label || ""}
          label={this.props.label || ""} />
      </div>
    );
  }
}

export default Amount;

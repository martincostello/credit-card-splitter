import React, { Component } from "react";
import Amount from "./Amount";

class Person extends Component {
  render() {
    return (
      <div className={this.props.hide === true ? "hide" : ""} id={this.props.id}>
        <p className="app-intro app-instruction lead">
          {this.props.title || "?"}
        </p>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon" aria-hidden="true">
                <span className="glyphicon glyphicon-user"></span>
              </span>
              <input name={this.props.name} className="form-control" placeholder={this.props.person} type="text" aria-label={this.personLabel} label={this.personLabel} />
            </div>
          </div>
          <div className="form-group">
            <Amount name="total-person-1" label={this.props.amountLabel} />
          </div>
          <button type="button" className="btn btn-primary">{this.props.buttonText}</button>
        </form>
      </div>
    );
  }
}

export default Person;

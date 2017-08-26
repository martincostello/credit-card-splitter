import React, { Component } from "react";

class Result extends Component {

  constructor(props) {
    super();

    this.currency = props.currency;
    this.person1 = props.person1;
    this.person2 = props.person2;
    this.showShareButton = props.showShareButton;
    this.total = props.total;
    this.total1 = props.total1;
    this.total2 = props.total2;
  }

  buildShareHash() {
    var json = JSON.stringify({
          currency: this.currency,
          person1: this.person1,
          person2: this.person2,
          total: this.total,
          total1: this.total1,
          total2: this.total2
        });
    var encoded = btoa(json);
    return "#" + encodeURIComponent(encoded);
  }

  render() {
    return (
        <div className="lead text-center">
          <p>Total: {this.currency}{this.total}</p>
          <p>
            {this.person1}: <strong>{this.currency}{this.total1}</strong>
          </p>
          <p>
            {this.person2}: <strong>{this.currency}{this.total2}</strong>
          </p>
          { this.showShareButton ? <p>
                <a className="btn btn-large btn-primary" href={this.buildShareHash()} target="_blank">
                    Share <span className="glyphicon glyphicon-share" aria-hidden="true"></span>
                </a>
            </p> : ""
          }
        </div>
    );
  }
}

export default Result;

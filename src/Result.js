import Clipboard from "clipboard";
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

  buildShareUrl() {
    var json = JSON.stringify({
      currency: this.currency,
      person1: this.person1,
      person2: this.person2,
      total: this.total,
      total1: this.total1,
      total2: this.total2
    });
    var encoded = btoa(json);

    var shareUrl = window.location.href;

    if (shareUrl[shareUrl.length - 1] === '#') {
      shareUrl = shareUrl.substring(0, shareUrl.length - 1);
    }

    return shareUrl + "#" + encodeURIComponent(encoded);
  }

  componentDidMount() {
    new Clipboard(".btn-copy", { container: document.getElementById("share-modal") });
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
        {this.showShareButton ? <div>
          <p>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#share-modal">
              Share <span className="glyphicon glyphicon-share" aria-hidden="true"></span>
            </button>
          </p>
          <div className="modal fade" id="share-modal" tabIndex="-1" role="dialog" aria-labelledby="share-modal-label">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title" id="share-modal-label">Share</h4>
                </div>
                <div className="modal-body">
                  <p className="lead">
                    Click the button below to copy a URL to use to share the result.
                  </p>
                  <div className="btn-toolbar" role="toolbar">
                    <div className="btn-group" role="group">
                      <button className="btn btn-primary btn-copy" data-clipboard-action="copy" data-clipboard-text={this.buildShareUrl()}>
                        Copy to clipboard <span className="glyphicon glyphicon-copy" aria-hidden="true"></span>
                      </button>
                    </div>
                    <div className="btn-group" role="group">
                      <a className="btn btn-default" href={this.buildShareUrl()} target="_blank">
                        View result <span className="glyphicon glyphicon-share" aria-hidden="true"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> : ""
        }
      </div>
    );
  }
}

export default Result;

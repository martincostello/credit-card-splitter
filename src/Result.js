import React, { Component } from "react";

class Result extends Component {
  render() {
    return (
      <div className={(this.props.hide === true ? "hide" : "") + ""}>
        <h2 className="text-center">Totals</h2>
        <p className="lead">
          Person 1: <strong>£0.00</strong>
        </p>
        <p className="lead">
          Person 2: <strong>£0.00</strong>
        </p>
        <button className="btn btn-primary >>" type="button" data-toggle="collapse" data-target="#working" aria-expanded="false" aria-controls="working">
          Show working
        </button>
        <div className="collapse" id="working">
          <table className="table table-bordered table-striped">
            <caption>Credit Card Bill Amounts</caption>
            <thead>
              <tr>
                <th></th>
                <th className="text-center"></th>
                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Apparent spend</td>
                <td className="text-right">£0.00</td>
                <td className="text-right">£0.00</td>
              </tr>
              <tr>
                <td>Shared amount</td>
                <td className="text-right">£0.00</td>
                <td className="text-right">£0.00</td>
              </tr>
              <tr>
                <td><strong>Adjusted spend</strong></td>
                <td className="text-right"><strong>£0.00</strong></td>
                <td className="text-right"><strong>£0.00</strong></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="1"><strong>Statement Total</strong></td>
                <td className="text-center" colSpan="2"><strong>£0.00</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

export default Result;

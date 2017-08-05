import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Person from "./Person";
import Result from "./Result";
import Split from "./Split";
import Total from "./Total";

const totals = {
  people: [
    "Person 1",
    "Person 2"
  ],
  statement: {
    total: 0.00,
    subtotals: {
      "Person 1": {
        apparent: 0.00,
        shared: 0.00
      },
      "Person 2": {
        apparent: 0.00,
        shared: 0.00
      }
    }
  }
};

const logoAltText = "Credit Card Splitter logo";

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt={logoAltText} title={logoAltText} aria-hidden="true" />
          <h1>Credit Card Splitter</h1>
        </div>
        <div className="app-content container">
          <Total hide={false}
            title="To get started, enter the total amount for the credit card bill:"
            amountTooltip="Enter the total amount for the credit card bill in pounds and pence."
            buttonText="Set total" />
          <Person hide={false}
            id="panel-person-1"
            title="Next, set the apparent total for the first person:"
            name="person-1"
            person={totals.people[0]}
            personLabel="The name of the first person."
            amountLabel="Enter the statement amount from the credit card bill for the first person."
            buttonText="Set amount" />
          <Person hide={false}
            id="panel-person-2"
            title="Now set the apparent total for the second person:"
            name="person-2"
            person={totals.people[1]}
            personLabel="The name of the second person."
            amountLabel="Enter the statement amount from the credit card bill for the second person."
            buttonText="Set amount" />
          <Split hide={false} id="panel-splits-1" title={`OK, now enter the transaction amounts to split 50:50 from ${totals.people[0]}'s transactions:`} nextLabel="Add the next set of transactions." nextButton="Next" />
          <Split hide={false} id="panel-splits-2" title={`Next, enter the transaction amounts to split 50:50 from ${totals.people[1]}'s transactions:`} nextLabel="View the amounts each person owes." nextButton="Done" />
          <Result hide={false} />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";

import Person from "./Person";
//import Result from "./Result";
//import Split from "./Split";
import Total from "./Total";

class Calculator extends Component {

  constructor() {
    super();
    this.state = {
      total: 0.00,
      person1: {
        name: "",
        amount: 0
      },
      person2: {
        name: "",
        amount: 0
      },
      step: 0
    };

    this.onTotal = this.onTotal.bind(this);
    this.onFirstPerson = this.onFirstPerson.bind(this);
    this.onSecondPerson = this.onSecondPerson.bind(this);
  }

  onTotal(total) {
    console.log("Total from user:", total);
    this.setState({
      total: total,
      person1: this.state.person1,
      person2: this.state.person2,
      step: ++this.state.step
    });
  }

  onFirstPerson(name, amount) {
    console.log("Amount from person one:", name, amount);
    this.setState({
      total: this.state.total,
      person1: {
        name: name,
        amount: amount
      },
      person2: this.state.person2,
      step: ++this.state.step
    });
  }

  onSecondPerson(name, amount) {
    console.log("Amount from person two:", name, amount);
    this.setState({
      total: this.state.total,
      person2: {
        name: name,
        amount: amount
      },
      person1: this.state.person1,
      step: ++this.state.step
    });
  }

  render() {
    return (
      <div className="app-calculator">
        {this.state.step === 0 ? <Total onTotal={this.onTotal} /> : "" }
        {this.state.step === 1 ? <Person
            title="Next, set the apparent total for the first person:"
            name="person-1"
            person={this.state.person1.name || ""}
            onValues={this.onFirstPerson}
            personLabel="The name of the first person."
            amountLabel="Enter the statement amount from the credit card bill for the first person."
            buttonText="Set amount" /> : "" }
        {this.state.step === 2 ? <Person
            title="Now set the apparent total for the second person:"
            name="person-2"
            person={this.state.person2.name || ""}
            onValues={this.onSecondPerson}
            amount={this.state.total - this.state.person1.amount}
            personLabel="The name of the second person."
            amountLabel="Enter the statement amount from the credit card bill for the second person."
            buttonText="Set amount" /> : "" }
        {this.state.step >= 3 ? <div>
            <p>Total: £{this.state.total}</p>
            <p>{this.state.person1.name}: £{this.state.person1.amount}</p>
            <p>{this.state.person2.name}: £{this.state.person2.amount}</p>
          </div> : "" }
      </div>
    );
  }
}

export default Calculator;

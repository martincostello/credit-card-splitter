import Cookies from "js-cookie";
import React, { Component } from "react";

import Person from "./Person";
import Result from "./Result";
import Split from "./Split";
import Total from "./Total";

class Calculator extends Component {

  constructor() {
    super();

    this.isSharedState = false;
    this.restoredState = null;

    if (window.location.hash && window.location.hash.length > 1) {
      try {
        var encoded = decodeURIComponent(window.location.hash.substring(1));
        var json = atob(encoded);
        this.restoredState = JSON.parse(json);

        window.location.hash = "";
        this.isSharedState = true;
      }
      catch (e) {
        console.error(e);
      }
    }

    this.state = {
      total: 0,
      person1: {
        name: Cookies.get("cc-splitter-person-1") || "",
        amount: 0,
        splitAmount: 0
      },
      person2: {
        name: Cookies.get("cc-splitter-person-2") || "",
        amount: 0,
        splitAmount: 0
      },
      step: 0
    };

    this.onTotal = this.onTotal.bind(this);
    this.onFirstPerson = this.onFirstPerson.bind(this);
    this.onSecondPerson = this.onSecondPerson.bind(this);
    this.onFirstSplits = this.onFirstSplits.bind(this);
    this.onSecondSplits = this.onSecondSplits.bind(this);
  }

  onTotal(total) {
    this.setState({
      total: total,
      person1: this.state.person1,
      person2: this.state.person2,
      step: ++this.state.step
    });
  }

  onFirstPerson(name, amount) {
    if (this.state.total - amount > 0) {
      this.setState({
        total: this.state.total,
        person1: {
          name: name,
          amount: amount,
          splitAmount: 0
        },
        person2: this.state.person2,
        step: ++this.state.step
      });
      Cookies.set("cc-splitter-person-1", name);
    }
  }

  onSecondPerson(name, amount) {
    this.setState({
      total: this.state.total,
      person2: {
        name: name,
        amount: amount,
        splitAmount: 0
      },
      person1: this.state.person1,
      step: ++this.state.step
    });
    Cookies.set("cc-splitter-person-2", name);
  }

  onFirstSplits(splitAmount) {
    this.setState({
      total: this.state.total,
      person1: {
        name: this.state.person1.name,
        amount: this.state.person1.amount,
        splitAmount: splitAmount
      },
      person2: this.state.person2,
      step: ++this.state.step
    });
  }

  onSecondSplits(splitAmount) {
    this.setState({
      total: this.state.total,
      person2: {
        name: this.state.person2.name,
        amount: this.state.person2.amount,
        splitAmount: splitAmount
      },
      person1: this.state.person1,
      step: ++this.state.step
    });
  }

  total1() {
    return (this.state.person1.amount - this.state.person1.splitAmount + this.state.person2.splitAmount).toFixed(2);
  }

  total2() {
    return (this.state.person2.amount - this.state.person2.splitAmount + this.state.person1.splitAmount).toFixed(2);
  }

  render() {
    return (
      <div className="app-calculator">
        {
          !this.isSharedState && this.state.step === 0 ?
            <Total currency={this.props.currency} onTotal={this.onTotal} />
            : ""
        }
        {
          this.state.step === 1 ?
            <Person
              title="Next, set the apparent total for the first person:"
              name="person-1"
              person={this.state.person1.name || ""}
              max={this.state.total - 0.01}
              currency={this.props.currency}
              onValues={this.onFirstPerson}
              personLabel="The name of the first person."
              amountLabel="Enter the statement amount from the credit card bill for the first person."
              buttonText="Set amount" />
            : ""}
        {
          !this.isSharedState && this.state.step === 2 ?
            <Person
              title="Now set the apparent total for the second person:"
              name="person-2"
              person={this.state.person2.name || ""}
              onValues={this.onSecondPerson}
              amount={(this.state.total - this.state.person1.amount).toFixed(2)}
              max={(this.state.total - this.state.person1.amount).toFixed(2)}
              currency={this.props.currency}
              canEditAmount={false}
              personLabel="The name of the second person."
              amountLabel="Enter the statement amount from the credit card bill for the second person."
              buttonText="Set amount" />
            : ""
        }
        {
          !this.isSharedState && this.state.step === 3 ?
            <Split
              title={`OK, now enter the transaction amounts to split 50:50 from ${this.state.person1.name}${this.state.person1.name[this.state.person1.name.length - 1] === "s" ? "'" : "'s"} transactions:`}
              share={this.state.person1.amount}
              currency={this.props.currency}
              onSplits={this.onFirstSplits}
              nextLabel="Add the next set of transactions."
              nextButton="Next" />
            : ""
        }
        {
          !this.isSharedState && this.state.step === 4 ?
            <Split
              title={`Next, enter the transaction amounts to split 50:50 from ${this.state.person2.name}${this.state.person2.name[this.state.person2.name.length - 1] === "s" ? "'" : "'s"} transactions:`}
              share={this.state.person2.amount}
              currency={this.props.currency}
              onSplits={this.onSecondSplits}
              nextLabel="View the amounts each person owes."
              nextButton="Done" />
            : ""
        }
        { !this.isSharedState && this.state.step >= 5 ?
          <Result
            currency={this.props.currency}
            person1={this.state.person1.name}
            person2={this.state.person2.name}
            showShareButton={true}
            total={parseFloat(this.state.total).toFixed(2)}
            total1={this.total1()}
            total2={this.total2()} /> : "" }
        { this.isSharedState ?
          <Result
            currency={this.restoredState.currency}
            person1={this.restoredState.person1}
            person2={this.restoredState.person2}
            showShareButton={false}
            total={this.restoredState.total}
            total1={this.restoredState.total1}
            total2={this.restoredState.total2} /> : "" }
      </div>
    );
  }
}

export default Calculator;

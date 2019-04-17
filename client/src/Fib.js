import React from "react";
import axios from "axios";

export default class Fib extends React.Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ""
  };
  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get("/api/values/current");
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIdexes = await axios.get("/api/values/all");
    this.setState({ seenIdexes: seenIdexes.data });
  }

  renderSeenIndexes() {
    return this.state.seenIdexes.map(({ number }) => number.join(", "));
  }

  renderValues() {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }
    return entries;
  }

  handleChange = event => this.setState({ index: event.target.value });
  handleSubmit = async event => {
    event.preventDefault();
    await axios.post("/api/values", {
      index: this.state.index
    });
    this.setState({ index: "" });
  };

  render() {
    return (
      <div>
        <form>
          <label>Enter your index:</label>
          <input value={this.state.index} onChange={this.handleChange} />
          <button>Submit</button>
        </form>
        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}
        <h3>Calculated values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

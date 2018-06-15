import React, { Component } from 'react';

class Price extends Component {
  render() {
    const { handler } = this.props;
    return (
      <div>
        <label htmlFor="">Price</label>
        <select onChange={handler}>
          <option value="">Free & Paid</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>
    );
  }
}

export default Price;

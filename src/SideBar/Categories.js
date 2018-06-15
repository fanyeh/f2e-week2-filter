import React, { Component } from 'react';

class Categories extends Component {
  render() {
    const { categories, handler } = this.props;
    return (
      <div>
        {categories.map(category => (
          <div key={category.id}>
            <input type="checkbox" onChange={handler} value={category.id} />
            <label>{category.short_name}</label>
          </div>
        ))}
      </div>
    );
  }
}

export default Categories;

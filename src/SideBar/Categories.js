import React, { Component } from 'react';
import Category from './Category';
class Categories extends Component {
  render() {
    const { categories, handler } = this.props;
    return (
      <div>
        <h1>Categories</h1>
        {categories.map(category => (
          <Category key={category.id} category={category} handler={handler} />
        ))}
      </div>
    );
  }
}

export default Categories;

import React, { Component } from 'react';
import Category from './Category';
class Categories extends Component {
  checked = id => {
    const { checkedCategories } = this.props;
    return checkedCategories.indexOf(id) !== -1;
  };
  render() {
    const { categories, handler } = this.props;

    return (
      <div>
        <h1>Categories</h1>
        {categories.map(category => (
          <Category
            key={category.id}
            category={category}
            handler={handler}
            checked={this.checked(category.id)}
          />
        ))}
      </div>
    );
  }
}

export default Categories;

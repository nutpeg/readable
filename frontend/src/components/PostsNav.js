import React, { Component } from "react";

class PostsNav extends Component {
  render() {
    const categories = this.props.categories;
    return (
      <nav className="nav">
        <ul>
          <li>All</li>
          {categories.map(category => (
            <li key={category.name}>{category.name}</li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default PostsNav;

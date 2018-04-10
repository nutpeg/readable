import React, { Component } from "react";
import { Link } from "react-router-dom";

class PostsNav extends Component {
  render() {
    const categories = this.props.categories;
    return (
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">All</Link>
          </li>
          {categories.map(category => (
            <li key={category.name}>
              <Link to={`/${category.path}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default PostsNav;

import React, { Component } from "react";

// Shopping list displays the content of ingredients.js, it is for now just a visualisation
class ShoppingList extends Component {
  render() {
    const ingr = this.props.ingr;
    //ingr
    return (
      <div className="ShoppingList">
        <div className="container">
          <div className="alert alert-success" role="alert">
            <ol>
              {ingr.map((i) => (
                <li key={i.id}>
                  <b>{i.name}</b>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  } // end of return statement
} // end of class

export default ShoppingList;

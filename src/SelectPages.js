import React, { Component } from "react";

// This component deals with the buttons at the top of the pages and allows to switch pages
// Each button leads to another page of the app
class SelectPages extends Component {
  render() {
    const changeToStart = this.props.changeToStartPage;
    const changeToShopping = this.props.changeToShoppingPage;
    const changeToFav = this.props.changeToFavPage;
    const changeToRecipe = this.props.changeToRecipePage;
    const changeToRan = this.props.changeToRandomPage;
    return (
      <div
        style={{
          opacity: 1
        }}
      >
        <button
          onClick={changeToStart}
          type="button"
          className="btn btn-success"
          style={{ margin: "5px 5px 5px 0px" }}
        >
          Home
        </button>
        <button
          onClick={changeToRecipe}
          type="button"
          className="btn btn-success"
          style={{ margin: "5px 5px 5px 0px" }}
        >
          Search
        </button>
        <button
          onClick={changeToShopping}
          type="button"
          className="btn btn-success"
          style={{ margin: "5px 5px 5px 0px" }}
        >
          Shopping List
        </button>
        <button
          onClick={changeToFav}
          type="button"
          className="btn btn-success"
          style={{ margin: "5px 5px 5px 0px" }}
        >
          Favorites
        </button>
        <button
          onClick={changeToRan}
          type="button"
          className="btn btn-success"
          style={{ margin: "5px 5px 5px 0px" }}
        >
          Random Recipes
        </button>
      </div>
    );
  }
} // close the ComponentB component

export default SelectPages;

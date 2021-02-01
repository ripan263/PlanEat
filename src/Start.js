import React, { Component } from "react";

//This component is dealing with the start page (buttons)

class Start extends Component {
  render() {
    const changeToShopping = this.props.changeToShoppingPage;
    const changeToFav = this.props.changeToFavPage;
    const changeToRecipe = this.props.changeToRecipePage;
    const changeToRan = this.props.changeToRandomPage;
    return (
      <div className="d-flex justify-content-center">
        <table style={{ height: "250px" }}>
          <thead>
            <tr>
              <th style={{ height: "250px" }}>
                <h1 class="display-1 text-light" style={{ height: "250px" }}>
                  PlanEat
                </h1>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <button
                onClick={changeToRecipe}
                type="button"
                className="btn btn-success btn-block"
                style={{ margin: "0px 0px 5px 0px" }}
              >
                Seach for Recipes
              </button>
            </tr>
            <tr>
              <button
                onClick={changeToShopping}
                type="button"
                className="btn btn-success btn-block"
                style={{ margin: "0px 0px 5px 0px" }}
              >
                Shopping List
              </button>
            </tr>
            <tr>
              <button
                onClick={changeToFav}
                type="button"
                className="btn btn-success btn-block"
                style={{ margin: "0px 0px 5px 0px" }}
              >
                Favorites
              </button>
            </tr>
            <tr>
              <button
                onClick={changeToRan}
                type="button"
                className="btn btn-success btn-block"
                style={{ margin: "0px 0px 5px 0px" }}
              >
                Random Recipe
              </button>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Start;

import React, { Component } from "react";

// This component displays the results of the search functionality (Search.js)
// It allows the user to add recipe to favorites (Favorites.js) and to display details about a recipe (ShowRecipe.js)

class Recipes extends Component {
  render() {
    const datas = this.props.datas;
    const addFav = this.props.addFavButton;
    const sendID = this.props.sendID;

    return (
      <div className="d-flex justify-content-center">
        <table style={{ height: "250px" }}>
          <tbody>
            <tr style={{ height: "250px" }}>
              <table border="1">
                <tbody style={{ backgroundColor: "#51CB27" }}>
                  {datas.map((s) => (
                    <tr key={s.id} class="alert alert-success">
                      <td class="alert alert-success">{s.title}</td>
                      <td class="text-center">
                        <button
                          alt="add recipe"
                          align="center"
                          width="20"
                          onClick={() => addFav(s)}
                        >
                          Add to favorite
                        </button>
                      </td>
                      <td class="text-center">
                        <button onClick={() => sendID(s.id)}>
                          Show Recipe
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
} // close the ComponentB component

export default Recipes;

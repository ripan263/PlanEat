import React, { Component } from "react";

// This components retrieve the names of the recipes added to favorites (Recipes.js)
// It also allows the user to delete them

class Favorites extends Component {
  render() {
    const dbData = this.props.favori;
    const deleted = this.props.delete;
    return (
      <div className="container">
        <div className="alert alert-success" role="alert">
          <h1>Welcome to your favorites page!</h1>

          {dbData.length > 0 && (
            <p>There are {dbData.length} favorites recipes.</p>
          )}

          <ul>
            {dbData.map((data, id) => (
              <li key={data.id}>
                <table>
                  <tr>
                    <td>
                      <b>{data.title}</b>
                    </td>
                    <td>
                      <button onClick={() => deleted(data.id)} type="button">
                        Delete
                      </button>
                    </td>
                  </tr>
                </table>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default Favorites;

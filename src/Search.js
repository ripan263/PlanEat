import React, { Component } from "react";

// This component manages the filter and search functions of the Search page
// The form allows the user to choos a type of cuisine and the search form to look for a given dish

class Search extends Component {
  render() {
    const searchTerm = this.props.searchTerm;
    const editSearchTerm = this.props.searchButton;
    const performSearch = this.props.performSearch;
    const filters = this.props.filters;
    const applyCuisineFilter = this.props.applyCuisineFilter;
    const clearSearch = this.props.clearBox;

    return (
      <div className="App">
        <div className="container">
          <form>
            <div className="form-group">
              <div
                className="alert alert-success"
                role="alert"
                style={{ textAlign: "left", paddingTop: "0.001vh" }}
              >
                <br />
                Select your Cuisine:
                <br />
                <select className="form-control" onChange={applyCuisineFilter}>
                  {filters.map((b, index) => (
                    <option key={index} value={b.cuisineID}>
                      {b.cuisineName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="container">
          <div
            className="alert alert-success"
            role="alert"
            style={{ textAlign: "left", paddingTop: "3vh" }}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={editSearchTerm}
              placeholder="Search for a recipe!"
            />
            &nbsp;
            <button onClick={performSearch}>Search</button> &nbsp;
            <button onClick={clearSearch}>Clear</button>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
} // close the ComponentB component

export default Search;

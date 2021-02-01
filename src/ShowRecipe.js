import React, { Component } from "react";

// This component deals with the display of recipes
// (It is called by the button in Recipes.js)
class ShowRecipe extends Component {
  constructor(props) {
    super(props);
    // create state variables.
    // isData indicates whether there is any data fetched in apiData
    // apiData is an array to hold our JSON data
    // isFetched indicates if the API call has finished
    // errorMsg is either null (none) or there is some error
    this.state = {
      isData: true,
      apiData: [],
      isFetched: false,
      errorMsg: null
    };
  }

  //call to the API to retieve the information about the ingredients and steps
  async componentDidMount() {
    try {
      // id define the recipe we are looking for
      const ID = this.props.id;
      const API_URL =
        "https://api.spoonacular.com/recipes/" +
        ID +
        "/information?includeNutrition=false&apiKey=bcde502ff1fb42c593938274b7506189";

      // Fetch or access the service at the API_URL address
      const response = await fetch(API_URL);
      // wait for the response. When it arrives, store the JSON version
      // of the response in this variable.
      const jsonResult = await response.json();

      if (jsonResult.status === "failure") {
        this.setState({ isData: false });
      }
      // update the state variables correctly.
      this.setState({ apiData: jsonResult });
      this.setState({ isFetched: true });
    } catch (error) {
      // In the case of an error ...
      this.setState({ isFetched: false });
      // This will be used to display error message.
      this.setState({ errorMsg: error });
    } // end of try catch
  }
  render() {
    if (this.state.errorMsg) {
      return (
        <div className="error">
          <h1>We're very sorry: An error has occured in the API call</h1>

          <p>The error message is: {this.state.errorMsg.toString()}</p>
        </div>
      ); // end of return.
    } else if (this.state.isFetched === false) {
      return (
        <div className="fetching">
          <h1>We are loading your API request........</h1>
          <p>Your data will be here very soon....</p>
        </div>
      ); // end of return
    } else if (this.state.isData === false) {
      return (
        <div className="err">
          <h1>Please Update your API Key on ShowRecipe.js</h1>
        </div>
      );
    } else {
      // we have no errors and we have data
      const Data = this.state.apiData;
      return (
        // printing of the differents parts of the recipe
        <div className="Random">
          <div className="container">
            <div className="alert alert-success" role="alert">
              <hr />
              Recipe: <b>{Data.title}</b>
              <hr />
              Portions: {Data.servings}
              <br />
              Preparation time: {Data.readyInMinutes} min
              <br />
              <img src={Data.image} width="300" height="200" />
              <h2>Ingredients: </h2> for {Data.servings} servings{" "}
              <ul>
                {Data.extendedIngredients.map((i) => (
                  <li key={i.id}>
                    <b>{i.originalName}</b>{" "}
                    <i>
                      amount: {i.amount} {i.unit}
                    </i>
                  </li>
                ))}
              </ul>
              <h2>Steps: </h2>
              <ol>
                {Data.analyzedInstructions.map((s) =>
                  s.steps.map((t) => <li key={t.number}>{t.step}</li>)
                )}
              </ol>
            </div>
          </div>
        </div>
      );
    } // end of return
  }
}

export default ShowRecipe;

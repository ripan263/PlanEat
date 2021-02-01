import React, { Component } from "react";
import myFirebase from "./myFirebase";
import Firebase from "firebase";
import Favorites from "./Favorites";
import Start from "./Start";
import Search from "./Search";
import SelectPages from "./SelectPages";
import Recipes from "./Recipes";

import Random from "./Random";
import ShowRecipe from "./ShowRecipe";
import { ingredientsList } from "./Ingredients.js";
import ShoppingList from "./ShoppingList";

const ingr = ingredientsList;

class App extends Component {
  constructor(props) {
    super(props);
    // create  state variables
    // apiData is an array to hold our JSON data
    // favData is an array to hold users favourite recipes
    // id is a variabe used in the Recipe component to search for the recipe by it's ID
    // numPage is a variable used in conditional rendering to switch between the pages
    // isFetched indicates if the API call has finished
    // isData indicates whether there is any data fetched in apiData
    // errorMsg is either null (none) or there is some error
    // isTimeToUpdate indicates whether data should be fetched again (used in componentDidUpdate)
    // iArray is an array with ingredients from ingredients.js
    // website contains basic url to search
    // searchTerm contains term which is being searched 
    // cuisine  is used in editSearchMethod to create expected URL to search for recipes
    // filters is an array used in search functionality in drop-down list
    // API_URL contains website URL with concated filters and key words 
    // numPage allows the conditional rendering by keeping the id of the current page
    this.state = {
      apiData: [],
      favData: [],
      id: 0,
      numPage: 0,
      isFetched: false,
      isData: true,
      errorMsg: null,
      isTimeToUpdate: false,
      iArray: ingr,
      website:
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=bcde502ff1fb42c593938274b7506189",
      searchTerm: "",
      cuisine: "&cuisine=",
      filters: [
        {
          cuisineID: 0,
          cuisineName: "No Filter",
          selected: false
        },
        {
          cuisineID: 1,
          cuisineName: "Italian",
          selected: false
        },
        {
          cuisineID: 2,
          cuisineName: "Japanese",
          selected: false
        },
        {
          cuisineID: 3,
          cuisineName: "Chinese",
          selected: false
        },
        {
          cuisineID: 4,
          cuisineName: "French",
          selected: false
        },
        {
          cuisineID: 5,
          cuisineName: "Spanish",
          selected: false
        }
      ],
      API_URL:
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=bcde502ff1fb42c593938274b7506189&query=NoFilter"
    };
    this.editSearchTerm = this.editSearchTerm.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.getMessagesFromDatabase = this.getMessagesFromDatabase.bind(this);
    this.addToFavorite = this.addToFavorite.bind(this);
    this.deleteRecipeObject = this.deleteRecipeObject.bind(this);
    this.changeToStartPage = this.changeToStartPage.bind(this);
    this.changeToShoppingPage = this.changeToShoppingPage.bind(this);
    this.changeToFavPage = this.changeToFavPage.bind(this);
    this.changeToRecipePage = this.changeToRecipePage.bind(this);
    this.changeToRandomPage = this.changeToRandomPage.bind(this);
    this.sendID = this.sendID.bind(this);
    this.changeToShowRecipe = this.changeToShowRecipe.bind(this);
    this.applyCuisineFilter = this.applyCuisineFilter.bind(this);
    this.clearSearchBox = this.clearSearchBox.bind(this);
  }

  //To change the pages
  changeToStartPage() {
    this.setState({ numPage: 0 });
  }
  changeToShoppingPage() {
    this.setState({ numPage: 2 });
  }
  changeToFavPage() {
    this.setState({ numPage: 3 });
  }
  changeToRecipePage() {
    this.setState({ numPage: 4 });
  }
  changeToRandomPage() {
    this.setState({ numPage: 5 });
  }
  changeToShowRecipe() {
    this.setState({ numPage: 6 });
  }

  // function used by Recipe.js to inform ShowRecipe.js on which dish sould be displayed
  sendID(s) {
    this.setState({ id: s });
    this.changeToShowRecipe();
  }

  //To deal with search
  //uses input in searchbox
  //to alter API query
  editSearchTerm = (e) => {
    const prefix = "&query=";
    const searched = e.target.value;
    const cuisine = this.state.cuisine;

    this.setState({ searchTerm: searched });
    this.setState({
      API_URL: this.state.website
        .concat(prefix)
        .concat(searched)
        .concat(cuisine)
    });
  };

  // sets "isTimeToUpdate" variable as being true
  // so componentDidUpdate() will
  // do another API call
  performSearch = (e) => {
    this.setState({ isTimeToUpdate: true });
  };

  findRecipeByName(recipeName) {
    return function (apiData) {
      return apiData.recipe.label === recipeName;
    };
  }

  findCuisineByID(cuisineID) {
    return function (filterObject) {
      return filterObject.cuisineID === cuisineID;
    };
  }

  clearSearchBox() {
    this.setState({ searchTerm: "" });
    this.setState({ apiData: [] });
  }

  applyCuisineFilter = (e) => {
    // use id to find name of filter
    let choosenFilter = this.state.filters.filter(
      this.findCuisineByID(Number(e.target.value))
    );

    // prefix for search
    const cuisinePrefix = "&cuisine=";
    const fil = choosenFilter[0].cuisineName;

    const cuisin = cuisinePrefix.concat(fil);

    this.setState({ cuisine: cuisin });

    // Need to do an additional seach here,
    // or the filter would only work once a new search is performed
    // reusing code from editSearchTerm event handler
    const searchPrefix = "&query=";
    const searched = this.state.searchTerm;
    //const cuisine = this.state.cuisine;
    this.setState({
      API_URL: this.state.website
        .concat(searchPrefix)
        .concat(searched)
        .concat(cuisin)
    });
  };

  // componentDidMount() is invoked immediately after a
  // component is mounted (inserted into the tree)
  async componentDidMount() {
    try {
      const API_URL = this.state.API_URL;
      // Fetch or access the service at the API_URL address
      const response = await fetch(API_URL);
      // wait for the response. When it arrives, store the JSON version
      // of the response in this variable.
      const jsonResult = await response.json();

      if (jsonResult.status === "failure") this.setState({ isData: false });

      // update the state variables correctly.
      this.setState({ apiData: jsonResult.results });
      this.setState({ isFetched: true });
      this.getMessagesFromDatabase();
    } catch (error) {
      // In the case of an error ...
      this.setState({ isFetched: false });
      // This will be used to display error message.
      this.setState({ errorMsg: error });
    } // end of try catch
  } // end of componentDidMount()

  //fetches new data for search component, dependent on "isTimeToUpdate" boolean variable
  async componentDidUpdate() {
    if (this.state.isTimeToUpdate === true) {
      try {
        const API_URL = this.state.API_URL;
        // Fetch or access the service at the API_URL address
        const response = await fetch(API_URL);
        // wait for the response. When it arrives, store the JSON version
        // of the response in this variable.
        const jsonResult = await response.json();
        if (jsonResult.status === "failure") this.setState({ isData: false });

        // update the state variables correctly.
        this.setState({ apiData: jsonResult.results });
        this.setState({ isFetched: true });
        this.setState({ isTimeToUpdate: false });
      } catch (error) {
        // In the case of an error ...
        this.setState({ isFetched: false });
        // This will be used to display error message.
        this.setState({ errorMsg: error });
        this.setState({ isTimeToUpdate: false });
      }
    }
  }

  getMessagesFromDatabase() {
    // referencing the fav array on our Firebase database
    let ref = Firebase.database().ref("fav");

    //mapping data from Database and putting it in newMessagefromDB array
    ref.on("value", (snapshot) => {
      let msgData = snapshot.val();
      let newMessagesFromDB = [];
      for (let m in msgData) {
        // create a JSON object version of our object.
        // contained within the database
        let currObject = {
          id: msgData[m].id,
          image: msgData[m].image,
          imageType: msgData[m].imageType,
          title: msgData[m].title
        };

        // add it to our newStateMessages array.
        newMessagesFromDB.push(currObject);
      } // end for loop
      // set state = don't use concat.
      this.setState({ favData: newMessagesFromDB });
    }); // end of the on method
  } // end of getMessagesFromDatabase()

  // When we press this button, we would like to send the message to our Firebase database.
  addToFavorite(r) {
    // create our new message object which will be inserted into the database.
    let newMsgObj = {
      id: r.id,
      image: r.image,
      imageType: r.imageType,
      title: r.title
    };

    let localMessages = this.state.favData;
    let objId = newMsgObj.id;
    const value = localMessages.some((elem) => elem.id === objId);
    // add our new object. We can use push here.
    if (!value) {
      localMessages.push(newMsgObj);
      
      // restore state of this component back to the  default.
      this.setState({ favData: localMessages });
      Firebase.database().ref("/fav").set(localMessages);
    }
  }
  /** Filter callback */
  filterByRecipeID(favObjectID) {
    return function (favObject) {
      return favObject.id !== favObjectID;
    };
  }

  //delete the recipe object from user selection
  deleteRecipeObject(RecipeObjectIDToDelete) {
    // get the current state array dbData holding our data
    const localDishObjects = this.state.favData;

    // apply the filter function to remove the object we wish to delete.
    // This is our dbData array WITHOUT the object for deletion.
    const updatedLocalRecipeObjects = localDishObjects.filter(
      this.filterByRecipeID(RecipeObjectIDToDelete)
    );
    // set state in the application
    this.setState({ favData: updatedLocalRecipeObjects });

    // update the firebase database - using set from Firebase API
    // we replace the data at recipeData with the new dbData array (in state)
    // or using our local variable.

    Firebase.database().ref("/fav").set(updatedLocalRecipeObjects);
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
          <h1>Please Update your API Key on App.js</h1>
        </div>
      );
    } else {
      // we have no errors and we have data
      return (
        <div
          className="App"
          style={{
            backgroundImage:
              "url(https://cdn.discordapp.com/attachments/785657002390454314/786690371341123655/Gobbler_greens..png)",
            height: "100vh"
          }}
        >
          {this.state.numPage !== 0 && (
            <SelectPages
              changeToStartPage={this.changeToStartPage}
              changeToShoppingPage={this.changeToShoppingPage}
              changeToFavPage={this.changeToFavPage}
              changeToRecipePage={this.changeToRecipePage}
              changeToRandomPage={this.changeToRandomPage}
            />
          )}
          {this.state.numPage === 0 && (
            <Start
              changeToShoppingPage={this.changeToShoppingPage}
              changeToFavPage={this.changeToFavPage}
              changeToRecipePage={this.changeToRecipePage}
              changeToRandomPage={this.changeToRandomPage}
            />
          )}
          {this.state.numPage === 1 && (
            <Search
              searchTerm={this.state.searchTerm}
              datas={this.state.apiData}
              searchButton={this.editSearchTerm}
              performSearch={this.performSearch}
              filters={this.state.filters}
              applyCuisineFilter={this.applyCuisineFilter}
            />
          )}
          {this.state.numPage === 2 && (
            <ShoppingList ingr={this.state.iArray} />
          )}

          {this.state.numPage === 3 && (
            <Favorites
              favori={this.state.favData}
              delete={this.deleteRecipeObject}
            />
          )}
          {this.state.numPage === 4 && (
            <Search
              searchTerm={this.state.searchTerm}
              datas={this.state.apiData}
              searchButton={this.editSearchTerm}
              performSearch={this.performSearch}
              filters={this.state.filters}
              applyCuisineFilter={this.applyCuisineFilter}
              clearBox={this.clearSearchBox}
            />
          )}
          {this.state.numPage === 4 && (
            <Recipes
              datas={this.state.apiData}
              addFavButton={this.addToFavorite}
              sendID={this.sendID}
            />
          )}
          {this.state.numPage === 5 && <Random />}
          {this.state.numPage === 6 && <ShowRecipe id={this.state.id} />}
        </div>
      ); // end of return
    } // end of the else statement.
  } // end of render()
} // end of App class

export default App;

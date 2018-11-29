import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import firebase from "./firebase";

const dbRef = firebase.database().ref("userCanDoList"); 

class App extends Component {
  // CONSTRUCTOR START
  constructor() {
    super();
    this.state = {
      //user input
      doable1: "",
      doable2: "",
      dailyGoal: "",
      //the return from fire base
      userList: {}
    }
  }
  // CONSTRUCTOR END

  //FUNCTIONS START

  //value being typed updating the respective state property inside constructor
  handleChange = (event) => {
    // console.log(event.target.value); //just checking if I connected everything right

    //updating state using the id of the input where the user is typing
    this.setState({
      [event.target.id]: event.target.value
    }) 
  }

  //submiting user entries
  handleSubmit = (event) => {
    //preventing the form to refresh the page
    event.preventDefault();

    //making a variable to store the data that will be send to firebase
    const newList = {
      doable1: this.state.doable1,
      doable2: this.state.doable2,
      dailyGoal: this.state.dailyGoal
    };

    //sending the info to firebase
    dbRef.push(newList);

    //clearing form and state
    this.setState({
      doable1: "",
      doable2: "",
      dailyGoal: ""
    })
  }


  //FUNCTIONS END

  // RENDER START
  render() {
    return (
      <div className="App">
        {/* HEADER START */}
        <header className="header">
          <div className="header__wrapper wrapper">
            <h1 className="header__heading">Hello!</h1>
          </div>
        </header>
        {/* HEADER END */}

        {/* USER ENTRIES START */}
        <section className="userEntries">
          <div className="userEntries__wrapper wrapper">
            <h2 className="userEntries__heading">Tasks I can do Today</h2>

            <p className="userEntries__text">You can do this!</p>

            <form onSubmit={this.handleSubmit} action="" className="userEntries__form form">
              <label htmlFor="doable1" className="form__label">I can do this task today:</label>
              <input 
              type="text" 
              onChange={this.handleChange}
              id="doable1"
              className="form__field"
              value={this.state.doable1}
              />

              <label htmlFor="doable2" className="form__label">Once I finish the fist task I'll focus on just doing this:</label>
              <input 
              type="text" 
              onChange={this.handleChange}
              id="doable2"
              className="form__field"
              value={this.state.doable2}
              />

              <label htmlFor="dailyGoal" className="form__label">This that scares me but I'll do my best to try to accomplish today:</label>
              <input 
              type="text" 
              onChange={this.handleChange}
              id="dailyGoal"
              className="form__field"
              value={this.state.dailyGoal}
              />

              <input type="submit" value="You've got this!" className="form__submit"/>
            </form>
          </div>
        </section>
        {/* USER ENTRIES END */}

        {/* USER LIST START */}
        <section className="userList">
          {/* where user list will be displayed */}
        </section>
        {/* USER LIST END */}

        {/* MASCOT START */}
        <aside className="mascot">
          <div className="mascot__wrapper wrapper">
            <div className="mascot__imageContainer">
              <img src="" alt="" className="mascot__image" />
            </div>

            <div className="mascot__textContainer">
              <img src="" alt="" className="mascot__textBubble" />
              <p className="mascot__text"></p>
            </div>
          </div>
        </aside>
        {/* MASCOT END */}

      </div>
    );
  }
}
// RENDER END

//COMPONENT DID MOUNT START

// componentDidMount() {
//   axios({
//     method: 'GET',
//     url: `https://www.rijksmuseum.nl/api/en/collection`,
//     dataResponse: 'json',
//     params: {
//       key: apiKey,
//       format: 'json',
//       hasImage: true
//     }

//   }).then((response) => {
//     console.log(response)
//   })
// }

//COMPONENT DID MOUNT END

export default App;

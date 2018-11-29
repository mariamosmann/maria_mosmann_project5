import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";
import UserList from "./UserList";
// import axios from 'axios';

const dbRef = firebase.database().ref("userList"); 

// APP START
class App extends Component {
  // CONSTRUCTOR START
  constructor() {
    super();
    this.state = {
      //user input
      doable1: "",
      doable2: "",
      dailyGoal: "",
      //information sent after form submit will go to firebase and then be stored here 
      userList: {}
    }
  }
  // CONSTRUCTOR END

  //FUNCTIONS START

  //Handle Change
  //value being typed updating the respective state property inside constructor
  handleChange = (event) => {
    // console.log(event.target.value); //just checking if I connected everything right

    //updating state using the id of the input where the user is typing
    this.setState({
      [event.target.id]: event.target.value
    }) 
  }

  //Handle Submit
  //submiting user entries
  handleSubmit = (event) => {
    //preventing the form to refresh the page
    event.preventDefault();

    //making a variable to store the data that will be send to firebase
    const updateList = {
      doable1: this.state.doable1,
      doable2: this.state.doable2,
      dailyGoal: this.state.dailyGoal
    };

    //sending the info to firebase
    //using set so the user updates the list instead of creating a new list
    dbRef.set(updateList);

    //clearing form and state
    this.setState({
      doable1: "",
      doable2: "",
      dailyGoal: ""
    })
  }

  //Reset List
  //reseting whole list
  resetList = (event) => {
    //preventing the button to refresh the page
    event.preventDefault();

    //making a variable to store empty data to be sent to firebase
    const newList = {
      doable1: "",
      doable2: "",
      dailyGoal: ""
    }

    dbRef.set(newList);
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
          <UserList
          // key={}
          // id={}
          doable1={this.state.userList.doable1}
          doable2={this.state.userList.doable2}
          dailyGoal={this.state.userList.dailyGoal} 
          />

          <input
          onClick={this.resetList} 
          type="submit" 
          value="Reset the list" className="userList__reset"/>
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
  // RENDER END

  //COMPONENT DID MOUNT START
  componentDidMount() {
    //attach event listenet to firebase
    dbRef.on("value", snapshot => {
      this.setState({
        userList: snapshot.val()
      })
    })
  }
  //COMPONENT DID MOUNT END
}
// APP END

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

export default App;

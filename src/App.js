import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import firebase from "./firebase";

const dbRef = firebase.database().ref(); 

class App extends Component {
  // CONSTRUCTOR START
  constructor() {
    super();
    this.state = {

    }
  }
  // CONSTRUCTOR END

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

            <form action="" className="userEntries__form form">
              <label htmlFor="doable1" className="form__label">I can do this task today:</label>
              <input 
              type="text" 
              className="form__field"
              id="doable1"
              />

              <label htmlFor="doable2" className="form__label">Once I finish the fist task I'll focus on just doing this:</label>
              <input 
              type="text" 
              className="form__field"
              id="doable2"
              />

              <label htmlFor="dailyGoal" className="form__label">This that scares me but I'll do my best to try to accomplish today:</label>
              <input 
              type="text" 
              className="form__field"
              id="dailyGoal"
              />

              <input type="submit" value="" className="form__submit"/>
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

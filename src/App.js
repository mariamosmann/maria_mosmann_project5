import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import firebase from "./firebase";

const dbRef = firebase.database().ref(); 

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="header__heading">Hello!</h1>
        </header>

        <section className="list">
          <h2 className="list__heading">My List</h2>

          <p className="list__text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis vel, atque perferendis ab quas deleniti necessitatibus eveniet? Atque soluta ex temporibus eum qui quisquam rerum nostrum est sunt, doloribus ipsa?</p>

          <form action="" className="list__form form">
            <label htmlFor="" className="form__label"></label>
            <input type="text" className="form__field"/>

            <label htmlFor="" className="form__label"></label>
            <input type="text" className="form__field"/>

            <label htmlFor="" className="form__label"></label>
            <input type="text" className="form__field"/>

            <input type="submit" value="" className="form__submit"/>
          </form>

          <div className="mascot">
            <div className="mascot__imageContainer">
              <img src="" alt="" className="mascot__image"/>
            </div>

            <div className="mascot__textContainer">
              <img src="" alt="" className="mascot__textBubble"/>
              <p className="mascot__text"></p>
            </div>
          </div>
        </section>


      </div>
    );
  }
}

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

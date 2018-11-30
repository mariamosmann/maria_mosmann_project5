import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";
import UserList from "./UserList";
import axios from "axios";

const dbRef = firebase.database().ref("dtbList"); 

const apiKey = `LvqwJKjT`

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
      dtbList: {
        doable1: {
          task: "",
          complete: false
        },

        doable2: {
          task: "",
          complete: false
        },
        dailyGoal: {
          task: "",
          complete: false
        }
      }
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
      doable1: {
        task: this.state.doable1,
        complete: false
      },

      doable2: {
        task: this.state.doable2,
        complete: false
      },
      dailyGoal: {
        task: this.state.dailyGoal,
        complete: false
      }
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

    //making a variable to store empty values to be sent to firebase
    const newList = {
      doable1: {
        task: "",
        complete: false
      },

      doable2: {
        task: "",
        complete: false
      },
      dailyGoal: {
        task: "",
        complete: false
      }
    }

    //updating firebase with the empty object
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
              <input required
              type="text" 
              onChange={this.handleChange}
              id="doable1"
              className="form__field"
              value={this.state.doable1}              
              />

              <label htmlFor="doable2" className="form__label">Once I finish the fist task I'll focus on just doing this:</label>
              <input required
              type="text" 
              onChange={this.handleChange}
              id="doable2"
              className="form__field"
              value={this.state.doable2}
              />

              <label htmlFor="dailyGoal" className="form__label">This task scares me but I'll do my best and try to accomplish it today:</label>
              <input required
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
          // id={this.state.dtbList}
          doable1={this.state.dtbList.doable1.task}
          doable2={this.state.dtbList.doable2.task}
          dailyGoal={this.state.dtbList.dailyGoal.task} 
          resetList={this.resetList}
          />          
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
        dtbList: snapshot.val()
      })
    }) 
    
    // AXIOS START
    axios({
      method: 'GET',
      url: `https://www.rijksmuseum.nl/api/en/collection`,
        dataResponse: 'json',
          params: {
            key: apiKey,
            format: 'json',
            hasImage: true
          }
      }).then((response) => {
    // when we have the response from the API, we reassign a variable (to be a little cleaner)
    response = response.data.artObjects

    console.log(response)
    // set the state to be the value of the response
    // this.setState({
    //   art: response
    // })
   })
    

  }
  //COMPONENT DID MOUNT END

//   axios({
//     method: 'GET',
//     url: `https://www.rijksmuseum.nl/api/en/collection`,
//       dataResponse: 'json',
//         params: {
//           key: apiKey,
//           format: 'json',
//           hasImage: true
//         }
//     }).then((response) => {
//   // when we have the response from the API, we reassign a variable (to be a little cleaner)
//   response = response.data.artObjects

//   console.log(response)
//   // set the state to be the value of the response
//   // this.setState({
//   //   art: response
//   // })
// })

  
}
// APP END

export default App;


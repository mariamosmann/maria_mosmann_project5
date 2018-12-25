import React, { Component } from 'react';
import "./styles/style.scss";

//CORRECT THIS
import firebase from "./firebase.js";
import UserList from "./components/UserList.js";
import MoreInfo from "./components/MoreInfo.js";
import messages from "./messages.js";
import monster from "./assets/monster.svg";
import bubble from "./assets/bubble.svg";

//VARIABLES

//auth
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

//angstl messages
let messageIndex = 0;

//WORK ON DISPLAYING INFO IF USER IS LOGED IN AND ALSO GUEST MODE + email auth

// APP START
class App extends Component {
  // CONSTRUCTOR START
  constructor() {
    super();
    this.state = {
      //user info
      user: null, //default because we need to log in to use the page
      //user to do list
      doable1: "",
      doable2: "",
      dailyGoal: "",
      //information sent to firebase is stored here when firebase returns the info, it has to have the same structure or react will be faster than firebase and will try to retrieve info that firebase didn't had time to return yet
      dbRef: {
        doable1: "",
        doable2: "",
        dailyGoal: "", 
      },
      //more info button
      infoButton: false,
      buttonText: "More About Anxiety Disorders",
      //bubble messages
      message: messages[messageIndex]   
      }
    }
  
  // CONSTRUCTOR END

  //FUNCTIONS START

  //Handle Change
  //value being typed updating the respective state property in constructor
  handleChange = (event) => {       
    //updating state using the id of the input where the user is typing, id is the same as its correspondent key in state
    this.setState({
      [event.target.id]: event.target.value
    }) 
  }

  //Handle Submit
  //submitting user entries
  handleSubmit = (event) => {
    //preventing the form from refreshing the page
    event.preventDefault();

    //making a variable to store the data that will be sent to firebase
    const updateList = {
      doable1: this.state.doable1,
      doable2: this.state.doable2, 
      dailyGoal: this.state.dailyGoal
    };

    //sending the info to firebase
    //using set so the user updates the list instead of creating a new list
    this.dbRef.set(updateList);

    //clearing form and state
    this.setState({
      doable1: "",
      doable2: "",
      dailyGoal: ""
    })
  }

  //login
  logIn = () => {
    //signing in with a pop up and passing provider as an argument 
    //when user clicks log in use method signInWithPopup (provided by Firebase)  
    auth.signInWithPopup(provider).then((result) => { //result is the user info
      this.setState({
        user: result.user //the user info
      });
    });    
  }

  //logout
  logOut = () => {
    //when user clicks log out use method signOut (provided by firebase) 
    //set user state back to null
    auth.signOut().then(() => {
      this.setState({
        user: null //back to default
      })
    })
  }

  //Reset List
  //reseting whole list
  resetList = () => {

    //making a variable to store empty values to be sent to firebase
    const newList = {
      doable1: "",
      doable2: "",
      dailyGoal: ""
    }

    //updating firebase with the empty object
    this.dbRef.set(newList);    
  }

  //Button click
  //setting the button so it can display or hide MoreInfo component
  buttonClick = (event) => {
    //preventing the button from refreshing the page
    event.preventDefault();

    console.log(this.state.user);
    //changing the button text
    if (this.state.infoButton === false) {
      this.setState({
        infoButton: true,
        buttonText: "Hide Information"
      })
    } else if (this.state.infoButton === true) {
      this.setState({
        infoButton: false,
        buttonText: "More About Anxiety Disorders"
      })
    }
  }

  // Change Message
  // changing the mascot message
  changeMessage = () => {     

    const messagesLength = messages.length - 1;

    if (messageIndex < messagesLength) {
      messageIndex = messageIndex + 1;
      this.setState({
        message: messages[messageIndex]
      })
    } else if (messageIndex === messagesLength) {
      messageIndex = 0; //going back to the first message
      this.setState({
        message: messages[messageIndex]
      })
    }   
  }  
  //FUNCTIONS END

  // RENDER START
  render() {
    return (      
      <div className="App">      

      {/* HEADER START */}
      <header className="header">
        <div className="header__wrapper wrapper">
          {/* LOGIN START */}
          {
            this.state.user
              ? (
                <div className="header__logInOut">
                  <button className="header__button" onClick={this.logOut}>Logout</button>
                </div>)
              : (
                <div className="header__logInOut">
                  <button className="header__button" onClick={this.logIn}>Login</button>
                </div>)
          }
          {/* LOGIN END */}

          <div className="header__headingContainer">
            <h1 className="header__heading"><span className="header__heading header__heading--color">I CAN</span> Do List</h1>

            <h2 className="header__heading header__heading--small">A <span className="header__heading header__heading--color header__heading--small">POSITIVE</span> To Do List</h2>
          </div>
        </div>
      </header>
      {/* HEADER END */} 

      {/* MAIN START */}
      <main className="main">  

        {/* LOGIN START */}
        {
          this.state.user
            ? (
              <section className="greeting">
                  <h2 className="greeting__heading">It's good to see you, {this.state.firstName}!</h2>
              </section>)
            : (
                <section className="greeting">
                  <h2 className="greeting__heading">Welcome, friend!</h2>
              </section>)
        }
        {/* LOGIN END */}        

        {/* USER ENTRIES START */}
        <section className="userEntries">

          {/* USER ENTRIES WRAPPER START */}
          <div className="userEntries__wrapper wrapper">
            <h2 className="userEntries__heading">Shifting the <span className="userEntries__heading userEntries__heading--color">focus</span></h2>

            <p className="userEntries__text">People affected by an Anxiety Disorder already know the cycle: make a huge to do list, get overwhelmed by it, do nothing, hate yourself, repeat. If this cycle looks familiar, then this list is for you!</p>

            <p className="userEntries__text">It was designed using common tools for fighting anxiety: do one task at a time, limit the length of your to do list, shift the focus from things that you have to do to things that you can do, and stay positive.</p>  

            <p className="userEntries__text">No matter what you accomplish today, you're doing great!</p>

            {/* MORE INFO START */}
            <div className="userEntries__moreInfo moreInfo">
              <button
                className="moreInfo__button button" onClick={this.buttonClick}>{this.state.buttonText}</button>
              {/* displaying more info about anxiety */}
              <MoreInfo
                infoButton={this.state.infoButton}
              />
            </div>
            {/* MORE INFO END */}       
          </div>
          {/* USER ENTRIES WRAPPER END */}
          
          {/* FORM START */}
          <form onSubmit={this.handleSubmit} action="" className="userEntries__form form">

            {/* FORM WRAPPER START */}
            <div className="form__wrapper wrapper">
              <h2 className="form__heading">Today...</h2>

              <label htmlFor="doable1" className="form__label"><span className="form__label form__label--color">I can</span>  finish this task:</label>
              <input required
                type="text"
                onChange={this.handleChange}
                id="doable1"
                className="form__field"
                value={this.state.doable1}
              />

              <label htmlFor="doable2" className="form__label"><span className="form__label form__label--color">If</span> I'm done with the first task I'll <span className="form__label form__label--color">focus</span> on doing this:</label>
              <input required
                type="text"
                onChange={this.handleChange}
                id="doable2"
                className="form__field"
                value={this.state.doable2}
              />

              <label htmlFor="dailyGoal" className="form__label">This task scares me but <span className="form__label form__label--color">I'll try my best</span> to accomplish it today:</label>
              <input required
                type="text"
                onChange={this.handleChange}
                id="dailyGoal"
                className="form__field form__field--margin"
                value={this.state.dailyGoal}
              />

              <input type="submit" value="You've got this!" className="form__submit button"/>
            </div>
            {/* FORM WRAPPER END */}

          </form>
          {/* FORM END */}

        </section>
        {/* USER ENTRIES END */}

        {/* USER LIST START */}
        <section className="userList">
          {/* where user list will be displayed */}
          <UserList         
          dbRef={this.state.dbRef}
          resetList={this.resetList}
          />          
        </section>
        {/* USER LIST END */}

        </main>
      {/* MAIN END */}

      {/* MASCOT START */}
      <section className="mascot">
        <div className="mascot__wrapper wrapper">

          {/* MASCOT TEXT BUBBLE START */}

          {/* BUBBLE START */}
          <div className="mascot__textBubble">
            <div className="mascot__bubbleContainer">
              <img src={bubble} alt="A square speech bubble." className="mascot__bubble"/>
            </div>
            {/* BUBBLE END */}

            {/* MESSAGE START */}
            <div className="mascot__messages">
              <p className="mascot__text">
                {this.state.message}
              </p>
            </div>
            {/* MESSAGE END */}

          </div>
          {/* MASCOT TEXT BUBBLE END */}
          
          {/* MASCOT IMAGE START */}
          <div className="mascot__imageContainer">
            <img src={monster} alt="Friendly furry monster with two horns and a big smile." className="mascot__image" onClick={this.changeMessage}/>
          </div>
          {/* MASCOT IMAGE END */}            
        </div>
      </section>
      {/* MASCOT END */}

      {/* FOOTER START */}
      <footer className="footer">
        {/* FOOTER WRAPPER START */}
        <div className="footer__wrapper wrapper">
          <p className="footer__text">Developed by  
          <a href="http://tuni.tech" target="_blank" className="footer__link footer__link--inline"> Tuni</a> | 2018</p>

          <a href="https://thenounproject.com/visuadio/" className="footer__link" target="_blank">Ribbon SVG by Felipe Alvarado from the Noun Project</a>

          <a href="https://thenounproject.com/made.somewhere/collection/speech-bubble/" className="footer__link" target="_blank">Speech mark SVG by Made by Made from the Noun Project</a>

          <a href="https://thenounproject.com/vectorsmarket/collection/cute-funny-monster-characters/" className="footer__link" target="_blank">Greek Monster SVG by Vectors Market from the Noun Project</a>  
        </div>
        {/* FOOTER WRAPPER END */}
      </footer>
      {/* FOOTER END */}        

      </div>
    );
  }
  // RENDER END

  //COMPONENT DID MOUNT START
  componentDidMount() {
    //onAuthStateChanged checks if there is an user logged in (method provided by Firebase)
    auth.onAuthStateChanged((user) => {
      if (user) { //checking if user is logged in or had logged in recently
        this.setState({
          user: user,
        },
        () => {
          //user's name
          const fullName = this.state.user.displayName.split(" ");
          const firstName = fullName[0];

          //id specific to that user
          this.dbRef = firebase.database().ref(`/${this.state.user.uid}`); //it's creating dbref in state

          //attaching our event listener to firebase, everytime there's a change, update
          this.dbRef.on("value", snapshot => {
            //check to see if snapshot.val() is null, if it is, we need to set state to an empty object, if it's got data, set the state to snapshot.val()
            this.setState({
              dbRef: snapshot.val() || {}, //if its null set to an empty object
              firstName: firstName
            })
          });
        })
      }      
    }) 
  }
  //COMPONENT DID MOUNT END

  //turning off the event listener, so when an user logs in it'll not see info from another user
  componentWillUnmount() {
    if (this.dbRef) {
      this.dbRef.off();
    }
  }

}
// APP END

export default App;


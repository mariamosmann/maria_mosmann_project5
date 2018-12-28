import React, { Component } from 'react';
import "./styles/style.scss";
import firebase from "./firebase.js";
import About from "./components/About.js";
import UserList from "./components/UserList.js";
import messages from "./messages.js";
import monster from "./assets/monster.svg";
import bubble from "./assets/bubble.svg";

//VARIABLES

//auth
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

//angstl messages
let messageIndex = 0;

//guest mode
//email login
//add messages API
//router
//anxiety journal
//home text
//fix styles
//make menu sticky once it reaches the top

// APP START
class App extends Component {
  // CONSTRUCTOR START
  constructor() {
    super();
    this.state = {
      //user info
      user: null, //default because we need to log in to use the page
      greetingName: null,
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

    if (this.state.doable1.trim() === "" || this.state.doable2.trim() === "" || this.state.dailyGoal.trim() === "") {
      alert("Please enter a task.");
    } else {
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

  //guest login
  guest = () => {
    auth.signInAnonymously().then((result) => {
      this.setState({
        user: result.user,
        greetingName: "Guest"
      });
    })
  }

  //logout
  logOut = () => {
    //when user clicks log out use method signOut (provided by firebase) 
    //set user state back to null
    auth.signOut().then(() => {
      this.setState({
        user: null, //back to default
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
      // APP START      
      <div className="App">     
      {/* HEADER START */}
      <header className="header">
        {/* LOGIN START */}
        {
          this.state.user 
          ? (
          <div className="header__logInOut">
            <button className="header__button button button--simple" onClick={this.logOut}>Logout</button>
          </div>
          )
          : (
          <div className="header__logInOut">
              <button className="header__button button button--simple" onClick={this.logIn}>Login</button>

              <button className="header__button button button--simple button--color" onClick={this.guest}>Guest</button>
          </div>
          )
        }
        {/* LOGIN END */}

        <div className="header__wrapper wrapper">      
          <div className="header__headingContainer">
            <h1 className="header__heading"><span className="header__heading header__heading--color">I CAN</span> Do List</h1>

            <h2 className="header__heading header__heading--small">A <span className="header__heading header__heading--color header__heading--small">POSITIVE</span> To Do List</h2>
          </div>
        </div>
      </header>
      {/* HEADER END */} 

      {/* NAV START */}
      <nav className="nav">
        <div className="nav__wrapper wrapper">

          {/* MENU START */}
          <ul className="nav__menu">
            <li className="nav__item">
              <a href="#" className="nav__link">Home</a>
            </li>

            <li className="nav__item">
              <a href="#" className="nav__link">List</a>
            </li>

            <li className="nav__item">
              <a href="#" className="nav__link">Journal</a>
            </li>

            <li className="nav__item">
              <a href="#" className="nav__link">About</a>
            </li>
          </ul>
          {/* MENU END */}

          {/* GREETING START */}
          {
            this.state.user 
              ? (
              <div className="nav__greeting">
                <h2 className="nav__heading">It's good to see you, <span className="nav__span">{this.state.greetingName}</span>!</h2>
              </div>
              )
              : (
              <div className="nav__greeting">
                <h2 className="nav__heading">Welcome, friend!</h2>
              </div>
              )
          }
          {/* GREETING END */}    
        </div>
      </nav>
      {/* NAV END */}

      {/* MAIN START */}
      <main className="main">
        {/* HOME START */}
        <section className="home">
          <div className="home__wrapper wrapper">
            <h2 className="home__heading">Intro</h2>

            <p className="home__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil quas error eveniet excepturi ducimus, id consequatur, accusamus nulla consequuntur officia perspiciatis aperiam asperiores, veritatis quisquam? Enim mollitia at earum molestias.</p>

            <p className="home__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nisi libero reiciendis consequuntur illum asperiores magni est maiores, corporis officiis excepturi error sequi quia ex. Maiores molestiae dicta sed consectetur eveniet illum, minima, quasi, soluta ipsam aliquid consequuntur. Iure inventore consequatur, maiores nulla est nostrum officia officiis sint mollitia optio aliquam fugiat sequi similique delectus. Ex nobis modi rem sit dignissimos ut mollitia ratione neque accusamus impedit beatae harum eius dolorum, earum repellat ullam eveniet, eligendi, error ipsa culpa vel pariatur nostrum! Mollitia commodi animi, architecto necessitatibus modi iste alias sunt minima, id minus itaque eaque? Perferendis sit numquam quidem?</p>
          </div>
        </section>
        {/* HOME END */}
          
        {/* USER LIST START */}
        <section className="userList">
          {/* FORM START */}
          {
            this.state.user 

              ? (
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

                    <input type="submit" value="You've got this!" className="form__submit button" />
                  </div>
                  {/* FORM WRAPPER END */}

                </form>
              )
              : (
                <form className="userEntries__form form form--empty">
                </form>
              )
          }
          {/* FORM END */}

          {/* where user list will be displayed */}
          <UserList         
          dbRef={this.state.dbRef}
          resetList={this.resetList}
          />          
        </section>
        {/* USER LIST END */}

        {/* JOURNAL START */}
        <section className="journal">
          <div className="journal__wrapper wrapper">
            <h2 className="journal__heading">My Anxiety Journal</h2>
          </div>
        </section>
        {/* JOURNAL END */}

        {/* ABOUT START */}
        <About />
        {/* ABOUT END */}

        {/* MASCOT START */}
        <section className="mascot">
          <div className="mascot__wrapper wrapper">

            {/* MASCOT TEXT BUBBLE START */}

            {/* BUBBLE START */}
            <div className="mascot__textBubble">
              <div className="mascot__bubbleContainer">
                <img src={bubble} alt="A square speech bubble." className="mascot__bubble" />
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
              <img src={monster} alt="Friendly furry monster with two horns and a big smile." className="mascot__image" onClick={this.changeMessage} />
            </div>
            {/* MASCOT IMAGE END */}
          </div>
        </section>
        {/* MASCOT END */}
        </main>
      {/* MAIN END */}

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
      // APP END
    );
  }
  // RENDER END

  //COMPONENT DID MOUNT START
  componentDidMount() {
    //onAuthStateChanged checks if there is an user logged in (method provided by Firebase)
    auth.onAuthStateChanged((user) => {
      if (user) { //checking if user is logged in or had logged in recently
        this.setState({
          user: user
        },
        () => {
          //user's name
          if (this.state.greetingName !== "Guest") {
            const fullName = this.state.user.displayName.split(" ");
            const firstName = fullName[0];

            this.setState({
              greetingName: firstName
            })
          }      

          //id specific to that user
          this.dbRef = firebase.database().ref(`/${this.state.user.uid}`); //it's creating dbref in state

          //attaching our event listener to firebase, everytime there's a change, update
          this.dbRef.on("value", snapshot => {
            //check to see if snapshot.val() is null, if it is, we need to set state to an empty object, if it's got data, set the state to snapshot.val()
            this.setState({
              dbRef: snapshot.val() || {}, //if its null set to an empty object  
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


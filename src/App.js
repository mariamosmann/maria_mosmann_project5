import React, { Component } from 'react';
import "./styles/style.scss";
import firebase from "./firebase.js";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import About from "./components/About.js";
import ToDo from "./components/ToDo.js";
import Journal from "./components/Journal.js";
import messages from "./messages.js";
import monster from "./assets/monster.svg";
import bubble from "./assets/bubble.svg";

//VARIABLES

//auth
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

//angstl messages
let messageIndex = 0;

//router -- next!
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
      //bubble messages
      message: messages[messageIndex]   
      }
    }
  
  // CONSTRUCTOR END

  //FUNCTIONS START

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
        user: result.user
      });
    })
  }

  //logout
  logOut = () => {
    //when user clicks log out use method signOut (provided by firebase) 
    //set user state back to null
    auth.signOut().then(() => {
      this.setState({
        user: null,
        greetingName: null, 
        dbRef: {
          doable1: "",
          doable2: "",
          dailyGoal: "",
        },
        dbRefJournal: {}        
      })
    })
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
      //ROUTER START
      <Router>
      {/* APP START */}
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
          {
            this.state.user 
            ? (
              <div className="home__wrapper wrapper">
                <h2 className="home__heading">Heading w/ user</h2>

                <p className="home__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil quas error eveniet excepturi ducimus, id consequatur, accusamus nulla consequuntur officia perspiciatis aperiam asperiores, veritatis quisquam? Enim mollitia at earum molestias.</p>
              </div>
            ) 
            : (
              <div className="home__wrapper wrapper">
                <h2 className="home__heading">Intro</h2>

                <p className="home__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nisi libero reiciendis consequuntur illum asperiores magni est maiores, corporis officiis excepturi error sequi quia ex. Maiores molestiae dicta sed consectetur eveniet illum, minima, quasi, soluta ipsam aliquid consequuntur. Iure inventore consequatur, maiores nulla est nostrum officia officiis sint mollitia optio aliquam fugiat sequi similique delectus. Ex nobis modi rem sit dignissimos ut mollitia ratione neque accusamus impedit beatae harum eius dolorum, earum repellat ullam eveniet, eligendi, error ipsa culpa vel pariatur nostrum! Mollitia commodi animi, architecto necessitatibus modi iste alias sunt minima, id minus itaque eaque? Perferendis sit numquam quidem?</p>
              </div>
            )
          }          
        </section>
        {/* HOME END */}
        
        {/* TO DO LIST START */}
        <Route path="/todo" component={ToDo}/>
        {/* <ToDo 
        user={this.state.user}
        /> */}
        {/* TO DO LIST END */}

        {/* JOURNAL START */}
        <Route path="/journal" component={Journal}/>
        {/* <Journal 
        user={this.state.user}
        /> */}
        {/* JOURNAL END */}

        {/* ABOUT START */}
        <Route path="/about" component={About}/>
        {/* <About /> */}
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
          <a href="http://tuni.tech" target="_blank" className="footer__link footer__link--inline"> Tuni</a> | Ver. 1.2 | 2019</p>

          <a href="https://thenounproject.com/visuadio/" className="footer__link" target="_blank">Ribbon SVG by Felipe Alvarado from the Noun Project</a>

          <a href="https://thenounproject.com/made.somewhere/collection/speech-bubble/" className="footer__link" target="_blank">Speech mark SVG by Made by Made from the Noun Project</a>

          <a href="https://thenounproject.com/vectorsmarket/collection/cute-funny-monster-characters/" className="footer__link" target="_blank">Greek Monster SVG by Vectors Market from the Noun Project</a>  
        </div>
        {/* FOOTER WRAPPER END */}
      </footer>
      {/* FOOTER END */} 
      </div>
      {/* APP END */}
      </Router>
      //ROUTER END
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
          if (this.state.user.displayName !== null) {
            const fullName = this.state.user.displayName.split(" ");
            const firstName = fullName[0];

            this.setState({
              greetingName: firstName
            })
          } else {
            this.setState({
              greetingName: "Guest"
            })
          }      

          //id specific to that user
          this.dbRef = firebase.database().ref(`/${this.state.user.uid}`); //it's creating dbref in state
          this.dbRefJournal = firebase.database().ref(`/${this.state.user.uid}/journal`);

          //attaching our event listener to firebase, everytime there's a change, update
          this.dbRef.on("value", snapshot => {
            //check to see if snapshot.val() is null, if it is, we need to set state to an empty object, if it's got data, set the state to snapshot.val()
            this.setState({
              dbRef: snapshot.val() || {}, //if its null set to an empty object  
            })
          })
          
          this.dbRefJournal.on("value", snapshot => {

            if (snapshot.val()) {
              const journalArray = Object.entries(snapshot.val())

              this.setState({
                dbRefJournal: journalArray 
              })
            } else {
              this.setState({
                dbRefJournal: []
              })
            }            
          });
        })
      }      
    }) 
  }
  //COMPONENT DID MOUNT END

  //turning off the event listener, so when an user logs in it'll not see info from another user
  // componentWillUnmount() {
  //   if (this.dbRef) {
  //     this.dbRef.off();
  //   }

  //   if(this.dbRefJournal) {
  //     this.dbRefJournal.off();
  //   }
  // }
}
// APP END

export default App;


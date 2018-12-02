import React, { Component } from 'react';
import "./styles/style.scss";
import firebase from "./components/firebase.js";
import UserList from "./components/UserList.js";
import MoreInfo from "./components/MoreInfo.js";
import messages from "./components/messages.js";
import monster from "./assets/monster.svg";
import bubble from "./assets/bubble.svg"; 

const dbRef = firebase.database().ref("dtbList"); 
let messageIndex = 0;

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
      //information sent to firebase is stored here when firebase returns the info
      dtbList: "",
      //  {
      //   doable1: {
      //     task: "",
      //   },

        doable2: "",
        // {
        //   task: "",
        // },
        dailyGoal: "", 
        // {
        //   task: "",
        // }
      // },
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

    // console.log(event.target.value); //just checking if I connected everything right

    //updating state using the id of the input where the user is typing
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
      // {
      //   task: this.state.doable1,
      // },

      doable2: this.state.doable2, 
      // {
      //   task: this.state.doable2,
      // },
      dailyGoal: this.state.dailyGoal
      // {
      //   task: this.state.dailyGoal,
      // }
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
      doable1: "",
      // {
      //   task: "",
      // },

      doable2: "",
      // {
      //   task: "",
      // },
      dailyGoal: ""
      // {
      //   task: "",
      // }
    }

    //updating firebase with the empty object
    dbRef.set(newList);    
  }

  //Button click
  //setting the button so it can display or hide MoreInfo component
  buttonClick = (event) => {
    //preventing the button from refreshing the page
    event.preventDefault();

    if (this.state.infoButton == false) {
      this.setState({
        infoButton: true,
        buttonText: "Hide Information"
      })
    } else if (this.state.infoButton == true) {
      this.setState({
        infoButton: false,
        buttonText: "More About Anxiety Disorders"
      })
    }
  }

  changeMessage = () => {     

    const messagesLength = messages.length - 1;

    if (messageIndex < messagesLength) {
      messageIndex = messageIndex + 1;
      this.setState({
        message: messages[messageIndex]
      })
    } else if (messageIndex = messagesLength) {
      messageIndex = 0;
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
          <h1 className="header__heading"><span className="header__heading header__heading--color">I CAN</span> Do List</h1>

          <h2 className="header__heading header__heading--small">A <span className="header__heading header__heading--color header__heading--small">POSITIVE</span> To Do List</h2>
        </div>
      </header>
      {/* HEADER END */} 

      {/* CONTENT START */}
      <div className="content">

        {/* MAIN START */}
        <main className="main">          

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
                <label htmlFor="doable1" className="form__label"><span className="form__label form__label--color">I can</span>  finish this task today:</label>
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
            doable1={this.state.dtbList.doable1}
            doable2={this.state.dtbList.doable2}
            dailyGoal={this.state.dtbList.dailyGoal} 
            resetList={this.resetList}
            />          
          </section>
          {/* USER LIST END */}

          </main>
        {/* MAIN END */}

        {/* MASCOT START */}
        <aside className="mascot">
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
        </aside>
        {/* MASCOT END */}

      </div> 
      {/* CONTENT END */}

      {/* FOOTER START */}
      <footer className="footer">
        {/* FOOTER WRAPPER START */}
        <div className="footer__wrapper wrapper">
          <p className="footer__text">Developed by  
          <a href="http://tuni.tech" target="_blank" className="footer__link footer__link--inline"> Tuni</a> | 2018</p>

          <a href="https://thenounproject.com/made.somewhere/collection/speech-bubble/" className="footer__link" target="_blank">Speech square SVG by Made by Made from the Noun Project</a>

          <a href="https://thenounproject.com/vectorsmarket/collection/cute-funny-monster-characters/" className="footer__link" target="_blank">Greek Monster SVG by Vectors Market from the Noun Project</a>

          <a href="https://thenounproject.com/visuadio/" className="footer__link" target="_blank">Ribbon SVG by Felipe Alvarado from the Noun Project</a>
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
    //attach event listenet to firebase
    dbRef.on("value", snapshot => {
      this.setState({
        dtbList: snapshot.val()
      })
    })  
  }
  //COMPONENT DID MOUNT END

}
// APP END

export default App;


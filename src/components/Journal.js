import React, { Component } from "react";
import firebase from "../firebase.js";
import UserJournal from "./UserJournal.js"

//VARIABLES
const auth = firebase.auth();

//COMPONENT START
class Journal extends Component {
    //CONSTRUCTOR START
    constructor() {
        super();
        this.state = {
            //user Journal
            situation: "",
            feelings: "",
            physicalReaction: "",
            anxietyLevel: "",
            notes: "",
            //information sent to firebase is stored here
            dbRefJournal: []
        }
    }
    //CONSTRUCTOR END

    //FUNCTIONS START

    //Handle Change
    //value being typed updating the respective state property in constructor
    handleChange = (event) => {
        //updating state using the id of the input where the user is typing, id is the same as its correspondent key in state
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleChecked = (event) => {
        this.setState({
            anxietyLevel: event.target.value
        })
    }

    //Handle Submit Journal
    //submitting Journalentries
    handleSubmitJournal = (event) => {
        event.preventDefault();

        if (this.state.situation.trim() === "" || this.state.feelings.trim() === "" || this.state.physicalReaction.trim() === "") {
            alert("I know it's hard, but please try your best to fill all fields.");
        } else {

            //making a variable to store the data that will be sent to firebase
            const newJournalEntry = {
                date: new Date().toDateString(),
                situation: this.state.situation,
                feelings: this.state.feelings,
                physicalReaction: this.state.physicalReaction,
                anxietyLevel: this.state.anxietyLevel,
                notes: this.state.notes
            };

            this.dbRefJournal.push(newJournalEntry);

            this.setState({
                situation: "",
                feelings: "",
                physicalReaction: "",
                anxietyLevel: "",
                notes: "",
            });
        }
    }
    
    //FUNCTIONS END

    // RENDER START
    render () {
        return (
            <section className="journal">
                {
                    this.props.user
                        ? (
                            // JOURNAL USER ENTRIES START
                            <div className="userEntries">
                                <div className="userEntries__wrapper wrapper">
                                    <h2 className="userEntries__heading">My Anxiety Journal</h2>

                                    <p className="userEntries__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quis id doloribus natus alias dolorem dolores dicta. Incidunt aperiam assumenda soluta officia. Sit molestias quae libero quia quas fugiat minima.</p>

                                    {/* JOURNAL FORM START */}
                                    <form onSubmit={this.handleSubmitJournal} action="" className="userEntries__form form">
                                        <label htmlFor="situation" className="form__label">Today I felt anxious when:</label>
                                        <input required
                                            type="text"
                                            onChange={this.handleChange}
                                            id="situation"
                                            className="form__field"
                                            value={this.state.situation}
                                            placeholder="Describe what was happening."
                                        />

                                        <label htmlFor="feelings" className="form__label">When this happened it made me feel:</label>
                                        <input required
                                            type="text"
                                            onChange={this.handleChange}
                                            id="feelings"
                                            className="form__field"
                                            value={this.state.feelings}
                                            placeholder="Describe your thoughts and emotions at that moment."
                                        />

                                        <label htmlFor="physicalReaction" className="form__label">I also had these physical reactions:</label>
                                        <input required
                                            type="text"
                                            onChange={this.handleChange}
                                            id="physicalReaction"
                                            className="form__field"
                                            value={this.state.physicalReaction}
                                            placeholder="Describe how did you feel."
                                        />

                                        <p className="form__text">On a scale from 1 to 5 my anxiety level was:</p>
                                        <div className="form__levels">
                                            <label htmlFor="level1" className="form__label">1</label>
                                            <input
                                                type="radio"
                                                onChange={this.handleChecked}
                                                name="level"
                                                id="level1"
                                                className="form__radio"
                                                value="1"
                                            />

                                            <label htmlFor="level2" className="form__label">2</label>
                                            <input
                                                type="radio"
                                                onChange={this.handleChecked}
                                                name="level"
                                                id="level2"
                                                className="form__radio"
                                                value="2"
                                            />

                                            <label htmlFor="level3" className="form__label">3</label>
                                            <input
                                                type="radio"
                                                onChange={this.handleChecked}
                                                name="level"
                                                id="level3"
                                                className="form__radio"
                                                value="3" />

                                            <label htmlFor="level4" className="form__label">4</label>
                                            <input
                                                type="radio"
                                                onChange={this.handleChecked}
                                                name="level"
                                                id="level4"
                                                className="form__radio"
                                                value="4" />

                                            <label htmlFor="level5" className="form__label">5</label>
                                            <input
                                                type="radio"
                                                onChange={this.handleChecked}
                                                name="level"
                                                id="level5"
                                                className="form__radio"
                                                value="5" />
                                        </div>

                                        <p className="form__text"><span className="form__span">Optional:</span> now that this moment had passed you can try to reason what happened if you want to. When you look back, how much of what made you anxious was real and how much was the voice of your anxiety? If it was someone else in your shoes, what would you say to comfort them? Try to express your thoughts. You can also use this space to take extra notes.</p>
                                        <label htmlFor="notes" className="form__label">Next time this happens I'll try to remind myself that...</label>
                                        <input
                                            type="text"
                                            onChange={this.handleChange}
                                            id="notes"
                                            className="form__field"
                                            value={this.state.notes}
                                            placeholder="Extra notes."
                                        />

                                        <input type="submit" value="Save" className="form__submit button" />
                                    </form>
                                    {/* JOURNAL FORM END */}
                                </div>
                            </div>
                            // JOURNAL USER ENTRIES END
                        )
                        : (
                            <div className="userEntries userEntries--empty">
                            </div>
                        )
                }

                {/* JOURNAL DISPLAY START */}
                <UserJournal
                    dbRefJournal={this.state.dbRefJournal}
                />
            </section>
        )
    }
    //RENDER END

    //COMPONENT DID MOUNT START
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            //id specific to that user
            this.dbRefJournal = firebase.database().ref(`/${user.uid}/journal`);

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
    //COMPONENT DID MOUNT END

    //COMPONENT WILL UNMOUNT START
    //turning off the event listener, so when an user logs in it'll not see info from another user
    componentWillUnmount() {
        if (this.dbRefJournal) {
            this.dbRefJournal.off();
        }
    }
    //COMPONENT WILL UNMOUNT END
}

export default Journal;
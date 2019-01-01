import React, { Component } from 'react';

class UserJournal extends Component {
    // CONSTRUCTOR START
    constructor() {
        super();
        this.state = {
        }
    }
    // CONSTRUCTOR END

    // FUNCTIONS START


    // FUNCTIONS END

    // RENDER START
    render() {
        return (
            this.props.dbRefJournal[0]
            ? (
            <div className="UserJournal">
                <div className="userJournal__wrapper wrapper">
                    <h2 className="userJouranl__heading">My Anxiety Journal</h2>

                    {
                    this.props.dbRefJournal.map((entry) => {
                        return (
                            <div className="userJournal__entry entry" key={entry[0]}>
                                <p className="entry__date">Date: {entry[1].date}</p>

                                <p className="entry__situation">Situation: {entry[1].situation}</p>
                      
                                <p className="entry__feelings">Feelings: {entry[1].feelings}</p>
                               
                                <p className="entry__physicalReaction">Physical Reaction: {entry[1].physicalReaction}</p>

                                {
                                    entry[1].anxietyLevel 
                                    ? (
                                    <p className="entry__scale">Anxiety Level: {entry[1].anxietyLevel}</p>
                                    )
                                    : (
                                    <p className="entry__scale entry__scale--empty"></p>
                                    )
                                }
                                
                                {
                                    entry[1].notes 
                                    ? (
                                    <p className="entry__notes">Notes: {entry[1].notes}</p>
                                    )
                                    : (
                                    <p className="entry__notes"></p>
                                    )
                                }

                                
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            )
            : (
            <div className="journal__wrapper--empty wrapper">
            </div>
            )
        )
    }
    // RENDER END
}

export default UserJournal;
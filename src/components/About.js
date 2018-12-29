import React, { Component } from 'react';
import MoreInfo from "./MoreInfo.js";

class About extends Component {
    // CONSTRUCTOR START
    constructor() {
        super();
        this.state = {
            //more info button
            infoButton: false,
            buttonText: "More About Anxiety Disorders",
        }
    }
    // CONSTRUCTOR END

    //FUNCTIONS

    //Button click
    //setting the button so it can display or hide MoreInfo component
    buttonClick = (event) => {
        //preventing the button from refreshing the page
        event.preventDefault();

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

    // RENDER START
    render() {
        return (
            <section className="about">
                <div className="about__wrapper wrapper">
                    <h2 className="about__heading">Shifting the <span className="about__heading about__heading--color">focus</span></h2>

                    <p className="about__text">People affected by an Anxiety Disorder already know the cycle: make a huge to do list, get overwhelmed by it, do nothing, hate yourself, repeat. If this cycle looks familiar, then this list is for you!</p>

                    <p className="about__text">It was designed using common tools for fighting anxiety: do one task at a time, limit the length of your to do list, shift the focus from things that you have to do to things that you can do, and stay positive.</p>

                    <p className="about__text">No matter what you accomplish today, you're doing great!</p>

                    {/* MORE INFO START */}
                    <div className="about__moreInfo moreInfo">
                        <button
                            className="moreInfo__button button" onClick={this.buttonClick}>{this.state.buttonText}</button>
                        {/* displaying more info about anxiety */}
                        <MoreInfo
                            infoButton={this.state.infoButton}
                        />
                    </div>
                    {/* MORE INFO END */}
                </div>
            </section>
        )
    }
}

export default About;
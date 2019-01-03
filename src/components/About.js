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
                    <h2 className="about__h2">About this<span className="about__h2 about__h2--color"> project</span></h2>

                    <p className="about__text">Every little thing is hard when you are affected by anxiety.</p>

                    <p className="about__text">This project was developed while I was in <a href="https://hackeryou.com/" target="_blank" className="about__link">HackerYou</a> bootcamp. As we were approaching our final weeks everyone was feeling anxious and overwhelmed. The amount of coffee intake was growing exponentially, while the sleeping hours were decreasing by the same rate. I, a normally positive and cheerful person, was feeling down and terrably anxious. And then it hit me: excess of caffeine and lack of sleep! My triggers. I knew exactly how to go back to my normal self, and what kind of project I wanted to build next.</p>

                    <p className="about__text">When I started the program I wanted to develop a project that I could keep working on after bootcamp. Something useful in the real world and that I cared about. Experiencing anxiety again reminded me how terrible it can be, and how simple habits can rewire your brain in the best way possible. I used to be a very anxious person. I also have friends who are affected by Anxiety Disorders, so if it was awful for me, I can only imagine what is like for them. In an effort to help them better, and also help me, I started researching about anxiety and what can be done to alleviate that.</p>

                    <p className="about__text">There are plenty of tools, some work better than the others, it's a really personal matter and I advise trying them all. As this project develops I'll add some of my favourites.</p>

                    <p className="about__text">If you're interested in collaborating in this project, please contact me! This is a work in progress, as we all should be.</p>

                    

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
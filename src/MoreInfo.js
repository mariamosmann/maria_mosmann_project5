import React from 'react';
import ribbon from "./assets/ribbon.svg";


//TO DO: create info

const MoreInfo = (props) => {

    // FUNCTIONS START

    // Display Info
    // Function for displaying more info if the user clicked the button
    const displayInfo = () => {
        if (props.infoButton == false) {
            return(
                <div className="moreInfo__textContainer moreInfo__textContainer--empty">
                </div>
            )
        } else if (props.infoButton == true) {
            return (
                <div className="moreInfo__textContainer">
                    <h2 className="moreInfo_heading">Anxiety Disorder</h2>

                    <h3 className="moreInfo__heading moreInfo__heading--h3">Text from the <a href="https://cmha.ca/" className="moreInfo__link" target="_blank">Canadian Mental Health Association</a></h3>                    

                    <p className="moreInfo__text">We all feel nervous or worried at times. This anxiety can be a helpful feeling when it motivates us or warns us of danger. An anxiety disorder, on the other hand, causes unexpected or unhelpful anxiety that seriously impacts our lives, including how we think, feel, and act.</p>

                    <p className="moreInfo__text">Anxiety disorders can affect anyone at any age, and they are the most common mental health problem. Sometimes, anxiety disorders are triggered by a specific event or stressful life experience. Anxiety disorders may be more likely to occur when we have certain ways of looking at things (like believing that everything must be perfect) or learn unhelpful coping strategies from others. But sometimes there just doesn’t seem to be a reason.</p>

                    <p className="moreInfo__text">Many people who experience an anxiety disorder think that they should just be able to ‘get over it’ on their own. Others may need time to recognize how deeply anxiety affects their life. However, anxiety disorders are real illnesses that affect a person’s well-being. It’s important to talk to a doctor about mental health concerns. Some physical health conditions cause symptoms of anxiety. A doctor will look at all possible causes of anxiety.</p>

                    <p className="moreInfo__text">The complete text can be found <a href="https://cmha.ca/mental-health/understanding-mental-illness/anxiety-disorders" className="moreInfo__link" target="_blank">here</a>.</p>

                    <h4 className="moreInfo__heading moreInfo__heading--h4">More helpful links:</h4>

                    <a className="moreInfo__link" href="https://www.anxietycanada.com/" target="_blank">Anxiety Canada</a>

                    <a className="moreInfo__link" href="https://www.canada.ca/en/health-canada/services/healthy-living/your-health/diseases/mental-health-anxiety-disorders.html" target="_blank">Government of Canada - Anxiety Disorders</a>

                    <a className="moreInfo__link" href="http://www.anxietydisordersontario.ca/" target="_blank">The Anxiety Disorders Association of Ontario</a>                    

                    <a className="moreInfo__link" href="https://www.health.com/health/gallery/0,,20646990,00.html" target="_blank">12 Signs You May Have an Anxiety Disorder</a>

                    <img src={ribbon} alt="Anxiety Disorder Teal Awareness Ribbon"/>
                </div>
            )
        }
    }
    // FUNCTIONS END

    return(
        displayInfo()
    )
}

export default MoreInfo;
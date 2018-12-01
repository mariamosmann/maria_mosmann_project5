import React from 'react';

const MoreInfo = (props) => {

    // FUNCTIONS START

    //Display Info
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
                    <p className="moreInfo__text">Hey!</p>
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
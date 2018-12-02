import React from 'react';


//TO DO:
//when app starts display a default message
//from time to time display message from message array
//when clicked display random message
//when use finish tasks congratulate them



const Mascot = (props) => {

    // FUNCTIONS START

    // mascot messages
    // display messages when app start and when user clicks on mascot
   

    return (
        <div className="mascot__messages">
            <p className="mascot__text">
                {props.message}
            </p>            
        </div>
    )
}

export default Mascot;
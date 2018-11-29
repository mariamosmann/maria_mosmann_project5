import React from "react";

const UserList = (props) => {  
    const display = function () {
        if(props.doable1 != "") {
            return (
            <div className="userList__wrapper wrapper">
                <h2>User List</h2>

                <p>{props.doable1}</p>

                <p>{props.doable2}</p>

                <p>{props.dailyGoal}</p>

                <input
                    onClick={props.resetList}
                    type="submit"
                    value="Reset the list" className="userList__resetListButton"
                />
                </div>
            )
        } else {
            return (
                <div className="userList__wrapper--empty wrapper">
                </div>
            )
        }
    } 
    
    return (
        display()
        // <div className="userList__wrapper wrapper">
        //     <h2>User List</h2>

        //     <p>{props.doable1}</p>

        //     <p>{props.doable2}</p>

        //     <p>{props.dailyGoal}</p>

        //     <input
        //         onClick={props.resetList}
        //         type="submit"
        //         value="Reset the list" className="userList__resetListButton"
        //     />
        // </div>
    )
}

export default UserList;
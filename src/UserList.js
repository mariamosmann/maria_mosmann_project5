import React from "react";

const UserList = (props) => { 
    const taskDone = function () {
        alert("You did it! Keep up the good work!");
    }
    
    const display = function () {
        if(props.doable1 != "") {
            return (
            <div className="userList__wrapper wrapper">
                <h2>User List</h2>

                    <p className="userList__text" onClick={taskDone}>{props.doable1} <span className="userList__span"><i className="userList__icon far fa-square"></i>
                    </span>
                    </p>

                    <p className="userList__text" onClick={taskDone}>{props.doable2} <span className="userList__span"><i className="userList__icon far fa-square"></i></span></p>

                    <p className="userList__text" onClick={taskDone}>{props.dailyGoal} <span className="userList__span"><i className="userList__icon far fa-square"></i></span></p>

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
    )
}

export default UserList;
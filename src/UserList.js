import React from "react";

const UserList = (props) => {
    return(
        <div className="userList__wrapper wrapper">
            <h2>User List</h2>

            <p>{props.doable1}</p>

            <p>{props.doable2}</p>

            <p>{props.dailyGoal}</p>
        </div>
    )
}

export default UserList;
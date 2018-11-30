import React, { Component } from 'react';

class UserList extends Component { 
    // CONSTRUCTOR START
    constructor() {
        super();
        this.state = {
            
            taskComplete: false
        }
    }
    // CONSTRUCTOR END

    //FUNCTIONS START
    taskDone = (event) => {
        alert("You did it! Keep up the good work!");

        const thisTask = event.target.id 

        console.log(thisTask)

        if(this.state.taskComplete == false) {
            this.setState({
                taskComplete: true
            })
        } else if (this.state.taskComplete == true) {
            this.setState({
                taskComplete: false
            })
        }            
    }
    
    display = () => {
        if(this.props.doable1 != "") {
            return (
            <div className="userList__wrapper wrapper">
                <h2>User List</h2>

                    <p id="doable1" className="userList__text" onClick={this.taskDone}>{this.props.doable1} <span className="userList__span">
                    <i className={
                        this.state.taskComplete
                        ? 
                        "userList__icon far fa-check-square"
                         :
                        "userList__icon far fa-square"
                    }></i>
                    </span>
                    </p>

                    <p id="doable2" className="userList__text" onClick={this.taskDone}>{this.props.doable2} <span className="userList__span"><i className={
                        this.state.taskComplete
                            ?
                            "userList__icon far fa-check-square"
                            :
                            "userList__icon far fa-square"
                    }></i>
                    </span>
                    </p>

                    <p id="dailyGoal" className="userList__text" onClick={this.taskDone}>{this.props.dailyGoal} <span className="userList__span"><i className={
                        this.state.taskComplete
                            ?
                            "userList__icon far fa-check-square"
                            :
                            "userList__icon far fa-square"
                    }></i>
                    </span>
                    </p>

                <input
                    onClick={this.props.resetList}
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
    //FUNCTIONS END
    
    // RENDER START
    render() {
        return (
            this.display()
        )
    }
    // RENDER END
}

export default UserList;
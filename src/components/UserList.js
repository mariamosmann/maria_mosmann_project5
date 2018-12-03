import React, { Component } from 'react';

class UserList extends Component { 
    // CONSTRUCTOR START
    constructor() {
        super();
        this.state = {
            // task completion state
            doable1Task: false,
            doable2Task: false,
            dailyGoalTask: false
        }
    }
    // CONSTRUCTOR END

    // FUNCTIONS START

    // Task done
    // updates task completion state and alerts message
    taskDone = (event) => { 
        const thisTask = event.target.id 

        if(this.state[thisTask] === false) {
            alert("You did it! Keep up the good work!");

            this.setState({
                [thisTask]: true
            })
        } else if (this.state[thisTask] === true) {
            this.setState({
                [thisTask]: false
            })
        }            
    }    
    
    // Display
    // function for displaying user list if there is one 
    display = () => {
        if(this.props.doable1 !== "") {
            return (
            <div className="userList__wrapper wrapper">
                <h2 className="userList__heading">Things <span className="userList__heading userList__heading--color">I Can</span> do Today</h2>

                <ul className="userList__list"> 
                    {/* Changing the class and the icon */}
                    <li className={
                        this.state.doable1Task
                        ?
                        "userList__item--taskCompleted"
                        :
                        "userList__item"
                        }>
                        <span className="userList__item--color userList__item">#1</span> {this.props.doable1} <span className="userList__span">
                        <i onClick={this.taskDone} id="doable1Task" className={
                        this.state.doable1Task
                        ? 
                        "userList__icon far fa-check-square"
                            :
                        "userList__icon far fa-square"
                        }>
                        </i>
                        </span>                
                    </li>

                    <li className={
                        this.state.doable2Task
                        ?
                        "userList__item--taskCompleted"
                        :
                        "userList__item"
                        }>
                        <span className="userList__item--color userList__item">#2</span>  {this.props.doable2} <span className="userList__span">
                        <i onClick={this.taskDone} id="doable2Task" className={
                        this.state.doable2Task
                        ?
                        "userList__icon far fa-check-square"
                        :
                        "userList__icon far fa-square"
                        }>
                        </i>
                        </span>
                    </li>

                    <li className={
                        this.state.dailyGoalTask
                        ?
                        "userList__item--taskCompleted"
                        :
                        "userList__item"
                        }>
                        <span className="userList__item--color userList__item">#Final Boss!</span> {this.props.dailyGoal} <span className="userList__span">
                        <i onClick={this.taskDone} id="dailyGoalTask" className={
                        this.state.dailyGoalTask
                        ?
                        "userList__icon far fa-check-square"
                        :
                        "userList__icon far fa-square"
                        }>
                        </i>
                        </span>
                    </li>
                </ul>

                {/* resets the list in firebase */}
                <input
                    onClick={this.props.resetList}
                    type="submit"
                    value="Reset the list" className="userList__resetListButton button"
                />
                </div>
            )
        } else {
            return (
                <div className="userList__wrapper userList__wrapper--empty wrapper">
                </div>
            )
        }
    } 
    // FUNCTIONS END
    
    // RENDER START
    render() {
        return (
            this.display()
        )
    }
    // RENDER END
}

export default UserList;
import React, { Component } from "react"

class Userlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: 0,
      userList = []
    };
  }

  render(){
      return (
          <div>
              this is user list component
          </div>
      )
  }
}

export default Userlist

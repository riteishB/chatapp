import React, { Component } from 'react';
// import Login from './components/Login/Login'
import './App.css';
import * as socketConnection from './socketHandler'

class App extends Component {

  constructor(props) {
    super(props)
    socketConnection.getMessage().then(connection => {
      connection.subscribe(msg => {
        this.setState({
          msgs: [...this.state.msgs, msg.msg]
        })
      })
    })
  }
  state =  {
    msgs : ['New test message']
  }
  sendmsg (){
    socketConnection.sendMessage('Test')
  }



  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <div className="App-page">
          <h1>Chit Chat - Online chat platform</h1>
          <button onClick={this.sendmsg}>Send Message</button>
          <div>
            {this.state.msgs}
          </div>
        </div> 
      </div>
    )
  }
}

export default App

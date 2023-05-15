import React from 'react';
// import ReactDOM from "react-dom";
// import PropTypes from 'prop-types';
import { ActionCableConsumer, ActionCableProvider } from 'react-actioncable-provider';

export default class Broadcast extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notificatation: []};
  }

  componentDidMount = ()=> {
    fetch('http://localhost:3000/api/notifications')
      .then(res => res.json).then(NotificationArr=>this.setState({
        notificatation: NotificationArr.data
      }))
  }

  handleReceived = (response) => {
    console.log(response.data)
    console.log(this.state)

    this.setState({
      notifications: [...this.state.notificatations, response.data]
    })
    ;
  }

  render() {
    // console.log(this.state.notificatation)
    const notifications = this.state.notifications.map((notification, index) => {
      return (
        <li key={index} style={{margin: 10}}>
          <div style={{margin: 5, fontWeight: 'bold'}}>
            Title: {notification.title}
          </div>
          <div style={{marginLeft: 5}}>
            Content: {notification.content}
          </div>
        </li>
      )
    })
    return (
      <>
        <div>
          <ol>{notifications}</ol>
          <ActionCableConsumer
            channel="public"
            onReceived={this.handleReceived}
          >
            <h1>{this.state.message}</h1>
          </ActionCableConsumer>
        </div>
      </>
    );
  }
}
import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Admin from './Admin';
import Error404 from './Error404';
import { Switch, Route } from 'react-router-dom';
import Moment from 'moment';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      ticketList: []
    },
    this.handleNewTicket = this.handleNewTicket.bind(this);
  }

  componentDidMount() {
      this.waitTimeUpdateTimer = setInterval(() =>
        this.updateTicketElapsedWaitTime(),
        60000
      );
    }

    updateTicketElapsedWaitTime() {
       let newTicketList = this.state.ticketList.slice();
       newTicketList.forEach((ticket) =>
         ticket.formattedWaitTime = (ticket.timeOpen).fromNow(true)
       );
       this.setState({ticketList: newTicketList})
     }

  handleNewTicket(ticket){
    let newTicketList = [];
    this.state.ticketList.forEach(ticket=>{
      newTicketList.push(Object.create(ticket));
    });
    ticket.formattedWaitTime = (ticket.timeOpen).fromNow(true)
    newTicketList.push(ticket);
    this.setState({ticketList: newTicketList});
  }

  render(){

    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' render={()=><TicketList ticketList={this.state.ticketList} />} />
          <Route path='/newticket' render={()=><NewTicketControl onNewTicket={this.handleNewTicket} />} />
          <Route path='/admin' render={(props)=><Admin ticketList={this.state.ticketList} currentRouterPath={props.location.pathname} />} />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }

  componentWillUnmount(){
      clearInterval(this.waitTimeUpdateTimer);
    }

}



export default App;

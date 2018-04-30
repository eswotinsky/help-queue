import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Error404 from './Error404';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      ticketList: []
    },
    this.handleNewTicket = this.handleNewTicket.bind(this);
  }

  handleNewTicket(ticket){
    let newTicketList = [];
    this.state.ticketList.forEach(ticket=>{
      newTicketList.push(Object.create(ticket));
    });
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
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}

export default App;

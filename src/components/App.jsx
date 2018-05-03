import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Admin from './Admin';
import Error404 from './Error404';
import { Switch, Route } from 'react-router-dom';
import { v4 } from 'uuid';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      ticketList: {},
      selectedTicket: null
    },
    this.handleNewTicket = this.handleNewTicket.bind(this);
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this);
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
      60000
    );
  }

  updateTicketElapsedWaitTime() {
    var newTicketList = Object.assign({}, this.state.ticketList);
    Object.keys(newTicketList).forEach(ticketId => {
      newTicketList[ticketId].formattedWaitTime = (newTicketList[ticketId].timeOpen).fromNow(true);
    });
    this.setState({ticketList: newTicketList});
  }

  handleNewTicket(newTicket){
    var newTicketId = v4();
    let newTicketList = Object.assign({}, this.state.ticketList, {
      [newTicketId]: newTicket
    });
    newTicketList[newTicketId].formattedWaitTime = newTicketList[newTicketId].timeOpen.fromNow(true);
    this.setState({ticketList: newTicketList});
  }

  handleChangingSelectedTicket(ticketId){
    this.setState({selectedTicket: ticketId});
  }

  render(){

    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' render={()=><TicketList ticketList={this.state.ticketList} />} />
          <Route path='/newticket' render={()=><NewTicketControl onNewTicket={this.handleNewTicket} />} />
          <Route path='/admin' render={(props)=><Admin ticketList={this.state.ticketList} currentRouterPath={props.location.pathname} onTicketSelection={this.handleChangingSelectedTicket} selectedTicket={this.state.selectedTicket}/>} />
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

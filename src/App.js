import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import AppBar from './AppBar';
import CoinList from './CoinList';
import * as _ from 'lodash';
const cc = require('cryptocompare');


/**
 *  Constant Parameters
 */
const MAX_FAVORITES = 10;

/**
 *  Styled Components
 */
const AppLayout = styled.div`
  padding: 40px;
`;

const Content = styled.div`
`;


/**
 *  Methods
 */
const checkFirstVisit = () => {
  let cryptoDashData = localStorage.getItem('cryptoDash');
  if(!cryptoDashData){
    return {
      firstVisit: true,
      page: 'settings'
    }
  }
  return {};
}

/**
 *  App
 */
class App extends Component {
  // Update state
  state = {
    page: 'dashboard',
    favorites: ['BTC', 'LTC', 'ETH', 'DGB'],
    ...checkFirstVisit()
  };

  componentDidMount = () => {
    // Fetch coins
    this.fetchCoins();
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
  }


  // Display logic
  displayingDashboard = () => this.state.page === 'dashboard';
  displayingSettings = () => this.state.page === 'settings';
  firstVisitMessage = () => {
    if(this.state.firstVisit){
      return <div>Welcome to CryptoDash. Select favorite coins to begin</div>
    }
  };

  // Navigation requirement
  confirmFavorites = () => {
    localStorage.setItem('cryptoDash', 'test');
    this.setState({firstVisit: false, page: 'dashboard'});
    
  };


  // Settings to display
  settingsContent = () => {
    return ( 
    <div>
      {this.firstVisitMessage()}
      <div onClick={this.confirmFavorites}>
        Confirm Favorites
      </div>
      <div>
        {CoinList.call(this, true)}  {/* Loading favorites */}
        {CoinList.call(this)}        {/* Loading coinlist */}      
      </div>
    </div>)
  };

  loadingContent = () => {
    if(!this.state.coinList){
      return <div>Loading Coins</div>
    }
  }

  addCoinToFavorites = coinKey => {
    let favorites = [...this.state.favorites];
    if(favorites.length < MAX_FAVORITES){
      favorites.push(coinKey);
      this.setState({ favorites });
    }
  };

  removeCoinFromFavorites = coinKey => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, coinKey) });
  }

  isInFavorites = coinKey =>  _.includes([...this.state.favorites], coinKey)
  


  render() {
    return (
      <AppLayout>
      
      {/* Navbar */}
      {AppBar.call(this)}
      {this.loadingContent() || ( 
        <Content>
          {this.displayingSettings() && this.settingsContent()}
          
        </Content>
      )}
      </AppLayout>
    );
  }
}

export default App;

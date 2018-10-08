import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import AppBar from './AppBar';
import CoinList from './CoinList';
import Search from './Search';
import { ConfirmButton } from './Button';
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

const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
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
    this.setState({firstVisit: false, page: 'dashboard'});
    localStorage.setItem('cryptoDash', JSON.stringify({favorites: this.state.favorites}));
  };


  // Settings to display
  settingsContent = () => {
    return ( 
    <div>
      {this.firstVisitMessage()}
      <div>
        {CoinList.call(this, true)}  {/* Loading favorites */}
        <CenterDiv>
          <ConfirmButton onClick={this.confirmFavorites}>
            Confirm Favorites
          </ConfirmButton>
        </CenterDiv>
      
        {Search.call(this)}          {/* Fuzzy search      */}
        {CoinList.call(this)}        {/* Loading coinlist  */}      
      </div>
    </div>)
  };

  // Loading Message
  loadingContent = () => {
    if(!this.state.coinList){
      return <div>Loading Coins</div>
    }
  }

  // Update state with new favorite
  addCoinToFavorites = coinKey => {
    let favorites = [...this.state.favorites];
    if(favorites.length < MAX_FAVORITES){
      favorites.push(coinKey);
      this.setState({ favorites });
    }
  };

  // Update state with new favorites
  removeCoinFromFavorites = coinKey => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, coinKey) });
  }

  // Input for disabling pointer-events if already in favorites
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

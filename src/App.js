import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import AppBar from './AppBar';
import CoinList from './CoinList';
import Search from './Search';
import Dashboard from './Dashboard';
import { ConfirmButton } from './Button';
import * as _ from 'lodash';
import fuzzy from 'fuzzy';
import moment from 'moment';
const cc = require('cryptocompare');


/**
 *  Constant Parameters
 */
const MAX_FAVORITES = 10;
const TIME_UNITS = 15;

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
  let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
  if(!cryptoDashData){
    return {
      firstVisit: true,
      page: 'settings'
    }
  }
  let {favorites, currentFavorite} = cryptoDashData;
  return {
    favorites,
    currentFavorite
  };
}

/**
 *  App
 */
class App extends Component {
  // Update state
  state = {
    page: 'dashboard',
    favorites: ['BTC', 'LTC', 'ETH', 'DGB'],
    timeInterval: 'days',
    ...checkFirstVisit()
  };

  componentDidMount = () => {
    // Fetch coins
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
  }

  fetchPrices = async () => {
    if(this.state.firstVisit) return;
    let prices;
    try {
      prices = await this.prices();
    } catch (e) {
      console.error(e);
    }
    this.setState({prices});
  };

  prices = async () => {
    let promises = [];
    this.state.favorites.forEach(sym => {
      promises.push(cc.priceFull(sym, 'USD'));
    })
    return Promise.all(promises);
  }

  fetchHistorical = async () => {
    if(this.state.firstVisist) return;
    let results = await this.historical();
    let historical = [{
      name: this.state.currentFavorite,
      data: results.map((ticker, idx) => [moment().subtract({[this.state.timeInterval]: TIME_UNITS - idx}).valueOf(), ticker.USD])
    }]
    this.setState({historical});
    
  }

  historical = () => {
    let promises = [];
    for(let units = TIME_UNITS; units > 0; units--){
      promises.push(cc.priceHistorical(this.state.currentFavorite, ['USD'], moment().subtract({[this.state.timeInterval]: units}).toDate()));
    }
    return Promise.all(promises);
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
    let currentFavorite = this.state.favorites[0];
    this.setState({
      firstVisit: false, 
      page: 'dashboard',
      prices: null,
      currentFavorite,
      historical: null
    });
    this.fetchPrices();
    this.fetchHistorical();
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: this.state.favorites,
      currentFavorite
    }));
  };

  // Loading Message
  loadingContent = () => {
    if(!this.state.coinList){
      return <div>Loading Coins</div>;
    }

    if(!this.state.firstVisit && !this.state.prices){
      return <div>Loading Prices</div>;
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
  
  // Search functionality
  filterCoins = (event) => {
    let inputValue = event.target.value;
    if(!inputValue){
      this.setState({filteredCoins: null});
      return;
    }
    this.handleFilter(inputValue);
  };

  handleFilter = _.debounce((inputValue) => {
    // Get all symbols
    let coinSymbols = Object.keys(this.state.coinList);
    // Get all names
    let coinNames = coinSymbols.map(sym => this.state.coinList[sym].CoinName);
    // Search criteria
    let allStringsToSearch = coinSymbols.concat(coinNames);
    let fuzzyResults = fuzzy.filter(inputValue, allStringsToSearch, {})
      .map(res => res.string);
 
    // Pick fuzzy matched coins from the state.coinList
    let filteredCoins = _.pickBy(this.state.coinList, (result, symKey) => {
      let coinName = result.CoinName;
      // If fuzzy result contains the symbol or coinName,
      // pick that element from state.coinList
      return _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName);
    })

    // Mutate state
    this.setState({filteredCoins});
  }, 500)// wrapped in debounce

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

  dashboardContent = () => {
    return (
      <div>
        Dashboard
      </div>
    )
  }

  render() {
    return (
      <AppLayout>
      
      {/* Navbar */}
      {AppBar.call(this)}
      {this.loadingContent() || ( 
        <Content>
          {this.displayingSettings() && this.settingsContent()}
          {this.displayingDashboard() && Dashboard.call(this)}
        </Content>
      )}
      </AppLayout>
    );
  }
}

export default App;

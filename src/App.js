import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import css from 'styled-components';

const Logo = styled.div`
  font-size: 1.5em;
  `;

const ControlButton = styled.div`
  ${props => props.active && `
    text-shadow: 0px 0px 60px #03ff03;
  `}
`;


const AppLayout = styled.div`
  padding: 40px;
`;

const Bar = styled.div`
  display: grid;
  grid-template-columns: 100px  auto 100px 100px;
  margin-bottom: 40px;
`;

const Content = styled.div`
`;



class App extends Component {
  state = {
    page: 'dashboard' 
  };

  displayingDashboard = () => this.state.page === 'dashboard';
  displayingSettings = () => this.state.page === 'settings';
  render() {
    return (
      <AppLayout>
      <Bar>
        <Logo>CryptoDash</Logo>
        <div></div>
        <ControlButton active={this.displayingDashboard()}>Dashboard</ControlButton>
        <ControlButton active={this.displayingSettings()}>Settings</ControlButton>
      </Bar>
      <Content>Hello {this.state.page}</Content>
      </AppLayout>
    );
  }
}

export default App;

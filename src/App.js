import React from 'react';
import { Connectors } from 'web3-react';
import Web3Provider from 'web3-react';
import ConnectWalletComp from './ConnectWalletComp';
import './App.css';

const { InjectedConnector, NetworkOnlyConnector } = Connectors;

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] });
const Infura = new NetworkOnlyConnector({
  providerURL: 'https://mainnet.infura.io/v3/...'
});

const connectors = { MetaMask, Infura };

function App() {
  return (
    <Web3Provider
      connectors={connectors}

    >
      <ConnectWalletComp />
    </Web3Provider>
   
  );
}

export default App;

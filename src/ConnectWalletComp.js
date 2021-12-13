import React, { useState, useEffect } from 'react'
import { useWeb3Context, withWeb3, Web3Consumer } from 'web3-react';
import Web3 from 'web3';
import { Button, Modal } from 'antd';

import fox from '../src/assets/image/fox.png'

const ConnectWalletComp = ({ web3 }) => {
  const context = useWeb3Context();
  const [modalVisible, setModalVisible] = useState(false);
  const [walletAccount, setWalletAccount] = useState("")
  useEffect(() => {
    const dataGet = localStorage.getItem("acountHandle");
    if (dataGet) {
      setWalletAccount(dataGet)
    } else {
      setWalletAccount("")
    }
  }, [])

  const setValidConnector = () => {
    let provider = window.ethereum;
    if (typeof provider !== undefined) {
      provider.request({
        method: "eth_requestAccounts"
      }).then(account => {
        setWalletAccount(account[0]);
        localStorage.setItem("acountHandle", account[0]);
      }).catch(err => {
        console.log("errr", err)
      })
    }
    const web3 = new Web3(provider);
    setModalVisible(false);
  }

  const unSetValidator = async () => {
    context.unsetConnector();
    setWalletAccount("");
    localStorage.clear();
  }

  return (
    <div style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
      {walletAccount ? null : <Button type='primary' onClick={() => setModalVisible(true)}>
        Connect to wallet
      </Button>}

      <p>{walletAccount}</p>
      {walletAccount ? <Button type='primary' onClick={unSetValidator}>
        Disconnect
      </Button> : null}

      <Modal
        title="Connect Wallet"
        style={{ top: 20, borderRadius: 20 }}

        visible={modalVisible}
        onCancel={() => setModalVisible(false)}

      >
        <div className="select-wallet-container" onClick={setValidConnector}>
          <img className='wallet-select-image' src={fox} />
          <div className='wallet-select-heading'>Meta mask</div>
        </div>

      </Modal>
    </div>
  )
}

export default withWeb3(ConnectWalletComp);

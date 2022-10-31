# Move Wallet Documentation

Move Wallet is the non-custodial wallet extension that supports all blockchains based on Move language such as Aptos, Sui, …
With Move Wallet, users can manage their assets with a single private key (or mnemonic words), switch networks with simple click and the following functions will be implemented:
- Send and Receive native coins from multiple network (Aptos, Sui)
- Send and Receive tokens from multiple network
- Show coins/token information
- Sign transactions and execute smart contracts
- Show NFT token and visualize NFT token
- Stake, bridge and other functions

This document is for developers who using Move Wallet to connect and interact with move-based blockchain platforms 
 
## Detect Move Wallet
To detect if a user has already installed a Move wallet, a web application should check for the existence of the movewallet object. Move wallet browser extension will inject the movewallet object into the window of any web application the user visits.

```js
const moveWallet = window.movewallet
```

If Move wallet is not installed, the the Move wallet home page should be displayed and users is recommended to install Move wallet from google chrome extension 

```js
const getMoveWallet = () => {
if ("movewallet" in window) {
    return(window.movewallet);
}
window.open("https://movewallet.io", "_blank");
```

## Establish Wallet connection
If users have already installed the Move Wallet, We can connect to the wallet by calling the function `wallet.connect()`. 
The `connect()` function will prompt the wallet dialog for user interaction. After that, We can get the basic information from Move Wallet such as `address`, `public key`.

```js
const wallet = getMoveWallet(); 
try { 
    const response = await wallet.connect(); 
    console.log(response); // { address: string, address: string } 
    const account = await wallet.account(); 
    console.log(account); // { address: string, address: string } 
} catch (error) {
 // { code: 4001, message: "User rejected the request."} 
}
```

### Disconnect wallet
To disconnect the wallet, call the `wallet.disconnect() ` function. After calling this function, applications must call the `wallet.connect()` to re-establish the connection if they want to use the wallet again. 

## Wallet Methods and APIs
To be updated.

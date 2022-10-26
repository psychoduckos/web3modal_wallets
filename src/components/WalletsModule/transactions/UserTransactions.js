import Web3 from "web3";
import {web3Modal} from "../wallet-config";
import ERC20Abi from '../constants/ERC20Abi'

async function createBigNumber(web3, tokenContract, amount) {
    const decimals = await tokenContract.methods.decimals().call();
    const unit = Object.keys(web3.utils.unitMap).find(key => web3.utils.unitMap[key] === web3.utils.toBN(10).pow(web3.utils.toBN(decimals)).toString());
    let newNumber = web3.utils.toWei(amount.toString(), unit)  
      
    return newNumber
} 

class UserTransactions {

    async ERC20tx(_to, _tokenAddress, _amount) {
        // let provider = await this.connectWallet()

        let provider = await web3Modal.connectTo(web3Modal.cachedProvider)
        console.log(provider);

        let web3 = new Web3(provider)
        console.log(web3);

        let accounts = await web3.eth.getAccounts();

        let chainId = await web3.eth.getChainId()

        let contractToken = new web3.eth.Contract(ERC20Abi, _tokenAddress, {
            from: accounts[0]
        });

        let _newAmount = await createBigNumber(web3, contractToken, _amount)

        let gasPrice = Number((Number(web3.utils.fromWei(await web3.eth.getGasPrice(), 'gwei')) + 2).toFixed());


        let rawTransaction = {
            "gasPrice": web3.utils.toHex(gasPrice * 1e9),
            "gasLimit": web3.utils.toHex(100000),
            "to": _tokenAddress,
            "data": await contractToken.methods.transfer(_to, _newAmount).encodeABI(),
            "chainId": chainId
        };

        let hash = await provider.request({
            method: 'eth_sendTransaction',
            params: [
              {
                from: accounts[0],
                ...rawTransaction
              }
            ],
          })

        return new Promise((res, rej) => {res(hash)})
    }

    async nativeTx(_privKey, _amount, _to) {

        let provider = await this.connectWallet()
        let web3 = new Web3(provider)

        let userAccount = await web3.eth.getAccount();
        let chainId = await web3.eth.getChainId();
    
        let nonce = await web3.eth.getTransactionCount(userAccount);
    
        let gasPrice = Number((Number(web3.utils.fromWei(await web3.eth.getGasPrice(), 'gwei')) + 2).toFixed());
    
        let value = web3.utils.toWei(_amount.toString(), 'ether')
                    
        let rawTransaction = {
              "nonce": nonce.toString(), 
              "gasPrice": web3.utils.toHex(gasPrice * 1e9), 
              "gasLimit": web3.utils.toHex(100000), 
              "to": _to, 
              "from": userAccount, 
              "value": web3.utils.toHex(value), 
              "chainId": chainId
            }
    
            let hash = await provider.request({
              method: 'eth_sendTransaction',
              params: [
                {
                  ...rawTransaction
                }
              ],
            });

        return new Promise((res, rej) => {res(hash)})
    
    }

    async connectWallet() {
        web3Modal.clearCachedProvider()
        if(window.localStorage.WEB3_CONNECT_CACHED_PROVIDER !== undefined){
            let provider = await web3Modal.connectTo(web3Modal.cachedProvider)
            return provider
        } else {
            web3Modal.clearCachedProvider()
            let provider = await web3Modal.connect()
            return provider
        }
    }
}

export default UserTransactions
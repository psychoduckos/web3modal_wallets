import Web3 from "web3";
import { blockchains } from "../wallet-config";


class ServerTransactions {


    async nativeTx(_from, _privKey, _to, _amount, chainId) {

        let chain = (blockchains.filter(element => element.chainId == chainId))[0]

        let web3 = new Web3(chain.rpc)

        let nonce = await web3.eth.getTransactionCount(_from);

        let gasPrice = Number((Number(web3.utils.fromWei(await web3.eth.getGasPrice(), 'gwei')) + 2).toFixed());

        let value = web3.utils.toWei(_amount.toString(), 'ether')
                
        let rawTransaction = {
          "nonce": nonce.toString(), 
          "gasPrice": web3.utils.toHex(gasPrice * 1e9),
          "gasLimit": web3.utils.toHex(100000),
          "to": _to, 
          "from": _from, 
          "value": web3.utils.toHex(value), 
          "chainId": chain.chainId
        }

        let signedTx = await web3.eth.accounts.signTransaction(rawTransaction, '0x' + _privKey)
		let sentTx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)

        return new Promise((res, rej) => {res(sentTx)})

    }

    async ERC20tx(_from, _privKey, _to, _amount, chainId) {

        let chain = (blockchains.filter(element => element.chainId == chainId))[0]

        let web3 = new Web3(chain.rpc)

        let _from = await getAccount();

        let nonce = await web3.eth.getTransactionCount(_from);

        let gasPrice = Number((Number(web3.utils.fromWei(await web3.eth.getGasPrice(), 'gwei')) + 2).toFixed());

        let value = web3.utils.toWei(_amount.toString(), 'ether')
                
        let rawTransaction = {
          "nonce": nonce.toString(),
          "gasPrice": web3.utils.toHex(gasPrice * 1e9), 
          "gasLimit": web3.utils.toHex(100000), 
          "to": _to, 
          "from": _from,
          "value": web3.utils.toHex(value), 
          "chainId": chain.chainId
        }

        let signedTx = await web3.eth.accounts.signTransaction(rawTransaction, '0x' + _privKey)
		let sentTx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)

        return new Promise((res, rej) => {res(sentTx)})

    }
    
}

export default ServerTransactions
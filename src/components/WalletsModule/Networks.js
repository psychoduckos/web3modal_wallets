import Web3 from "web3";
import {web3Modal, blockchains} from "./wallet-config";

class Networks {

    async connectWallet() {
        // if(window.localStorage.WEB3_CONNECT_CACHED_PROVIDER !== undefined){
        //     let provider = await web3Modal.connectTo(web3Modal.cachedProvider)
        //     return provider
        // } else {
            web3Modal.clearCachedProvider()
            let provider = await web3Modal.connect()
            return provider
        //}
    }

    async disconnectWallet() {
        let provider = await web3Modal.connect()
        await provider.close();

        web3Modal.clearCachedProvider();
        provider = null;
    }

    async changeNetwork(chainId) {
        //web3Modal.clearCachedProvider()
        //let provider = await this.connectWallet()
        console.log(web3Modal.cachedProvider);
        let provider = await web3Modal.connectTo(web3Modal.cachedProvider)
        console.log(web3Modal.cachedProvider);
        let web3 = new Web3(provider)

        let chain = (blockchains.filter(element => element.chainId == chainId))[0]

        try {
            await provider.request({
               method: 'wallet_switchEthereumChain',
               params: [{ chainId: web3.utils.toHex(chain.chainId) }]
            });
        } catch (err) {
            if (err.code === 4902 || -32603) {
                await provider.request({
                method: 'wallet_addEthereumChain',
                    params: [
                    {
                        chainName: chain.chainName,
                        chainId: web3.utils.toHex(chain.chainId),
                        nativeCurrency: { name: chain.currencyName, decimals: chain.decimals, symbol: chain.symbol},
                        rpcUrls: [chain.rpc]
                    }]
                });
            }
        }
    }
    
}

export default Networks
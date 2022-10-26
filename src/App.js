import {Networks, UserTransactions} from './components/WalletsModule/index'


let networks = new Networks()
let transactions = new UserTransactions()



function App() {

  async function sendTokenTx() {
    await transactions.ERC20tx("0x4D378644315120a213257bC16EbCC62D04aEC756", "0x170A18B9190669Cda08965562745A323C907E5Ec", 100)
  }
  async function connect() {
    await networks.connectWallet()
  }
  async function disconnect() {
    await networks.disconnectWallet()
  }
  async function changeNetwork() {
    await networks.changeNetwork(137)
  }

  return (
    <div className="App">
      <button onClick={sendTokenTx}>sendTx</button>
      <button onClick={connect}>Connect wallet</button>
      <button onClick={changeNetwork}>changeNetwork</button>
      <button onClick={disconnect}>disconnect</button>


    </div>
  );
}

export default App;

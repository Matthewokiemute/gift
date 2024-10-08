import detectEthereumProvider from '@metamask/detect-provider';

const ConnectWallet = async () => {
    /*****************************************/
    /* Detect the MetaMask Ethereum provider */
    /*****************************************/

    const provider = await detectEthereumProvider();

    if (provider) {
        startApp(provider);
    } else {
        console.log('Please install MetaMask!');
    }

    function startApp(provider) {
        if (provider !== window.ethereum) {
            console.error('Do you have multiple wallets installed?');
        }
    }

    /**********************************************************/
    /* Handle chain (network) and chainChanged (per EIP-1193) */
    /**********************************************************/

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    window.ethereum.on('chainChanged', handleChainChanged);
    
    function handleChainChanged(chainId) {
        window.location.reload();
    }
    
    /***********************************************************/
    /* Handle user accounts and accountsChanged (per EIP-1193) */
    /***********************************************************/

    let currentAccount = null;
    window.ethereum.request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch((err) => {
            console.error(err);
        });

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== currentAccount) {
            currentAccount = accounts[0];
            showAccount.innerHTML = currentAccount;
        }
    }

    /*********************************************/
    /* Access the user's accounts (per EIP-1102) */
    /*********************************************/

    const ethereumButton = document.querySelector('.enableEthereumButton');
    const showAccount = document.querySelector('.showAccount');

    ethereumButton.addEventListener('click', () => {
        getAccount();
    });

    async function getAccount() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            .catch((err) => {
                if (err.code === 4001) {
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
        const account = accounts[0];
        showAccount.innerHTML = account;
    }
}

export default ConnectWallet;
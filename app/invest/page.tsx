'use client';

declare let window: any;
import { useState } from 'react';
import { IWalletInfo, IRate, TOKEN, IPackage } from '@/types';
import { Flex, Heading, Spacer, SimpleGrid } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { packages } from '@/config/constant'
import ConnectWallet from '@/components/ConnectWallet';
import WalletInfo from '@/components/WalletInfo';
import InvestCard from '@/components/InvestCard';

export default function Invest() {
  const [wallet, setWallet] = useState<IWalletInfo>();
  const [rate, setRate] = useState<IRate>({bnbRate: 0, usdtRate: 0})
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [pak, setPak] = useState<IPackage>()
  const [web3Provider, setWeb3Provider] = useState<ethers.BrowserProvider>();

  const onConnectMetamark = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum, undefined);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const bigBalance = await provider.getBalance(address);
      const bnbBalance = Number.parseFloat(ethers.formatEther(bigBalance));
      setWallet({ address, bnb: bnbBalance });
      setWeb3Provider(provider);
    }
  };

  // const handleBuyIco = async() => {

  // }

  return (
    <Flex w={{ base: 'full', lg: '70%' }} flexDirection="column" margin="50px auto">
      <Flex>
        <Heading size="lg" fontWeight="bold">
          Blockchain Trainee
        </Heading>
        <Spacer />
        {!wallet && <ConnectWallet onClick={onConnectMetamark} />}
        {wallet && <WalletInfo address={wallet?.address} amount={wallet?.bnb || 0} />}
      </Flex>
      <SimpleGrid column={{base: 2, md: 2, lg: 3}} mt='50px' spacingY='20px'>
      {packages.map((item, index) => (
          <InvestCard
            pak={item}
            key={String(index)}
            isBuying={isProcessing && pak?.key === item.key}
            rate={item.token === TOKEN.BNB ? rate.bnbRate : rate.usdtRate}
            walletInfo={wallet}
            onBuy={() => console.log('test')}
          />
        ))}
      </SimpleGrid>

    </Flex>
  );
}

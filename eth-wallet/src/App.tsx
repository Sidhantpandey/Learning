 // 1. Import modules
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '../config'
import { Account } from './components/Account'
import { WalletOptions } from './components/WalletOptions'
import { useAccount } from 'wagmi'
// 2. Set up a React Query client.

const queryClient = new QueryClient()
function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />
  return <WalletOptions />
}
export default function App() {
  // 3. Wrap app with Wagmi and React Query context.
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
                <ConnectWallet />

      </QueryClientProvider> 
    </WagmiProvider>
  )
}
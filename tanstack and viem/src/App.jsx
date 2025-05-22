import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { useEffect, useState } from "react";

// Creating a public client
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

function App() {
  const queryClient = new QueryClient();

  /**
   * Link to fetch details https://jsonplaceholder.typicode.com/posts/
   */
  async function getter() {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts/");
    const response = await data.json();
    return response;
  }

  function Todos() {
    // Access the client
    const queryClient = useQueryClient();

    // Queries
    const query = useQuery({
      queryKey: ["todos"],
      queryFn: getter,
      refetchInterval: 10 * 1000,
    });

    return (
      <div>
        <ul>
          {query.data?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    );
  }

  function Balance() {
    const [balance, setBalance] = useState(null);
    const [blockNumber, setBlockNumber] = useState(null);

    useEffect(() => {
      async function GetBalanceandBlockNumber() {
        const balance = await client.getBalance({
          address: "0x075c299cf3b9FCF7C9fD5272cd2ed21A4688bEeD",
        });
        const blockNumber = await client.getBlockNumber();
        setBalance(balance);
        setBlockNumber(blockNumber);
      }

      GetBalanceandBlockNumber();
    }, []);

    return (
      <div>
        <h3>Block Number: {blockNumber?.toString()}</h3>
        <h3>
          Balance: {balance ? `${balance / 10n ** 18n} ETH` : "Loading..."}
        </h3>
      </div>
    );
  }

  // Hookifying viem
  

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Todos /> */}
      <Balance />
    </QueryClientProvider>
  );
}

export default App;

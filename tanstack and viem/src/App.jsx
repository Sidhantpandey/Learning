import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { QueryClient, QueryClientProvider, useQueryClient, useQuery } from "@tanstack/react-query"

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
    const queryClient = useQueryClient()

    // Queries
    const query = useQuery({ queryKey: ['todos'], queryFn: getter, refetchInterval: 10 * 1000 })

    return (
      <div>
        <ul>{query.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
      </div>
    )
  }


  return (

    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>


  )
}

export default App;
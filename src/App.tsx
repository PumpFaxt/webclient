import { RouterProvider } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/globalContext";
import { Web3Provider } from "./contexts/web3context";
import router from "./pages/router";
import { HuddleClient, HuddleProvider } from "@huddle01/react";
export default function App() {
  const huddleClient = new HuddleClient({
    projectId: import.meta.env.VITE_HUDDLE_PROJECT_ID ?? "",
  });

  return (
    <GlobalContextProvider>
      <Web3Provider>
        <HuddleProvider client={huddleClient}>
          <RouterProvider router={router} />
        </HuddleProvider>
      </Web3Provider>
    </GlobalContextProvider>
  );
}

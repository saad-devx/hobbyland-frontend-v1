import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/config/contextapi/auth";
import { UserProvider } from "@/config/contextapi/user";
import { initializeGlobalState, registerPersistCallback } from "@/lib/global-states";
import { ToastContainer } from "react-toastify";
import { gendy } from "@/config";
// import Render from "./render";
// import { SocketProvider } from "@/config/contextapi/socket";
// import { PeerProvider } from "@/config/contextapi/peer";

function App({ Component, pageProps }) {
  useEffect(() => {
    initializeGlobalState();
    registerPersistCallback();
  }, []);

  return (
    <AuthProvider>
      <ToastContainer />
      <UserProvider>
        <main className={gendy.className}>
          <Component pageProps={pageProps} />
        </main>
      </UserProvider>
    </AuthProvider>
  );
}

export default dynamic(() => Promise.resolve(App), { ssr: false });

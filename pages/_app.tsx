import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "@/store";
import { persistStore } from "redux-persist";
import { motion } from "framer-motion";

const store = configureStore({
  reducer: {
    products: persistedReducer,
  },
});

const persistor = persistStore(store);

const animations = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 0 },
};

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <motion.div
          key={router.route}
          variants={animations}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </PersistGate>
    </Provider>
  );
}

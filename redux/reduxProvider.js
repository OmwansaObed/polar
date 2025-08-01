"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import persistStore from "redux-persist/es/persistStore";
import { useEffect, useState } from "react";

export default function ReduxProvider({ children }) {
  const [isClient, setIsClient] = useState(false);
  const [persistor, setPersistor] = useState(null);

  useEffect(() => {
    setIsClient(true);
    setPersistor(persistStore(store));
  }, []);

  if (!isClient || !persistor) return null;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./store/index";
import Modal from "./components/Modal";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    "PlayfairDisplay-Bold": require("./assets/fonts/PlayfairDisplay-Bold.ttf"),
    "Work-Sans": require("./assets/fonts/WorkSans-Regular.ttf"),
    "Work-SansSemiBold": require('./assets/fonts/WorkSans-SemiBold.ttf'),
    "Work-SansBold": require("./assets/fonts/WorkSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar />
          <Navigation colorScheme={colorScheme} />
          <Modal />
        </SafeAreaProvider>
      </Provider>
    );
  }
}

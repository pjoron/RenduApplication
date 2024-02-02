import React, { useState, useEffect } from 'react';
import AppNavigation from "./src/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Font from 'expo-font';

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);



  // Pour importer les fonts et utiliser : 

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'WorkSansRegular': require('./src/fonts/WorkSans-Regular.ttf'),
        'WorkSansBold': require('./src/fonts/WorkSans-Bold.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigation />
    </QueryClientProvider>
  );
}

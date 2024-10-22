import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { WebView } from 'react-native-webview';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff', // Adjust based on your color scheme
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundStyle.backgroundColor }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* Render the Home component */}
      {/* <Home /> */}
      <WebView 
        source={{ uri: '192.168.50.18:3000' }} // change ipaddress accordingly
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}

export default App;

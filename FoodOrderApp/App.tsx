import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { WebView } from 'react-native-webview';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundStyle.backgroundColor }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <WebView 
        source={{ uri: 'https://192.168.50.18:3000' }} // Use your correct IP address
        style={{ flex: 1 }}
        javaScriptEnabled={false} // protect against xss attacks
        domStorageEnabled={true}
        thirdPartyCookiesEnabled={false} // do not third-party cookies for Android
        mixedContentMode="never" // only allow https
        onError={(syntheticEvent) => {
         const { nativeEvent } = syntheticEvent;
         console.warn('WebView error: ', nativeEvent);
        }}
      />
    </SafeAreaView>
  );
}

export default App;

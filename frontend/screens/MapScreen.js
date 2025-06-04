import { WebView } from "react-native-webview";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        style={styles.webView}
        originWhitelist={["*"]}
        source={{ uri: "http://192.168.1.76:3000/map" }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default MapScreen;

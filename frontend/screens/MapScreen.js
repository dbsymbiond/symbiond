import { useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Text, View, TouchableOpacity, Modal, Button, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalization } from '../context/LocalizationContext';

const MapScreen = () => {
  const { i18n } = useLocalization();
  const screenHeight = Dimensions.get('window').height;
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [layer, setLayer] = useState('biome');

  const switchLayer = (newLayer) => {
    setIsLoading(true);
    setLayer(newLayer);
  };

  const cities = [
    { name: i18n.t('map.states.Diamora.capital'), x: 4468, y: 7500, radius: 50 }
  ];

  const handleCityClick = (mapX, mapY) => {
    const clickedCity = cities.find(city => {
      const distance = Math.sqrt((mapX - city.x) ** 2 + (mapY - city.y) ** 2);
      return distance <= city.radius;
    });

    if (clickedCity) {
      setSelectedCity(clickedCity.name);
      setModalVisible(true);
    }
  };

  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'click') {
        const { mapX, mapY } = data;
        handleCityClick(mapX, mapY);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: `http://${process.env.EXPO_PUBLIC_SERVER_IP}:3000/map?height=${screenHeight}&layer=${layer}`,
        }}
        javaScriptEnabled={true}
        onMessage={handleWebViewMessage}
        onLoad={() => setTimeout(() => setIsLoading(false), 500)}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        injectedJavaScript={`
          (function() {
            const mapContainer = document.querySelector('.map-container');
            
            document.addEventListener('click', function(event) {
              const bounds = mapContainer.getBoundingClientRect();
              const mapX = ((event.clientX - bounds.left) / bounds.width) * 6144; 
              const mapY = ((event.clientY - bounds.top) / bounds.height) * 11984;
      
              const message = JSON.stringify({
                type: 'click',
                mapX,
                mapY,
              });
              window.ReactNativeWebView.postMessage(message);
            });
          })();
        `}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
          setIsLoading(false);
        }}
        style={{ height: screenHeight }}
      />

      {/* Loading Indicator Overlay */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6DA34D" />
          <Text style={{ color: '#E9E0D2' }}>Loading...</Text>
        </View>
      )}

      {/* Buttons to Switch Layers */}
      {
        !isLoading && (
          <View style={styles.buttonContainer}>
            <Button
              title="Physical"
              onPress={() => switchLayer('biome')}
              disabled={layer === 'biome'}
              color="#6DA34D"
            />
            <Button
              title="States"
              onPress={() => switchLayer('political')}
              disabled={layer === 'political'}
              style={styles.layerButtons}
              color="#6DA34D"
            />
          </View>

        )
      }

      {/* Modal for City Info */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <Text style={styles.modalText}>Welcome to {selectedCity}!</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#121212'
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212'
  },
  layerButtons: {
    color: '#6DA34D'
  }
});

export default MapScreen;

import React from 'react';
import { StyleSheet, Image, FlatList, Dimensions, ScrollView, View } from 'react-native';
import tileImageMap from '../data/tileImageMap';

// Define the number of rows and columns
const ROWS = 16;
const COLUMNS = 16;
// Define the exact aspect ratio of a tile
const TILE_ASPECT_RATIO = 749 / 384; // Height / Width

const SCREEN_WIDTH = Dimensions.get('window').width;
// Calculate tile dimensions of the tiles
const TILE_WIDTH = SCREEN_WIDTH / COLUMNS;
const TILE_HEIGHT = TILE_WIDTH * TILE_ASPECT_RATIO;

// Generate the tile data
const generateTileData = () => {
  const tiles = [];
  const letters = 'ABCDEFGHIJKLMNO';
  for (let row = 0; row < ROWS; row++) {
    for (let col = 1; col <= COLUMNS; col++) {
      const tileId = `${letters[row]}${col}`;
      if (tileImageMap[tileId]) {
        tiles.push({ id: tileId, src: tileImageMap[tileId] });
      }
    }
  }
  return tiles;
};

const MapGrid = () => {
  const tiles = generateTileData();

  const renderTile = ({ item }) => (
    <Image
      source={item.src}
      style={[styles.tile, { width: TILE_WIDTH, height: TILE_HEIGHT }]}
      resizeMode="cover"
    />
  );

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      minimumZoomScale={1}
      maximumZoomScale={3}
      bounces={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.gridWrapper}>
        <FlatList
          scrollEnabled={false}
          bounces={false}
          data={tiles}
          renderItem={renderTile}
          keyExtractor={(item) => item.id}
          numColumns={COLUMNS}
          contentContainerStyle={[styles.gridContainer]}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    padding: 0
  },
  scrollView: {
    flex: 1
  },
  tile: {
    margin: 0,
    borderColor: '#ccc',
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridWrapper: {
    width: SCREEN_WIDTH,
    height: TILE_HEIGHT * ROWS,
  }
});

export default MapGrid;

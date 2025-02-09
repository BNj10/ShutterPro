import React from 'react'
import Gallery from '@/components/GalleryPreview';
import { Text, View, StyleSheet } from 'react-native'

const Home = () => {
  return <Gallery/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});

export default Home;
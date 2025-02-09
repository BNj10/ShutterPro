import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react'
import { Pressable, View, Image, Text } from 'react-native'
import { Tabs, router } from 'expo-router'

const _layout = () => {
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: "black",
      headerTitle: () => (  
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('./main-icon.png')} 
            style={{ width: 50, height: 50, marginRight: 8 }} 
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>ShutterPro</Text>
        </View>
      ),
      headerShown: true,
    }}
    >
        <Tabs.Screen
            name="home"
            options={{
                title: 'ShutterPro',
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <Pressable onPress={() => router.push('/(tabs)/home')}>
                      <FontAwesome name="home" size={29} color={color} />
                  </Pressable>
              )
            }}
        />
        <Tabs.Screen
            name="camera"
            options={{
                title: 'ShutterPro',
                tabBarLabel: 'Camera',
                tabBarIcon: ({ color }) => (
                    <Pressable onPress={() => router.push('/(tabs)/camera')}>
                        <FontAwesome name="camera" size={22} color={color} />
                    </Pressable>
                )
            }}
        />
    </Tabs>
  )
}

export default _layout
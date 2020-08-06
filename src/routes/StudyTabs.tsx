import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';
import { Ionicons } from '@expo/vector-icons';

const { Navigator, Screen } = createBottomTabNavigator();

export default function StudyTabs() {
    return (
        <Navigator
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: Platform.OS === 'ios' ? 84 : 64
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: Platform.OS === 'ios' ? 20 : 0
                },
                iconStyle: {
                    flex: 0,
                    width: Platform.OS === 'ios' ? 24 : 0,
                    height: Platform.OS === 'ios' ? 24 : 0
                },
                safeAreaInsets: {
                    bottom: 0,
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16
                },
                inactiveBackgroundColor: '#fafafc',
                activeBackgroundColor: '#ebebf5',
                inactiveTintColor: '#c1bccc',
                activeTintColor: '#32264d'
            }}
        >
            <Screen
                component={TeacherList}
                name='TeacherList'
                options={{
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ({ color, size, focused }) => <Ionicons name="ios-easel" {...{ color: focused ? '#8257e5' : color, size }} />
                }}
            />
            <Screen
                component={Favorites}
                name='Favorites'
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ color, size, focused }) => <Ionicons name="ios-heart" {...{ color: focused ? '#8257e5' : color, size }} />
                }}
            />
        </Navigator>
    )
}
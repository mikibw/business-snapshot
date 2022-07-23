import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useNavigationOptions from '@hooks/useNavigationOptions';

import {screenOptions} from './screenOptions';
import {BlurView} from 'expo-blur';
import {
  tab_contact,
  tab_contact_focus,
  tab_discovery,
  tab_discovery_focus,
  tab_index,
  tab_index_focus,
  tab_profile,
  tab_profile_focus,
} from '@assets/images/wechat/tabs';

import Index from '@screens/wechat/Index/Index';
import Contact from '@screens/wechat/Contact/Contact';
import Discovery from '@screens/wechat/Discovery/Discovery';
import Profile from '@screens/wechat/Profile/Profile';
import {getChatService} from '@database/services/ChatService';
import {observeChatUnreadCountDidChange} from '@events';

export type DashBoardParamList = {
  Index: undefined;
  Contact: undefined;
  Discovery: undefined;
  Profile: undefined;
};

const DashBoardTab = createBottomTabNavigator<DashBoardParamList>();

export default function DashBoard() {
  useNavigationOptions({headerShown: false});

  const [chatUnreadCount, setChatUnreadCount] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    function format(count: number) {
      return count > 99 ? '···' : count > 0 ? count.toString() : undefined;
    }
    async function fetchChatUnreadCount() {
      const count = await getChatService().findAllUnreadCount();
      setChatUnreadCount(format(count));
    }
    fetchChatUnreadCount();
    const obervers = [observeChatUnreadCountDidChange(fetchChatUnreadCount)];
    return () => obervers.forEach(observer => observer.remove());
  }, []);

  return (
    <DashBoardTab.Navigator
      initialRouteName="Index"
      screenOptions={{
        ...screenOptions,
        tabBarStyle: {
          position: 'absolute',
        },
        tabBarBackground: () => (
          <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
        ),
      }}>
      <DashBoardTab.Screen
        name="Index"
        component={Index}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={[styles.tabBarText, focused && styles.focusTabBarText]}>微信</Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image source={focused ? tab_index_focus : tab_index} style={{width: 30, height: 30}} />
          ),
          tabBarBadge: chatUnreadCount,
        }}
      />
      <DashBoardTab.Screen
        name="Contact"
        component={Contact}
        options={{
          headerTitle: '通讯录',
          tabBarLabel: ({focused}) => (
            <Text style={[styles.tabBarText, focused && styles.focusTabBarText]}>通讯录</Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? tab_contact_focus : tab_contact}
              style={{width: 30, height: 30}}
            />
          ),
        }}
      />
      <DashBoardTab.Screen
        name="Discovery"
        component={Discovery}
        options={{
          headerTitle: '发现',
          tabBarLabel: ({focused}) => (
            <Text style={[styles.tabBarText, focused && styles.focusTabBarText]}>发现</Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? tab_discovery_focus : tab_discovery}
              style={{width: 30, height: 30}}
            />
          ),
        }}
      />
      <DashBoardTab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: '',
          tabBarLabel: ({focused}) => (
            <Text style={[styles.tabBarText, focused && styles.focusTabBarText]}>我</Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? tab_profile_focus : tab_profile}
              style={{width: 30, height: 30}}
            />
          ),
        }}
      />
    </DashBoardTab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarText: {
    marginTop: -4,
    marginBottom: 4,
    fontSize: 10,
    color: '#1F1F20',
  },
  focusTabBarText: {
    color: '#43C561',
  },
});

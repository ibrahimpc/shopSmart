import React from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import AppText from '../components/AppText';
import TabIcon from '../components/TabIcon';
import {APP_SCREENS} from '../constants/utils';
import {Pressable, StyleSheet} from 'react-native';
import ProductListScreen from '../screens/ProductListScreen';
import {getTabBar} from '../helpers';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
const AppNavigation: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>(APP_SCREENS[0]);

  const handleTabPressed = (item: string) => {
    if (currentScreen !== item) {
      setCurrentScreen(item);
    }
  };
  const renderSelectedTabScreen = () => {
    switch (currentScreen) {
      case APP_SCREENS[0]:
        return <ProductListScreen />;
      case APP_SCREENS[1]:
        return <CartScreen />;
      case APP_SCREENS[2]:
        return <ProfileScreen />;
      default:
        return <ProductListScreen />;
    }
  };
  const renderTabView = () => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.mainItemContainer}>
          {APP_SCREENS?.map((item, index) => {
            const {text, color, iconEmoji} = getTabBar(item, currentScreen);
            const isActive = currentScreen === item;
            return (
              <Pressable
                onPress={() => handleTabPressed(item)}
                hitSlop={20}
                key={index}
                style={[
                  styles.tabBarView,
                  isActive && styles.activeTabBarView,
                ]}>
                <TabIcon icon={iconEmoji} color={color} size={20} />
                <AppText text={text} color={color} fontSize={12} />
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>{renderSelectedTabScreen()}</View>
      {renderTabView()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  screenContainer: {
    flex: 1,
    paddingBottom: 120,
  },
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    marginHorizontal: 20,
    paddingVertical: 7,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  mainItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabBarView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    gap: 4,
  },
  activeTabBarView: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
});

export default AppNavigation;

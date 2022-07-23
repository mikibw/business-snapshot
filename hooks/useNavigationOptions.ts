import React, {DependencyList} from 'react';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationOptions} from '@react-navigation/stack';

const useNavigationOptions = (options: StackNavigationOptions, deps: DependencyList = []) => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions(options);
  }, [navigation, ...deps]);
};

export default useNavigationOptions;

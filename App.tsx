import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import {setGlobalState} from '@hooks/useGlobalState';
import RootNavigator from './navigation/root';
import {enterApplication} from '@services/behaviors';
import fetchAppControl from '@services/fetchAppControl';
import useDatabaseInitialize from '@hooks/useDatabaseInitialize';
import {ActionSheetProvider, connectActionSheet} from '@expo/react-native-action-sheet';
import {PromptProvider} from '@components/Prompt';
import {DateTimePickerProvider} from '@components/DateTimePicker';

function App() {
  const isLoadingComplete = useCachedResources();
  const isDatabaseInitComplete = useDatabaseInitialize();

  React.useEffect(() => {
    enterApplication();
    fetchAppControl().then(data => setGlobalState('appControl', data));
  }, []);

  if (isLoadingComplete && isDatabaseInitComplete) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <DateTimePickerProvider>
          <PromptProvider>
            <ActionSheetProvider>
              <RootNavigator />
            </ActionSheetProvider>
          </PromptProvider>
        </DateTimePickerProvider>
      </SafeAreaProvider>
    );
  }
  return null;
}

export default connectActionSheet(App);

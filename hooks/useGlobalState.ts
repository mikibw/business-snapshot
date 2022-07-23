import {createGlobalState} from 'react-hooks-global-state';
import {AppControl} from 'services/fetchAppControl';

const state: {
  appControl: AppControl | null;
  isSubscribed: boolean;
} = {
  appControl: null,
  isSubscribed: false,
};

const {setGlobalState, getGlobalState, useGlobalState} = createGlobalState(state);

export {setGlobalState, getGlobalState};

export default useGlobalState;

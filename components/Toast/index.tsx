import React from 'react';
import Toast from 'react-native-easy-toast';

export default class extends React.Component {
  toast: Toast | null = null;
  show(text: string) {
    if (!text) {
      return;
    }
    this.toast?.show(text);
  }
  render() {
    return <Toast position="top" ref={toast => (this.toast = toast)} />;
  }
}

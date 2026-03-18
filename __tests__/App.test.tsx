import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-safe-area-context', () => {
  const {View} = require('react-native');

  return {
    SafeAreaView: ({children}: {children: React.ReactNode}) => (
      <View>{children}</View>
    ),
  };
});

test('renders correctly', () => {
  ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});

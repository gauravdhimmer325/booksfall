import React from 'react';
import Routes from './src/navigation/Routes';
import { Provider } from 'react-redux';
import { Store } from './src/store/store';

const App = () => {
  //somechanges here
  // console.disableYellowBox = true;
  return (
    <Provider store={Store}>
      <Routes />
    </Provider>
  );
};

export default App;

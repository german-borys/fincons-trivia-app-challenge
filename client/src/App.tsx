import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';
import Quiz from './components/Quiz';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Quiz />
      </div>
    </Provider>
  );
};

export default App;
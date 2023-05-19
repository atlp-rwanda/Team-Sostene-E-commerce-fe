import { Route, Routes } from 'react-router';
import Home from './pages/home/home';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div data-testid="app">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;

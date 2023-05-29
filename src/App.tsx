import { Route, Routes } from 'react-router';
import Home from './pages/home/home';
import store from './redux/store';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Navigation from './components/navigation/nav';

function App() {
  library.add(fab, fas);
  return (
    <div data-testid="app">
      <Provider store={store}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;

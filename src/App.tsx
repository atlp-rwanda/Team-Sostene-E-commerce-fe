import Home from './components/home/home'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <div>
      <Provider store={store}>
        <Home />
        </Provider>
    </div>
  );
}

export default App;

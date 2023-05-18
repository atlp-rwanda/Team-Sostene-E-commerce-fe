import { describe, it } from '@jest/globals';
import { render,fireEvent,screen } from '@testing-library/react';
import Home from '../components/home/home';
import { Provider } from 'react-redux';
import store from '../redux/store';
import counterReducer,{ increment,addValue } from '../redux/slices/counterSlice';

const Mod = ()=>{
  return (
      <Provider store={store}>
      <Home />
      </Provider>
  )
}

describe('Home Component', () => {
  let initialState:{
    counter:number,
    status:string
  }
  
  beforeEach(()=>{
    initialState= {counter:0,status:'idle'}
  })
  
  it('renders the home pages', async () => {
    const { getByText } = render(<Mod />);
    const pageTitle = getByText('home page');
    expect(pageTitle).toBeInTheDocument();
  });

  it('should test increment reducer', function(){
      const nextState= counterReducer(initialState,increment())
      expect(nextState.counter).toEqual(1)
  })

  it('should test addvalue reducer', function(){
    const nextState= counterReducer(initialState,addValue(2))
    expect(nextState.counter).toEqual(2)
  })

  it('integration test of the component ', function(){
    render(<Mod />)
    const Ele = screen.getByText(/counter state/i)
    const btnElement = screen.getByRole('button',{name:'INCREMENT COUNTER'})
    fireEvent.click(btnElement)
    expect(Ele.textContent).toBe('counter state 1');
  })
});




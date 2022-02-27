import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { HashRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from '../Redux/Reducer/RootReducer';

function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState, compose(
      applyMiddleware(thunk),
    )),
    ...renderOptions
  } = {},
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return <Provider store={store}>
      <Router>{children}</Router>
    </Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };

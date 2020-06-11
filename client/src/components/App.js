import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { TodoContainer } from './Todo';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Route exact path={['/', '/:uuid']} component={TodoContainer} />
      </Router>
    </RecoilRoot>
  );
}

export default App;

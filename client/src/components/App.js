import React from 'react';
import { RecoilRoot } from 'recoil';

import { TodoContainer } from './Todo';

function App() {
  return (
    <RecoilRoot>
      <TodoContainer />
    </RecoilRoot>
  );
}

export default App;

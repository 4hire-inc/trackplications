import React from 'react';

const App = (props: any) => {  // update type when props are defined
  return(
    <div>
      <h1>Hello World</h1>
      {props.children}
    </div>
  );
};

export default App;
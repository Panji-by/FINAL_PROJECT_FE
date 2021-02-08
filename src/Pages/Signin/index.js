import react, {useState} from 'react'
import Login from './login';

function App() {
  return (
    <div className='parentLogin'>
      <div className='sideLogin'>
        <Login />
      </div>
      <div className='sideImage'></div>
    </div>
  );
}

export default App;
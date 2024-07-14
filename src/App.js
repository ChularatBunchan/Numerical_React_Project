import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Root from './Root';
import Linear from './Linear';
import Interpolation from './Interpolation';
import Final from './Root/Final';
import './server'
import API from './Root/api1';

export default function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={ <Final /> } />
          <Route path='/Root' element={<Root />} />
          <Route path='/Linear' element={<Linear />} />
          <Route path='/Interpolation' element={<Interpolation />} />
        </Routes>
      </div>
     
    </>
  );
}

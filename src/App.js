
import './App.css';
import {Routes, Route} from 'react-router-dom';
import TableContents from './components/TableContents/TableContents';
import UserEdit from './components/UserEdit/UserEdit';

function App() {
  return (
    <div className="App">
    <h1 className='heading'>User Management Dashboard</h1>
<Routes>
  <Route path='/' element={<TableContents />}></Route>
  <Route path='/:id' element={<UserEdit />}></Route>
</Routes>
    </div>
  );
}

export default App;


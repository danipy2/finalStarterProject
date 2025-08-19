import './App.css';
import 'tailwindcss';
import Login from './components/Login';
import Signup from './components/Signup';
import JobList from './components/JobList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Description } from './components/Description';
import { Provider } from 'react-redux';
import { store } from './store';
import VerifyEmail from './components/Verify';
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verify' element={<VerifyEmail/>}/>

        <Route path='/Signup' element={<Signup/>}/>
        <Route path="/Descrpition/:id" element={<Description/>}/>
        <Route path="/" element={<JobList />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;

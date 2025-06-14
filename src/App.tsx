import './App.css';
import { Routes, Route } from "react-router-dom";
 import Index from './Pages/Index';
// import Nav from './Components/Nav';





function App() {

  caches.keys().then((names) => {
    Promise.all(names.map(name => caches.delete(name))).then(() => {
      // Perform a hard reload
      //  window.location.reload();
    });
  });

  return (
    <div>
      {/* <Navbar/> */}
      <Routes>
      <Route path='*' element={<Index />}/>
      

      </Routes>
      {/* <Nav/> */}
    </div>
  );
}

export default App;

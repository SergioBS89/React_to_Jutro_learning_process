import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

function App() {

  //Set this value to switch bettwen components
  const switchForm = true 

  return (
    <>
      <Header />
      <main>
       {switchForm ?  <Login /> : <Signup />}        
      </main>
    </>
  );
}

export default App;

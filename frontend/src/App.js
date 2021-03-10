import logo from './logo.svg';
import './App.css';
import FirstComponent from "./FirstComponent"
import FormTest from "./FormTest"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        hello world

        <FormTest displaytext="test"/>
        {/*<FirstComponent displaytext="test"/>*/}
      </header>
    </div>
  );
}

export default App;

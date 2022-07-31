import './App.css';
import BaseProductList from "./components/BaseProductList";
import CreateBaseProductForm from "./components/CreateBaseProductForm";

function App() {
  return (
    <div className="App">
      <CreateBaseProductForm/>
      <BaseProductList/>
    </div>
  );
}

export default App;

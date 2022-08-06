import './App.css';
import BaseProductTable from "./components/BaseProductTable";
import CreateBaseProductForm from "./components/CreateBaseProductForm";

function App() {
  return (
    <div className="App">
      <CreateBaseProductForm/>
      <BaseProductTable/>
    </div>
  );
}

export default App;

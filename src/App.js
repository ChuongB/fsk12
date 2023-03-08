import "./App.css";
import ListProduct from "./components/ProductList";
// import useAxios from "axios-hooks";
// import Counter from "./components/Counter";

const url = "http://localhost:3004/products";

function App() {
  // const [{ data, loading, error }, refetch] = useAxios(url);

  // console.log(data, loading);

  // return <ListProduct products={data || []} id={'test'} />;

  return <ListProduct />;
}

export default App;

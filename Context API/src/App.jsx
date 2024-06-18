import Header from './components/Header.jsx';
import Product from './components/Product.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import ShopContextProvider from './store/shopping-context.jsx';


function App() {  

  return (
    //This is how we implement our function context
    <ShopContextProvider>
      <Header/>
      {/* we can wrap as children the whole iteration of products from the app component and leave Shop component more reusable*/}
      <Shop>
      {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product}/>
          </li>
        ))}
      </Shop>
      </ShopContextProvider>
  );
}

export default App;

const { hot } = require("react-hot-loader/root");
const React =  require("react");
require("./styles/styles.scss");
const { Route, Switch } = require("react-router-dom");
const { Helmet } = require("react-helmet");

const Layout = require("./components/Layout/Layout");

const Search = require("./pages/Search");
const ProductsDetail = require("./pages/ProductDetail");
const ContextProvider = require("./contexts/provider");

const App = () => {
  return (
    <>
      {/* Se utiliza Helmet para SEO */}
      <Helmet>
        <title>Mercado Libre</title>
        <meta name="description" content="Mercado Libre App" />
      </Helmet>

      <ContextProvider>
        <Layout>
          <Switch>
            <Route path="/items" exact>
              <Search />
            </Route>
            <Route path="/items/:id" exact>
              <ProductsDetail />
            </Route>
          </Switch>
        </Layout>
      </ContextProvider>
    </>
  );
};
export default hot(App);
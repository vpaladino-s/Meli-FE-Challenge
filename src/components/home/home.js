const React = require("react");
const PropTypes = require("prop-types");

const SearchBar = require("../search-bar/search-bar");
const Breadcrumb = require('../Breadcrumb/Breadcrumb');

const styles = require('./home.scss');

export default function Home(props) {
  
  return (
    <>
      <SearchBar></SearchBar>
      <Breadcrumb></Breadcrumb>
      <div className={styles.container}>{props.children}</div>
    </>
  );
}

Home.propTypes = {
  children: PropTypes.node,
};
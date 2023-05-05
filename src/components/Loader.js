import React, { Fragment } from "react";

const Loader = ({}) => {
  const loaderStyles = {
    display: {
      display: "block",
      opacity: "1",
    },
  };
  return (
    <Fragment>
      <div id="loader" style={loaderStyles.display}></div>
    </Fragment>
  );
};

export default Loader;

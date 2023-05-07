import { Fragment } from "react";

const SmallCard = ({ svgLink, Label, Number }) => {
  return (
    <Fragment>
      <div class="col-xl-3 col-md-6 col-6">
        <div class="box">
          <div class="box-body text-center">
            <div class="bg-primary-light rounded10 p-20 mx-auto w-100 h-100">
              <img
                src={svgLink}
                class=""
                alt=""
              />
            </div>
            <p class="text-fade mt-15 mb-5">{ Label }</p>
            <h2 class="mt-0">{ Number }</h2>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SmallCard;

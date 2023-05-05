import { Fragment } from "react";

const SmallCard = () => {
  return (
    <Fragment>
      <div class="col-xl-3 col-md-6 col-6">
        <div class="box">
          <div class="box-body text-center">
            <div class="bg-primary-light rounded10 p-20 mx-auto w-100 h-100">
              <img
                src="https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-1.svg"
                class=""
                alt=""
              />
            </div>
            <p class="text-fade mt-15 mb-5">Total Patients</p>
            <h2 class="mt-0">1,548</h2>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SmallCard;

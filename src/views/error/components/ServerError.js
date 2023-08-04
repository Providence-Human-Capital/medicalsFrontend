import React from "react";

const ServerError = () => {
  return (
    <>
      <section class="error-page h-p100">
        <div class="container h-p100">
          <div class="row h-p100 align-items-center justify-content-center text-center">
            <div class="col-lg-7 col-md-10 col-12">
              <div class="rounded30 p-50">
                <img
                  src="/assets/images/auth-bg/500.jpg"
                  class="max-w-200"
                  alt=""
                />
                <h1>Uh-Ah</h1>
                <h3>Internal Server Error !</h3>
                <div class="my-30">
                </div>
                <h5 class="mb-15">-- OR --</h5>
                <h4>Please try after some time</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServerError;

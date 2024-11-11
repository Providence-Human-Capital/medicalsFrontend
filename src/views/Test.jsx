import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Test = () => {
  const initialValues = {
    industryType: "", // Holds the selected industry type
    mining_mineral: "",
    other_description: "",
  };

  const validationSchema = Yup.object().shape({
    industryType: Yup.string().required("Industry type is required"),
    mining_mineral: Yup.string().when("industryType", {
      is: "mining",
      then: Yup.string().required("Mineral is required"),
    }),
    other_description: Yup.string().when("industryType", {
      is: "other",
      then: Yup.string().required("Other description is required"),
    }),
  });

  return (
    <section className="content">
      <div className="row">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>


              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Test;




import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../components/loader/Loading";
import BreadCrumb from "../../components/BreadCrumb";
import { API } from "../../config";

const EditIllness = () => {
  const [loading, setLoading] = useState(false);
  const [redirectBack, setRedirectBack] = useState(false);
  const navigate = useNavigate();
  const { illnessId } = useParams();
  const [illness, setIllness] = useState({});
  const illnesses = useSelector((state) => state.illness.illnesses) || [];

  useEffect(() => {
    const illnessItem = illnesses.filter(
      (illness) => illness.id === parseInt(illnessId)
    );

    setIllness(illnessItem[0]);

    if (redirectBack) {
      navigate("/illnesses");
    } else {
      return;
    }
  }, [illnessId, redirectBack]);

  const validationSchema = yup.object().shape({
    illness_name: yup.string().required("Please enter the illness name"),
  });

  const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/illness/edit/${illnessId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      resetForm();
      setRedirectBack(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <BreadCrumb title={"Edit Illnesses"} activeTab={"Edit Illnesses"} />
      <div className="row">
        <div className="col-xl-8 col-12">
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
                  <h3 style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}>ENTER ILLNESS UPDATE DETAILS</h3>
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      illness_name: illness.illness_name,
                    }}
                    onSubmit={handleUpdateSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ values, isSubmitting, handleSubmit }) => (
                      <Form>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-floating">
                              <Field
                                type="text"
                                className="form-control"
                                id="illness_name"
                                name="illness_name"
                              />
                              <label htmlFor="illness_name" style={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                              }}>Illness Name</label>

                              <ErrorMessage
                                name="illness_name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="separation-div"></div>
                        {loading ? (
                          <Loading />
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            style={{
                              borderRadius: "10px",
                              textTransform: "uppercase",
                              fontWeight: "bold",
                            }}
                          >
                            Update Illness
                          </button>
                        )}
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditIllness;

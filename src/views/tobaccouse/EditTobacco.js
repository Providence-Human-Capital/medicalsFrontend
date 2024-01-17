import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { API } from "../../config";
import Loading from "../../components/loader/Loading";
import BreadCrumb from "../../components/BreadCrumb";

const EditTobacco = () => {
  const [loading, setLoading] = useState(false);
  const [redirectBack, setRedirectBack] = useState(false);
  const navigate = useNavigate();

  const { tobaccoId } = useParams();
  const [tobacco, setTobacco] = useState({});

  const tobaccos = useSelector((state) => state.tobacco.tobaccos) || [];

  useEffect(() => {
    const tobaccoItem = tobaccos.filter(
      (tobacco) => tobacco.id === parseInt(tobaccoId)
    );

    setTobacco(tobaccoItem[0]);
    if (redirectBack) {
      navigate("/tobacco");
    } else {
      return;
    }
  }, [tobaccoId, redirectBack]);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please enter the  name"),
  });

  const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/tobacco/edit/${tobaccoId}`, {
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
        <div className="col-xl-12 col-12">
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="">
                  <h2>Enter your Illnesses details</h2>
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      name: tobacco.name,
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
                                id="name"
                                name="name"
                              />
                              <label htmlFor="name">Tobacco Name</label>

                              <ErrorMessage
                                name="name"
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

export default EditTobacco;

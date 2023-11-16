import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { API } from "../../config";
import Loading from "../loader/Loading";
import { useDispatch } from "react-redux";
import { formsActions } from "../../redux_store/forms-store";

const ReferralCommentModal = ({ show, handleClose, vitalId }) => {
  const dispatch = useDispatch();
  // /physical/referral/comment/{physical_id}
  const [isUpdating, setIsUpdating] = useState(false);
  const initialValues = {
    referral_comment: "",
  };

  const validationSchema = Yup.object().shape({
    referral_comment: Yup.string().required("Referral comment is required"),
  });

  const onSubmit = async (values) => {
    console.log(values);
    // Handle form submission logic here
    setIsUpdating(true);
    try {
      const response = await fetch(
        `${API}/physical/referral/comment/${vitalId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      dispatch(formsActions.setPhysicalExamination(data.data));
      setIsUpdating(false);
    } catch (error) {
      console.log(error);
      setIsUpdating(false);
    }
    handleClose();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const modalClass = `modal ${show ? "show" : ""}`;

  return (
    <div className={modalClass} style={{ display: show ? "block" : "none" }}>
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
        style={{ minHeight: "50vh" }}
      >
        <div
          className="modal-content"
          style={{
            borderRadius: "10px",
            minHeight: "50vh",
          }}
        >
          <div className="modal-header">
            <h4
              className="box-title"
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Referral Comment
            </h4>
            <button type="button" className="close" onClick={handleClose}>
              <span>
                {" "}
                <FontAwesomeIcon icon={faClose} />
              </span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="referral_comment">Referral Comment</label>
                <textarea
                  className={`form-control ${
                    formik.touched.referral_comment &&
                    formik.errors.referral_comment
                      ? "is-invalid"
                      : ""
                  }`}
                  id="referral_comment"
                  name="referral_comment"
                  value={formik.values.referral_comment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    height: "280px",
                  }}
                />
                {formik.touched.referral_comment &&
                  formik.errors.referral_comment && (
                    <div className="invalid-feedback">
                      {formik.errors.referral_comment}
                    </div>
                  )}
              </div>
              {isUpdating ? (
                <Loading />
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    borderRadius: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Submit Referral Comment & Print
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralCommentModal;

import React, { Fragment, useEffect } from "react";
import DiseaseItem from "./DiseaseItem";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../config";
import { formsActions } from "../../../redux_store/forms-store";

const DiseaseHistory = ({ patientId }) => {
  const patientIllnesses = useSelector(
    (state) => state.forms.patientsIllnesses
  );

  const dispatch = useDispatch();

  const getDiseaseHistory = async () => {
    try {
      const illnessesHistoryRespose = await fetch(
        `${API}/patients/${patientId}/illnesses`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await illnessesHistoryRespose.json();
      console.log("Illnesss", responseData);

      if (illnessesHistoryRespose.ok) {
        dispatch(formsActions.setPatientsIllness(responseData));
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getDiseaseHistory();
  }, [patientId]);

  return (
    <Fragment>
      <div className="box">
        <div className="box-header no-border">
          <h4 className="box-title">
            <strong>Patient's Disease History</strong>
          </h4>
        </div>
        <div className="box-body">
          <table class="table table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Illness Name</th>
                <th scope="col">Year of Treatment</th>
              </tr>
            </thead>
            <tbody>
              {patientIllnesses.map((illness, index) => (
                <tr key={index}>
                  <td>{illness.name}</td>
                  <td>{illness.treatment_year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default DiseaseHistory;

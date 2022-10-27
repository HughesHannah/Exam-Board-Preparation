import { broadBands } from "../../utils/GradeConversion.js";
import React, { useState } from "react";
import { variables } from "../../Variables";
import axios from "axios";
import "./grading.scss";

const EditClassificationGrade = ({ classificationData }) => {
  const [inputClassification, setInputClassification] = useState(null);
  const [inputStandardBoundary, setInputStandardBoundary] = useState(null);
  const [inputDiscretionaryBoundary, setInputDiscretionaryBoundary] =
    useState(null);
  const [inputDiscretionaryPercent, setInputDiscretionaryPercent] =
    useState(null);
  const [inputBand, setInputBand] = useState(null);

  const handleClassificationChangeSubmission = async (e) => {
    const formData = new FormData();

    formData.append("classificationName", inputClassification);
    formData.append("standardBoundary", inputStandardBoundary);
    formData.append("discretionaryBoundary", inputDiscretionaryBoundary);
    formData.append("percent", inputDiscretionaryPercent);
    formData.append("band", inputBand);
    let response;

    try {
      response = axios.post(
        variables.API_URL + "classificationChangeAPI/",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      alert("Classification change applied");
      location.reload();
    } catch (error) {
      console.log("error");
    }
  };

  function loadFields() {
    if (inputClassification) {
      let selectedClassification = classificationData.find(
        (obj) => obj.classificationName === inputClassification
      );

      return (
        <div>
          <div className="formInput">
            <p>Set lower boundary for standard GPA:</p>
            <div className="input">
              <input
                className="inputBox"
                type="number"
                step="any"
                onChange={(e) => setInputStandardBoundary(e.target.value)}
              />
            </div>
          </div>
          <div className="formInput">
            <p>Set lower boundary for discretionary GPA:</p>
            <div className="input">
              <input
                className="inputBox"
                type="number"
                step="any"
                onChange={(e) => setInputDiscretionaryBoundary(e.target.value)}
              />
            </div>
          </div>
          <div className="formInput">
            <p>Set discretionary percentage:</p>
            <div className="input">
              <input
                className="inputBox"
                type="number"
                onChange={(e) => setInputDiscretionaryPercent(e.target.value)}
              />%
            </div>
          </div>
          <div className="formInput">
            <p>At band</p>
            <div className="input">
              <select
                className="inputBox"
                id="Classification"
                name="classification"
                onChange={(e) => setInputBand(e.target.value)}
              >
                <option>Please Select</option>
                {broadBands.map((eachBand) => (
                  <option key={eachBand.band} value={eachBand.band}>
                    {eachBand.band}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="buttonDiv">
            <button
              className="button"
              onClick={handleClassificationChangeSubmission}
              disabled={
                !inputClassification &&
                !inputStandardBoundary &&
                !inputDiscretionaryBoundary &&
                !inputDiscretionaryPercent &&
                !inputBand
              }
            >
              Submit
            </button>
          </div>
        </div>
      );
    } else return "";
  }

  return (
    <div className="editClassification">
      <div>
        <p className="sectionTitle">Edit Classification</p>
      </div>
      <div className="formInitialInput">
        <select
          className="inputBox"
          id="Classification"
          name="classification"
          onChange={(e) => setInputClassification(e.target.value)}
        >
          <option>Please Select</option>
          {classificationData.map((eachClassification) => (
            <option
              key={eachClassification.id}
              value={eachClassification.classificationName}
            >
              {eachClassification.classificationName}
            </option>
          ))}
        </select>
      </div>
      {loadFields()}
    </div>
  );
};

export default EditClassificationGrade;

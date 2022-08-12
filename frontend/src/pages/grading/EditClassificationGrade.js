import { broadBands } from "../../utils/GradeConversion.js";
import React, { useState, useEffect } from "react";

const EditClassificationGrade = ({ classificationData }) => {
  const [inputClassification, setInputClassification] = useState(null);
  const [inputStandardBoundry, setInputStandardBoundry] = useState(null);
  const [inputInputDiscretionaryBoundry, setInputDiscretionaryBoundry] =
    useState(null);
  const [inputDiscretionaryPercent, setInputDiscretionaryPercent] =
    useState(null);
  const [inputBand, setInputBand] = useState(null);

  const handleClassificationChangeSubmission = async (e) => {
    const formData = new FormData();
    formData.append("classificationName", inputClassification);
    formData.append("standardBoundry", inputStandardBoundry);
    formData.append("discretionaryBoundry", inputStandardBoundry);
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
      let selectedClassification = (classificationData.find((obj) => obj.classificationName === inputClassification))
     

      return (
        <div>
          <div className="formInput">
            <p>Set lower boundry for standard GPA:</p>
            <input
              type="number"
              step="any"
              defaultValue={selectedClassification.lowerGPAStandard}
              onChange={(e) => setInputStandardBoundry(e.target.value)}
            />
          </div>
          <div className="formInput">
            <p>Set lower boundry for discretionary GPA:</p>
            <input
              type="number"
              step="any"
              defaultValue={selectedClassification.lowerGPADiscretionary}
              onChange={(e) => setInputDiscretionaryBoundry(e.target.value)}
            />
          </div>
          <div className="formInput">
            <p>Set discretionary percentage:</p>
            <input
              type="number"
              defaultValue={selectedClassification.percentageAboveForDiscretionary}
              onChange={(e) => setInputDiscretionaryPercent(e.target.value)}
            />
          </div>
          <div className="formInput">
            <p>At band</p>
            <select
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
          <button
            onClick={handleClassificationChangeSubmission}
            disabled={
              !inputClassification &&
              !inputStandardBoundry &&
              !inputInputDiscretionaryBoundry &&
              !inputDiscretionaryPercent &&
              !inputBand
            }
          >
            Submit
          </button>
        </div>
      );
    } else return "";
  }

  return (
    <div className="editGradeForm">
      <div className="formInput">
        <p>Classification</p>
        <select
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

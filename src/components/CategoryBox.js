import React from "react";

const CategoryBox = ({ singlePatient }) => {
  return (
    <div className="box box-body bg-primary"
    
    >
      <div className="flexbox align-items-center justify-content-center">
        <div className="text-center">
          {singlePatient && (
            <h5>
              <strong
                style={{
                  textTransform: "uppercase",
                }}
              >
                {singlePatient.category}
              </strong>
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryBox;

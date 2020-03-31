import React from "react";
import useCovid from "usecovid";

function App() {
  const { data, countryData, stateData } = useCovid({
    country: "US",
    state: "South Carolina",
    date: "03-30-2020"
  });

  return data ? (
    <>
      <div>Data length: {data.length}</div>
      <div>Country length: {countryData && countryData.length}</div>
      <div>State length: {stateData && stateData.length}</div>
    </>
  ) : (
    <h1>Loading</h1>
  );
}

export default App;

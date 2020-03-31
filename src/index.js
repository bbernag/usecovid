import { useEffect, useState } from "react";

const today = new Date();
const defaultDate = `${("0" + (today.getMonth() + 1)).slice(
  -2
)}-${today.getDate()}-${today.getFullYear()}`;

const getUrl = date =>
  `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv`;

export default function useCovid({ country, state, date = defaultDate }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(getUrl(date))
      .then(response => {
        if (response.status === 200) return response.text();
        else {
          throw new Error(
            `Error ${response.status} on the request with response ${response.statusText}. The requested date ${date} may not have any record yet. Remember that we are getting the records from https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports`
          );
        }
      })
      .then(covidData => {
        const parsedData = csvJSON(covidData);
        setData(parsedData);
      });
  }, [date]);

  const countryData = useCountry({ data, country, state });
  
  return { data, ...countryData };
}

function useCountry({ country, data, state }) {
  const [countryData, setCountryData] = useState(null);
  useEffect(() => {
    if (country && data) {
      const countryData =
        data && data.filter(item => item.Country_Region === country);

      const stateData = state
        ? countryData.filter(({ Province_State }) => Province_State === state)
        : null;

      setCountryData({ countryData, stateData });
    }
  }, [country, data, state]);

  return countryData;
}

function csvJSON(csv) {
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");
  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }

  return result;
}

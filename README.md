# useCovid

> React custom hook to get the latest information about Covid19
>Extracted from [CSSEGISandData](https://github.com/CSSEGISandData/COVID-19) daily reports.



## Install

```bash
npm install --save usecovid
```
-or-
```bash
yarn add usecovid
```
## Data format
```
[{
  "Active": "0",
  "Admin2": "Abbeville",
  "Combined_Key": "Abbeville",
  "Confirmed": "3",
  "Country_Region": "US",
  "Deaths": "0",
  "FIPS": "45001",
  "Last_Update": "2020-03-30 22:52:45",
  "Lat": "34.22333378",
  "Long_": "-82.46170658",
  "Province_State": "South Carolina",
  "Recovered": "0"
},
...]
```
## Usage

```jsx
import React from 'react'
import useCovid from "usecovid";

function App() {
  const { data, countryData, stateData } = useCovid({
    country: "US",
    state: "South Carolina",
    date: '03-30-2020'
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
```
### Properties
|  Value | Default  | Type  |
| ------------ | ------------ | ------------ |
|  date | `new Date()`  | string  |
|  country | null  | string  |
|  state | null  |string   |

Check the country list: [Country list](https://github.com/bbernag/usecovid/blob/master/countrylist).

History reports from [CSSEGISandData](https://github.com/CSSEGISandData/COVID-19): [Reports](https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports)

 
## License

MIT © [bbernag](https://github.com/bbernag)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).

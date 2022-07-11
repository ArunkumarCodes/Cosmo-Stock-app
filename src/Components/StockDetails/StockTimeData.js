import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types';
import axios from "axios";
import './StockDetails.css';

const StockTimeData = (props) => {
  const [StockTimeData, setstockTimeData] = useState();

  useEffect(() => {
    const url =`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${props.symbol}&interval=5min&apikey=Y005M25E3QZ0MRDE`;
    axios
      .get(url)
      .then((response) => {
        console.log("Stock Overview data");
        console.log(response.data);
        setstockTimeData({ ...response.data });
      })
      .catch((error) => console.log(error));
  }, [props.symbol]);

  return (
    <div>
      {(StockTimeData && StockTimeData["Time Series (5min)"]) ?
        <table >
          <tr>
            <td>Open</td>
            <td>High</td>
            <td>Low</td>
            <td>Close</td>
            <td>Volume</td>
          </tr>
          {Object.keys(StockTimeData["Time Series (5min)"]).map(
            (ele, index) => {
              return <>
                <tr>
                  <td colSpan={5}>{ele}</td>
                </tr>
                <tr>
                  <td>{StockTimeData["Time Series (5min)"][ele]["1. Open"]}</td>
                  <td>{StockTimeData["Time Series (5min)"][ele]["1. high"]}</td>
                  <td>{StockTimeData["Time Series (5min)"][ele]["1. low"]}</td>
                  <td>{StockTimeData["Time Series (5min)"][ele]["1. close"]}</td>
                  <td>{StockTimeData["Time Series (5min)"][ele]["1. volume"]}</td>
                </tr>
                
              </>
              
            }
          )
          }
        </table>
       :"Loading..."
      }
    </div>
  );
};

// StockTimeData.PropTypes={};
export default StockTimeData;

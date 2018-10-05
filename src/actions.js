import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE
} from "./constants";
import { getWeatherFromNet } from "./api";

export function getData() {
  return {
    type: FETCHING_DATA
  };
}

export function getDataSuccess(data) {
  return {
    type: FETCHING_DATA_SUCCESS,
    data
  };
}

export function getDataFailure() {
  return {
    type: FETCHING_DATA_FAILURE
  };
}

export function fetchData(data) {
  return dispatch => {
    dispatch(getData());
    getWeatherFromNet(data)
      .then(data => {
        dispatch(getDataSuccess(data));
      })
      .catch(err => console.log("err:", err));
  };
}

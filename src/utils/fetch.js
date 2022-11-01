import {formatString} from './dataFormatter';
import axios from 'axios';

const baseUrl = 'https://wmp.interaction.courses/api/v1/';
const apiKey = 'mdIbIre6';
const headers = {
  'content-type': 'text/plain; charset=UTF-8 application/json; charset=utf-8',
};

/**
 * Fetch All Samples.
 *
 * @return {Object}.
 */
export const fetchAllSamples = async () => {
  const url =
    baseUrl +
    `?apiKey=${apiKey}&mode=read&endpoint=samples&limit=9999&order=desc`;
  console.log(url);

  let data = {};
  try {
    await axios.get(url).then(res => {
      console.log(res.data);
      data = res.data;
    });
  } catch (error) {
    console.error(error);
  }
  return data;
};

/**
 * Fetch All Locations.
 *
 * @return {Object}.
 */
export const fetchAllLocations = async () => {
  const url = baseUrl + `?apiKey=${apiKey}&mode=read&endpoint=locations`;
  console.log(url);

  let data = {};
  try {
    await axios.get(url, {headers}).then(res => {
      console.log(res.data);
      data = res.data;
    });
  } catch (error) {
    console.error(error);
  }
  return data;
};

/**
 * Fetch All Sample To Locations.
 *
 * @return {Object}.
 */
export const fetchAllSampleToLocation = async () => {
  const url =
    baseUrl + `?apiKey=${apiKey}&mode=read&endpoint=samples_to_locations`;
  console.log(url);

  let data = {};
  try {
    await axios.get(url).then(res => {
      console.log(res.data);
      data = res.data;
    });
  } catch (error) {
    console.error(error);
  }
  return data;
};

/**
 * Create a Sample.
 *
 * @param {sampleType} string .
 * @param {sampleName} string.
 * @param {payload} payload data.
 * @return {Object}.
 */
export const createSample = async (sampleType, sampleName, payload) => {
  const formatType = formatString(sampleType);

  const stringPayload = JSON.stringify(payload);
  const url =
    baseUrl +
    `?apiKey=${apiKey}&mode=create&endpoint=samples&sampleType=${formatType}&sampleName=${sampleName}`;

  console.log(url);
  let data = {};
  try {
    await axios.post(url, stringPayload, {headers}).then(res => {
      console.log(res);
    });
  } catch (error) {
    console.error(error);
  }
  return data;
};

/**
 * Update a Sample.
 *
 * @param {sampleType} string .
 * @param {sampleName} string.
 * @param {payload} payload data.
 * @param {id} string Sample id.
 * @return {Object}.
 */
export const updateSample = async (sampleType, sampleName, payload, id) => {
  const formatType = formatString(sampleType);
  const stringPayload = JSON.stringify(payload);
  const url =
    baseUrl +
    `?apiKey=${apiKey}&mode=update&endpoint=samples&sampleType=${formatType}&sampleName=${sampleName}&id=${id}`;

  console.log(url);

  let data = {};
  try {
    await axios.post(url, stringPayload, {headers}).then(res => {
      console.log(res);
    });
  } catch (error) {
    console.error(error);
  }
  return data;
};
/**
 * create a share data.
 *
 * @param {sampleID} string .
 * @param {locationID} string.
 * @return {Object}.
 */
export const createSampleToLocation = async (sampleID, locationID) => {
  const url =
    baseUrl +
    `?apiKey=${apiKey}&mode=create&endpoint=samples_to_locations&sampleID=${sampleID}&locationID=${locationID}`;

  console.log(url);
  let data = {};
  try {
    await axios.get(url).then(res => {
      console.log(res);
    });
  } catch (error) {
    console.error(error);
  }
  return data;
};
/**
 * create a share data.
 *
 * @param {locationID} string.
 * @return {Object}.
 */
export const deleteSampleToLocation = async locationID => {
  const url =
    baseUrl +
    `?apiKey=${apiKey}&mode=delete&endpoint=samples_to_locations&id=${locationID}`;

  console.log(url);
  let data = {};
  try {
    await axios.get(url).then(res => {
      console.log(res);
    });
  } catch (error) {
    console.error(error);
  }
  return data;
};

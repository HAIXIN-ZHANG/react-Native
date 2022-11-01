/**
 * Returns formatted string.
 *
 * @param {string} The input string.
 * @return {string} formatted string.
 */
export const formatString = string => {
  let newString = string.toLowerCase();
  newString = newString.replaceAll(' ', '_');
  return newString;
};

/**
 * To find recording by keyword.
 *
 * @param {Array} recording.
 * @param {string} keyWord.
 * @return {Array, number}.
 */
export const findRecording = (recording, keyWord) => {
  let recordingIndex;

  const filterRecoding =
    recording.find((r, i) => {
      const key = Object.keys(r)[0];
      if (key === keyWord) {
        recordingIndex = i;
        return true;
      }
      return false;
    })[keyWord] || [];

  return {filterRecoding, recordingIndex};
};

import _ from "lodash";

const lookUp = (list, key, value, fetch) => {
	let search  = {};
	search[key] = value;
	let obj     = _.find(list, search);
	return obj ? obj[fetch] : "Unknown";
}

export default lookUp;

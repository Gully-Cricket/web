import React from "react";
import _ from "lodash";
import countries from "../../data/countries.json";

const Country = ({countryCode}) => {
	let countryName = 'N/A';

	if(countryCode) {
		let country = _.find(countries, {code: countryCode});
		countryName = country ? country.name : 'Unknown';
	}

	return (<span>{countryName}</span>);
}

export default Country;

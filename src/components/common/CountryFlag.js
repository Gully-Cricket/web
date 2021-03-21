import React from "react";
import ReactCountryFlag from "react-country-flag";
import _ from "lodash";

import countries from "../../data/countries.json";

const CountryFlag = (props) => {
	const { countryCode } = props;

	const getCountryName = (code) => {
		let country = _.find(countries, {code});
		return country ? country.name : 'Unknown';
	}

	return (<ReactCountryFlag countryCode={countryCode} title={getCountryName(countryCode)}/>)
}

export default CountryFlag;

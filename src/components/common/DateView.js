import React from "react";

const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

const DateView = ({dateString}) => {
	let date = '-- -- ----';

	if(dateString) {
		const d = new Date(dateString);
		date = `${monthNames[d.getMonth()]} ${d.getDay()}, ${d.getFullYear()}` ;
	}

	return (<span>{date}</span>)
}

export default DateView;

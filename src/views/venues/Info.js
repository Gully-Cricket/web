import React from "react";
import PropTypes from "prop-types";
import {Card, CardHeader, Row, Col, CardBody} from "shards-react";
import Country from "../../components/common/Country";
import {Link} from "react-router-dom";

const Info = ({venue, avatar}) => (
<Card small className="mb-4 pt-3">
	<CardHeader className="border-bottom text-center">
		<div className="mb-3 mx-auto">
			<img className="rounded-circle" src={avatar} alt={venue.firstName} width="110"/>
		</div>
		<h4 className="mb-0">{venue.name}</h4>
		<Link to={`/venues/${venue.id}/edit`} className="btn btn-outline-primary btn-pill mb-2">
			<i className="material-icons mr-1">edit</i> Edit Venue
		</Link>
	</CardHeader>
	<CardBody>
		<Row className={'mb-2'}>
			<Col lg={5} className={'font-weight-bold'}>Capacity</Col>
			<Col lg={7}>{venue.capacity}</Col>
		</Row>
		<Row className={'mb-2'}>
			<Col lg={5} className={'font-weight-bold'}>Address</Col>
			<Col lg={7}>{venue.address.city}, <Country countryCode={venue.address.country}/></Col>
		</Row>
		<Row className={'mb-2'}>
			<Col lg={5} className={'font-weight-bold'}>End 1</Col>
			<Col lg={7}>{venue.end1}</Col>
		</Row>
		<Row className={'mb-2'}>
			<Col lg={5} className={'font-weight-bold'}>End 2</Col>
			<Col lg={7}>{venue.end2}</Col>
		</Row>
	</CardBody>
</Card>
);

Info.propTypes = {
	Venue: PropTypes.object
};

Info.defaultProps = {
	venue: {
		name: null,
		capacity: null,
		end1: null,
		end2: null,
		address: {
			line1: null,
			line2: null,
			city: null,
			state: null,
			country: null,
			pincode: null
		}
	},
	avatar: require("./../../images/avatars/0.jpg")
};

export default Info;

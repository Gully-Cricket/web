import React from "react";
import PropTypes from "prop-types";
import {Card, CardHeader, Button, Row, Col, CardBody} from "shards-react";
import Date from "../../components/common/DateView";
import Country from "../../components/common/Country";
import {Link} from "react-router-dom";

const PlayerInfo = ({player, userDetails}) => (
<Card small className="mb-4 pt-3">
	<CardHeader className="border-bottom text-center">
		<div className="mb-3 mx-auto">
			<img className="rounded-circle" src={userDetails.avatar} alt={player.firstName} width="110"/>
		</div>
		<h4 className="mb-0">{player.firstName} {player.lastName}</h4>
		<Link to={`/players/${player.id}/edit`} className="btn btn-outline-primary btn-pill mb-2">
			<i className="material-icons mr-1">edit</i> Edit Player
		</Link>
	</CardHeader>
	<CardBody>
		<Row className={'mb-2'}>
			<Col lg={5} className={'font-weight-bold'}>Born</Col>
			<Col lg={7}> <Date dateString={player.dateOfBirth}/></Col>
		</Row>
		<Row className={'mb-2'}>
			<Col lg={5} className={'font-weight-bold'}>Age</Col>
			<Col lg={7}>{player.age} years</Col>
		</Row>
		<Row className={'mb-2'}>
			<Col lg={5} className={'font-weight-bold'}>Birth Place</Col>
			<Col lg={7}>{player.placeOfBirth.city}, <Country countryCode={player.placeOfBirth.country}/></Col>
		</Row>
		<Row className={'mb-2'}>
			<Col lg={5} className={'font-weight-bold'}>Height</Col>
			<Col lg={7}>{Math.floor(player.height / 12)} ft {player.height % 12} in</Col>
		</Row>
		<Row className={'mb-2'}>
			<Col lg={5} className={'font-weight-bold'}>Role</Col>
			<Col lg={7}>{player.role}</Col>
		</Row>
		<Row className={'mb-2'}>
			<Col lg={5} className={'font-weight-bold'}>Batting Style</Col>
			<Col lg={7}>{player.battingStyle}</Col>
		</Row>
		<Row className={'mb-2'}>
			<Col lg={5} className={'font-weight-bold'}>Bowling Style</Col>
			<Col lg={7}>{player.bowlingStyle}, {player.bowlingType}</Col>
		</Row>
	</CardBody>
</Card>
);

PlayerInfo.propTypes = {
	player: PropTypes.object
};

PlayerInfo.defaultProps = {
	player: {
		firstName: null,
		lastName: null,
		dateOfBirth: null,
		placeOfBirth: {
			line1: null,
			line2: null,
			city: null,
			state: null,
			country: null,
			pincode: null
		},
		role: null,
		age: null,
		battingStyle: null,
		bowlingStyle: null,
		bowlingType: null
	},
	userDetails: {
		avatar: require("./../../images/avatars/0.jpg")
	}
};

export default PlayerInfo;

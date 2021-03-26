import React from "react";
import PropTypes from "prop-types";
import {Card, CardHeader, Row, Col, CardBody} from "shards-react";
import Date from "../../components/common/DateView";
import Country from "../../components/common/Country";
import {Link} from "react-router-dom";
import teamLevels from "../../data/teamLevels.json";
import lookUp from "../../utils/lookUp";

const Info = ({team, avatar}) => (
<Card small className="mb-4 pt-3">
	<CardHeader className="border-bottom text-center">
		<div className="mb-3 mx-auto">
			<img className="rounded-circle" src={avatar} alt={team.firstName} width="110"/>
		</div>
		<h4 className="mb-0">{team.name}</h4>
		<Link to={`/teams/${team.id}/edit`} className="btn btn-outline-primary btn-pill mb-2">
			<i className="material-icons mr-1">edit</i> Edit Team
		</Link>
	</CardHeader>
	<CardBody>
		<Row className={'mb-2'}>
			<Col lg={5} className={'font-weight-bold'}>Formed On</Col>
			<Col lg={7}> <Date dateString={team.dateOfFormation}/></Col>
		</Row>
		<Row className={'mb-2'}>
			<Col lg={5} className={'font-weight-bold'}>Level</Col>
			<Col lg={7}>{ lookUp(teamLevels, "code",team.level, "name")}</Col>
		</Row>
		<Row className={'mb-2'}>
			<Col lg={5} className={'font-weight-bold'}>Base</Col>
			<Col lg={7}>{team.base.city}, <Country countryCode={team.base.country}/></Col>
		</Row>
	</CardBody>
</Card>
);

Info.propTypes = {
	Team: PropTypes.object
};

Info.defaultProps = {
	team: {
		name: null,
		level: null,
		dateOfFormation: null,
		base: {
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

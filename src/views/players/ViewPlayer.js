import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "shards-react";

import http from "../../axios";
import PageTitle from "../../components/common/PageTitle";
import UserAccountDetails from "../../components/user-profile-lite/UserAccountDetails";
import PlayerInfo from "./PlayerInfo";

const ViewPlayer = (props) => {
	const [player, setPlayer] = useState({firstName: null, lastName: null, role: null, dateOfBirth: null, age: null, placeOfBirth: {}});
	useEffect(() => {
		getPlayer().then(r => {
		}).catch(e => {
		});
	}, []);

	const getPlayer = async () => {
		try {
			let {data} = await http.get(`players/${props.match.params.playerId}`);
			setPlayer(data);
		} catch(e) {

		}
	}

	return (
	<Container fluid className="main-content-container px-4">
		<Row noGutters className="page-header py-4">
			<PageTitle subtitle="Player Profile" md="12" className="ml-sm-auto mr-sm-auto"/>
		</Row>
		<Row>
			<Col lg="4">
				<PlayerInfo player={player} />
			</Col>
			<Col lg="8">
				<UserAccountDetails/>
			</Col>
		</Row>
	</Container>
	);
};

export default ViewPlayer;

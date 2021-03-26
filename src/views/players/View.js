import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "shards-react";

import http from "../../axios";
import PageTitle from "../../components/common/PageTitle";
import Info from "./Info";

const View = (props) => {
	const [player, setPlayer] = useState({
		firstName: null,
		lastName: null,
		role: null,
		dateOfBirth: null,
		age: null,
		height: null,
		placeOfBirth: {}
	});

	useEffect(() => {
		getPlayer().then(r => {
		}).catch(e => {
		});
	}, []);

	const getPlayer = async () => {
		try {
			let {data} = await http.get(`players/${props.match.params.playerId}`);
			if(data) {
				setPlayer({...data, placeOfBirth: data.placeOfBirth||{}});
			} else {
				props.history.push('/notfound');
			}
		} catch(e) {
			props.history.push('/erros');
		}
	}

	return (
	<Container fluid className="main-content-container px-4">
		<Row noGutters className="page-header py-4">
			<PageTitle subtitle="Player Profile" md="12" className="ml-sm-auto mr-sm-auto"/>
		</Row>
		<Row>
			<Col lg="4">
				<Info player={player}/>
			</Col>
			<Col lg="8">
			</Col>
		</Row>
	</Container>
	);
};

export default View;

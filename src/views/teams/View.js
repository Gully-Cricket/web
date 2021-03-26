import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "shards-react";

import http from "../../axios";
import PageTitle from "../../components/common/PageTitle";
import Info from "./Info";

const View = (props) => {
	const [team, setTeam] = useState({
		name: null,
		level: null,
		dateOfFormation: null,
		base: {}
	});

	useEffect(() => {
		getTeam().then(r => {
		}).catch(e => {
		});
	}, []);

	const getTeam = async () => {
		try {
			let {data} = await http.get(`teams/${props.match.params.teamId}`);
			if(data) {
				setTeam({...data, base: data.base||{}});
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
			<PageTitle subtitle="Team Profile" md="12" className="ml-sm-auto mr-sm-auto"/>
		</Row>
		<Row>
			<Col lg="4">
				<Info team={team}/>
			</Col>
			<Col lg="8">

			</Col>
		</Row>
	</Container>
	);
};

export default View;

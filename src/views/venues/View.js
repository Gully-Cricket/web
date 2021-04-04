import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "shards-react";

import http from "../../axios";
import PageTitle from "../../components/common/PageTitle";
import Info from "./Info";

const View = (props) => {
	const [venue, setVenue] = useState({
		name: null,
		capacity: null,
		end1: null,
		end2: null,
		address: {}
	});

	useEffect(() => {
		getVenue().then(r => {
		}).catch(e => {
		});
	}, []);

	const getVenue = async () => {
		try {
			let {data} = await http.get(`venues/${props.match.params.venueId}`);
			if(data) {
				setVenue({...data, address: data.address||{}});
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
			<PageTitle subtitle="Venue Profile" md="12" className="ml-sm-auto mr-sm-auto"/>
		</Row>
		<Row>
			<Col lg="4">
				<Info venue={venue}/>
			</Col>
			<Col lg="8">

			</Col>
		</Row>
	</Container>
	);
};

export default View;

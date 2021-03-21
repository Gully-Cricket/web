import React, {useEffect, useState} from "react";
import {Container, Row, Col, Card, CardHeader, CardBody} from "shards-react";

import http from "../../axios";
import PageTitle from "../../components/common/PageTitle";

const AddNewPost = () => {
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		http.get(`players`)
		.then(response => {
			console.log(response.data);
			setPlayers(response.data);
		})
		.catch(error => {
			alert("Error");
		});
	}, []);

	return (<Container fluid className="main-content-container px-4">
		{/* Page Header */}
		<Row noGutters className="page-header py-4">
			<PageTitle sm="4" title="Players" subtitle="List of players" className="text-sm-left"/>
		</Row>

		{/* Default Light Table */}
		<Row>
			<Col>
				<Card small className="mb-4">
					<CardHeader className="border-bottom">
						<h6 className="m-0">Available Players</h6>
					</CardHeader>
					<CardBody className="p-0 pb-3">
						<table className="table mb-0">
							<thead className="bg-light">
							<tr>
								<th scope="col" className="border-0">
									#
								</th>
								<th scope="col" className="border-0">
									Name
								</th>
								<th scope="col" className="border-0">
									Role
								</th>
							</tr>
							</thead>
							<tbody>
							{players.map(function(player, index) {
								return <tr key={player.id}>
									<td>{player.id}</td>
									<td>{player.firstName} {player.lastName}</td>
									<td>{player.role}</td>
								</tr>;
							})}
							</tbody>
						</table>
					</CardBody>
				</Card>
			</Col>
		</Row>
	</Container>);
};

export default AddNewPost;

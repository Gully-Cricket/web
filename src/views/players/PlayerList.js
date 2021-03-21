import React, {useEffect, useState} from "react";
import {Container, Row, Col, Card, CardHeader, CardBody, Button, CardFooter, Alert} from "shards-react";

import http from "../../axios";
import PageTitle from "../../components/common/PageTitle";
import CountryFlag from "../../components/common/CountryFlag";
import Pagination from "../../components/common/Pagination";

const PlayerList = () => {
	const [players, setPlayers] = useState([]);
	const [pager, setPager]     = useState({page: 0, perPage: 1});
	const [total, setTotal]     = useState(0);

	useEffect(() => {
		getPlayers(pager).then(r => {
		}).catch(e => {
		});
	}, [pager]);

	const getPlayers = async (pager) => {
		try {
			let {data} = await http.get(`players`, {params: pager});
			setPlayers(data.content);
			setTotal(data.totalElements);
		} catch(e) {

		}
	}

	return (<Container fluid className="main-content-container px-4">
		{/* Page Header */}
		<Row noGutters className="page-header py-4">
			<PageTitle sm="4" title="Players" subtitle="List of players" className="text-sm-left"/>
		</Row>

		{/* Default Light Table */}
		<Row>
			<Col>
				<Card small className="mb-4">
					<CardHeader className="border-bottom d-flex justify-content-between">
						<h5 className="m-0  ">Available Players</h5>
						<Button theme="success" size="sm" className="font-weight-bold" title="Add new player">
							<i className="material-icons">person_add</i> Add Player
						</Button>
					</CardHeader>

					<CardBody className="p-0 pb-3">
						<Alert className="mb-0 text-center"
						       theme={players.length > 0 ? "success" : "danger"}>
							<i className="fa fa-info mx-2"/> Players loaded {players.length}
						</Alert>

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
								<th scope="col" className="border-0">
									Age
								</th>
								<th scope="col" className="border-0 text-center">
									Country
								</th>
							</tr>
							</thead>
							<tbody>
							{players.map(function(player, index) {
								return <tr key={player.id}>
									<td>{player.id}</td>
									<td>{player.firstName} {player.lastName}</td>
									<td>{player.role}</td>
									<td>{player.age}</td>
									<td className="text-center">
										{player.placeOfBirth ? <CountryFlag countryCode="IN"/> : 'N/A'}
									</td>
								</tr>;
							})}
							</tbody>
						</table>
					</CardBody>

					<CardFooter className="border-top">
						<Pagination className="ml-auto float-right"
						            pager={pager}
						            total={total}
						            onPagerChange={setPager}/>
					</CardFooter>
				</Card>
			</Col>
		</Row>
	</Container>);
};

export default PlayerList;

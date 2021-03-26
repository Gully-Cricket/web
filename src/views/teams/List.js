import React, {useEffect, useState} from "react";
import {Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Alert} from "shards-react";

import http from "../../axios";
import PageTitle from "../../components/common/PageTitle";
import Pagination from "../../components/common/Pagination";
import {Link} from "react-router-dom";
import lookUp from "../../utils/lookUp";
import teamLevels from "../../data/teamLevels.json";
import countries from "../../data/countries.json";

const teamList = () => {
	const [teams, setteams] = useState([]);
	const [pager, setPager]     = useState({page: 0, perPage: 10});
	const [total, setTotal]     = useState(0);

	useEffect(() => {
		getteams().then(r => {
		}).catch(e => {
		});
	}, [pager]);

	const getteams = async () => {
		try {
			let {data} = await http.get(`teams`, {params: pager});
			setteams(data.content);
			setTotal(data.totalElements);
		} catch(e) {

		}
	}

	return (<Container fluid className="main-content-container px-4">
		{/* Page Header */}
		<Row noGutters className="page-header py-4">
			<PageTitle sm="4" title="Teams" subtitle="List of teams" className="text-sm-left"/>
		</Row>

		{/* Default Light Table */}
		<Row>
			<Col>
				<Card small className="mb-4">
					<CardHeader className="border-bottom d-flex justify-content-between">
						<h5 className="m-0  ">Available teams</h5>
						<Link to="/teams/add" theme="success" size="sm" className="btn btn-sm btn-success font-weight-bold" title="Add new team">
							<i className="material-icons">health_and_safety</i> Add team
						</Link>
					</CardHeader>

					<CardBody className="p-0 pb-3">
						<Alert className="mb-0 text-center"
						       theme={teams.length > 0 ? "success" : "danger"}>
							<i className="fa fa-info mx-2"/> teams loaded {teams.length}
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
									Base
								</th>
								<th scope="col" className="border-0">
									Level
								</th>
								<th scope="col" className="border-0">
									Date Of Formation
								</th>
							</tr>
							</thead>
							<tbody>
							{teams.map(function(team, index) {
								return <tr key={team.id}>
									<td>{team.id}</td>
									<td>
										<Link to={"/teams/" + team.id}>{team.name}</Link>
									</td>
									<td>{team.base.city}, {lookUp(countries, "code", team.base.country, "name")}</td>
									<td>{lookUp(teamLevels, "code", team.level, "name")}</td>
									<td>
										{team.dateOfFormation}
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

export default teamList;

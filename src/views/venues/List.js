import React, {useEffect, useState} from "react";
import {Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Alert} from "shards-react";

import http from "../../axios";
import PageTitle from "../../components/common/PageTitle";
import Pagination from "../../components/common/Pagination";
import {Link} from "react-router-dom";
import lookUp from "../../utils/lookUp";
import countries from "../../data/countries.json";

const venueList = () => {
	const [venues, setVenues] = useState([]);
	const [pager, setPager]   = useState({page: 0, perPage: 10});
	const [total, setTotal]   = useState(0);

	useEffect(() => {
		getVenues().then(r => {
		}).catch(e => {
		});
	}, [pager]);

	const getVenues = async () => {
		try {
			let {data} = await http.get(`venues`, {params: pager});
			setVenues(data.content);
			setTotal(data.totalElements);
		} catch(e) {

		}
	}

	return (<Container fluid className="main-content-container px-4">
		{/* Page Header */}
		<Row noGutters className="page-header py-4">
			<PageTitle sm="4" title="Venues" subtitle="List of venues" className="text-sm-left"/>
		</Row>

		{/* Default Light Table */}
		<Row>
			<Col>
				<Card small className="mb-4">
					<CardHeader className="border-bottom d-flex justify-content-between">
						<h5 className="m-0  ">Available venues</h5>
						<Link to="/venues/add" theme="success" size="sm" className="btn btn-sm btn-success font-weight-bold" title="Add new venue">
							<i className="material-icons">health_and_safety</i> Add venue
						</Link>
					</CardHeader>

					<CardBody className="p-0 pb-3">
						<Alert className="mb-0 text-center"
						       theme={venues.length > 0 ? "success" : "danger"}>
							<i className="fa fa-info mx-2"/> venues loaded {venues.length}
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
									Capacity
								</th>
								<th scope="col" className="border-0">
									Address
								</th>
								<th scope="col" className="border-0">
									End 1
								</th>
								<th scope="col" className="border-0">
									End 2
								</th>
							</tr>
							</thead>
							<tbody>
							{venues.map(function(venue) {
								return <tr key={venue.id}>
									<td>{venue.id}</td>
									<td>
										<Link to={"/venues/" + venue.id}>{venue.name}</Link>
									</td>
									<td>{venue.capacity}</td>
									<td>{venue.address.city}, {lookUp(countries, "code", venue.address.country, "name")}</td>
									<td>{venue.end1}</td>
									<td>{venue.end2}</td>
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

export default venueList;

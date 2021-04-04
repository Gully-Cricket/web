import React, {useEffect, useState} from "react";
import {Card, CardHeader, CardBody, Alert} from "shards-react";

import http from "../../../axios";
import {Link} from "react-router-dom";
import Date from "../../../components/common/DateView";

const teamList = ({teamId}) => {
	const [members, setMembers] = useState([]);

	useEffect(() => {
		getSquad().then(r => {
		}).catch(e => {
		});
	}, []);

	const getSquad = async () => {
		try {
			let {data} = await http.get(`teams/${teamId}/squad`);
			setMembers(data);
		} catch(e) {

		}
	}

	return (<Card small className="mb-4">
		<CardHeader className="border-bottom d-flex justify-content-between">
			<h5 className="m-0  ">Current Squad</h5>
			<Link to="/teams/add" theme="success" size="sm" className="btn btn-sm btn-success font-weight-bold" title="Add new team">
				<i className="material-icons">health_and_safety</i> Add team
			</Link>
		</CardHeader>

		<CardBody className="p-0 pb-3">
			<Alert className="mb-0 text-center"
			       theme={members.length > 0 ? "success" : "danger"}>
				<i className="fa fa-info mx-2"/> members loaded {members.length}
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
						Joined
					</th>
				</tr>
				</thead>
				<tbody>
				{members.map(function(member, index) {
					return <tr key={`member{index}`}>
						<td>{index+1}</td>
						<td>
							<Link to={"/players/" + member.player.id}>{member.player.firstName} {member.player.lastName}</Link>
						</td>
						<td>{member.player.role}</td>
						<td className="text-center">
							<Date dateString={member.startDate}/>
						</td>
					</tr>;
				})}
				</tbody>
			</table>
		</CardBody>
	</Card>);
};

export default teamList;

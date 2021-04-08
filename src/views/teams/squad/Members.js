import React, {useEffect, useState} from "react";
import {Card, CardHeader, CardBody, Alert, Button, Row, Col, Form} from "shards-react";
import {Link} from "react-router-dom";
import _ from "lodash";

import http from "../../../axios";
import DateView from "../../../components/common/DateView";

const teamList = ({teamId}) => {
	const [members, setMembers]               = useState([]);
	const [flag, setFlag]                     = useState(false);
	const [searchString, setSearchString]     = useState('');
	const [players, setPlayers]               = useState([]);
	const [selectedMember, setSelectedMember] = useState('');

	useEffect(() => {
		getSquad()
		.then(r => {
		}).catch(e => {
		});
	}, []);

	useEffect(() => {
		if(searchString.length > 2) {
			searchPlayers(searchString)
			.then(r => {
			}).catch(e => {
			});
		}
	}, [searchString]);

	const showForm = () => {
		setFlag(true);
	}

	const hideForm = () => {
		setSearchString('');
		setSelectedMember(null);
		setPlayers([]);
		setFlag(false);
	}

	const addPlayer = (e) => {
		e.preventDefault();
	}

	const searchPlayers = async (search) => {
		try {
			let {data}   = await http.get(`players/search`, {params: {search}});
			let _members = _.map(members, 'id');
			let _players = [];

			data.forEach(pl => {
				if(!_members.includes(pl.id)) {
					_players.push(pl);
				}
			})
			setPlayers(_players);
		} catch(e) {

		}
	}

	const getSquad = async () => {
		try {
			let {data} = await http.get(`teams/${teamId}/squad`);
			setMembers(data);
		} catch(e) {

		}
	}

	const addToSquad = async () => {
		try {
			await http.post(`teams/${teamId}/squad/add`, {
				playerId: selectedMember,
				startDate: new Date(),
				endDate: null
			});
			await getSquad();
			hideForm();
		} catch(e) {

		}
	}

	const removeFromSquad = async (member) => {
		try {
			await http.delete(`teams/${teamId}/squad/remove`, {
				data: {
					id: member.id,
					playerId: member.player.id,
					startDate: member.startDate,
					endDate: new Date()
				}
			});
			await getSquad();
		} catch(e) {

		}
	}

	return (<Card small className="mb-4">
		<CardHeader className="border-bottom d-flex justify-content-between">
			<h5 className="m-0  ">Current Squad</h5>
			<Button theme="success" onClick={showForm} disabled={flag}
			        title="Add new team" className="font-weight-bold">
				<i className="material-icons">person_add</i> Add player
			</Button>
		</CardHeader>

		<CardBody className="p-0 pb-3">
			{flag &&
			<Form onSubmit={addPlayer}>
				<Row>
					<Col className="">
						<div className="input-group p-2">
							<input type="text" className="form-control" value={searchString}
							       placeholder="Search Player" onChange={(e) => setSearchString(e.target.value)}/>
							<select className="form-control" value={selectedMember} onChange={(e) => setSelectedMember(e.target.value || '')}>
								<option value={''}>Select Player</option>
								{
									players.map((player, index) => {
										return (<option key={index} value={player.id}>{player.firstName} {player.lastName}</option>)
									})
								}
							</select>
							<div className="input-group-append">
								<Button className="" disabled={selectedMember === ''} onClick={addToSquad}>Submit</Button>
							</div>
							<div className="input-group-append">
								<Button theme="outline-secondary" onClick={hideForm}>Cancel</Button>
							</div>
						</div>
					</Col>
				</Row>
			</Form>
			}

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
					<th scope="col" className="border-0 text-center">
						Action
					</th>
				</tr>
				</thead>
				<tbody>
				{members.map(function(member, index) {
					return <tr key={`member${index}`}>
						<td>{index + 1}</td>
						<td>
							<Link to={"/players/" + member.player.id}>{member.player.firstName} {member.player.lastName}</Link>
						</td>
						<td>{member.player.role}</td>
						<td>
							<DateView dateString={member.startDate}/>
						</td>
						<td className="text-center">
							<i className="material-icons text-danger" onClick={() => removeFromSquad(member)}
							   title="Remove" style={{"cursor": "pointer"}}>person_remove</i>
						</td>
					</tr>;
				})}
				</tbody>
			</table>
		</CardBody>
	</Card>);
};

export default teamList;

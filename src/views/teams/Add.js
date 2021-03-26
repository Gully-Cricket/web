import React, {useState} from "react";
import {Container, Row, Col, CardHeader, Form, FormInput, FormSelect, Button, Card, CardBody, CardFooter} from "shards-react";

import http from "../../axios";
import PageTitle from "../../components/common/PageTitle";
import teamLevels from "../../data/teamLevels.json";
import countries from "../../data/countries.json";

const Add = (props) => {
	const [team, setTeam] = useState({
		name: null,
		level: null,
		dateOfFormation: null
	});

	const [base, setBase] = useState({
		line1: null,
		line2: null,
		city: null,
		state: null,
		country: null,
		pincode: null,
	});

	const updateTeam = (e) => {
		let update            = {};
		update[e.target.name] = e.target.value;
		let updatedTeam       = {...team, ...update}
		setTeam(updatedTeam);
	}

	const updateBase = (e) => {
		let update            = {};
		update[e.target.name] = e.target.value;
		let updatedBase       = {...base, ...update}
		setBase(updatedBase);
	}

	const reset = () => {
		document.getElementById('reset').click();
	}

	const submit = () => {
		document.getElementById('submit').click();
	}

	const createTeam = async () => {
		try {
			let payload = {
				...team,
				base
			}
			let {data}  = await http.post('teams', payload);
			console.log(data)
			props.history.push(`/teams/${data}`);
		} catch(e) {
			console.error(e);
		}
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		await createTeam();
	}

	return (
	<Container fluid className="main-content-container px-4">
		<Row noGutters className="page-header py-4">
			<PageTitle subtitle="Add Team" md="12" className="ml-sm-auto mr-sm-auto"/>
		</Row>
		<Row>
			<Col lg="12">
				<Card small className="mb-4">
					<CardHeader className="border-bottom">
						<h6 className="m-0">Add New Team</h6>
					</CardHeader>
					<CardBody>
						<Form onSubmit={onSubmit}>
							<Row form>
								<Col md="4" className="form-group">
									<label htmlFor="name">Team Name <span className="text-danger">*</span></label>
									<FormInput id="name"
									           name="name"
									           required
									           placeholder="Team Name"
									           defaultValue={team.name}
									           onChange={updateTeam}/>
								</Col>

								<Col md="4" className="form-group">
									<label htmlFor="level">Level <span className="text-danger">*</span></label>
									<FormSelect id="level"
									            name="level"
									            required
									            defaultValue={team.level}
									            onChange={updateTeam}>
										<option value={null}>Select Team Level</option>
										{
											teamLevels.map((teamLevel, index) => {
												return (<option key={index} value={teamLevel.code}>{teamLevel.name}</option>)
											})
										}
									</FormSelect>
								</Col>

								<Col md="4" className="form-group">
									<label htmlFor="dateOfFormation">Date Of Formation <span className="text-danger">*</span></label>
									<FormInput id="dateOfFormation" type="date"
									           name="dateOfFormation"
									           required
									           placeholder="Date Of Formation"
									           defaultValue={team.dateOfFormation}
									           onChange={updateTeam}/>
								</Col>
							</Row>

							<hr/>

							<Row form>
								<Col md="6" className="form-group">
									<label htmlFor="line1">Address Line 1</label>
									<FormInput id="line1"
									           name="line1"
									           placeholder="Address Line 1"
									           defaultValue={base.line1}
									           onChange={updateBase}/>
								</Col>

								<Col md="6" className="form-group">
									<label htmlFor="line2">Address Line 2</label>
									<FormInput id="line2"
									           name="line2"
									           placeholder="Address Line 2"
									           defaultValue={base.line2}
									           onChange={updateBase}/>
								</Col>
							</Row>

							<Row form>
								<Col md="3" className="form-group">
									<label htmlFor="city">City <span className="text-danger">*</span></label>
									<FormInput id="city"
									           name="city"
									           required
									           placeholder="City"
									           defaultValue={base.city}
									           onChange={updateBase}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="state">State <span className="text-danger">*</span></label>
									<FormInput id="state"
									           name="state"
									           required
									           placeholder="State"
									           defaultValue={base.state}
									           onChange={updateBase}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="country">Country <span className="text-danger">*</span></label>
									<FormSelect id="country"
									            name="country"
									            required
									            defaultValue={base.country}
									            onChange={updateBase}>
										<option value={null}>Select Country</option>
										{
											countries.map((country, index) => {
												return (<option key={index} value={country.code}>{country.name}</option>)
											})
										}
									</FormSelect>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="pincode">Pin Code</label>
									<FormInput id="pincode"
									           name="pincode"
									           placeholder="Pin Code"
									           defaultValue={base.pincode}
									           onChange={updateBase}/>
								</Col>
							</Row>

							<Button type="reset" id="reset" className="d-none"/>
							<Button type="submit" id="submit" className="d-none"/>
						</Form>
					</CardBody>
					<CardFooter className="border-top">
						<Button theme="secondary" className="pull-left" type="reset"
						        onClick={reset}>
							Reset
						</Button>

						<Button theme="accent" className="float-right" type="submit"
						        onClick={submit}>
							Submit
						</Button>
					</CardFooter>
				</Card>
			</Col>
		</Row>
	</Container>
	);
};

export default Add;

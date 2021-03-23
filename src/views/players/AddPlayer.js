import React, {useState} from "react";
import {Container, Row, Col, CardHeader, Form, FormInput, FormSelect, Button, Card, CardBody, CardFooter} from "shards-react";

import http from "../../axios";
import PageTitle from "../../components/common/PageTitle";
import countries from "../../data/countries.json";

const AddPlayer = () => {
	const [player, setPlayer] = useState({
		firstName: null,
		lastName: null,
		dateOfBirth: null,
		role: null,
		battingStyle: null,
		bowlingStyle: null,
		bowlingType: null,
		height: null
	});

	const [placeOfBirth, setPlaceOfBirth] = useState({
		line1: null,
		line2: null,
		city: null,
		state: null,
		country: null,
		pincode: null,
	});

	const updatePlayer = (e) => {
		let update            = {};
		update[e.target.name] = e.target.value;
		let updatedPlayer     = {...player, ...update}
		setPlayer(updatedPlayer);
	}

	const updatePlaceOfBirth = (e) => {
		let update              = {};
		update[e.target.name]   = e.target.value;
		let updatedPlaceOfBirth = {...placeOfBirth, ...update}
		setPlaceOfBirth(updatedPlaceOfBirth);
	}

	const reset = () => {
		document.getElementById('reset').click();
	}

	const submit = () => {
		document.getElementById('submit').click();
	}

	const createPlayer = async () => {
		try {
			await http.post('players');
		} catch(e) {

		}
	}

	const onSubmit = async (e) => {
		console.log(e);
		e.preventDefault();
		await createPlayer();
	}

	return (
	<Container fluid className="main-content-container px-4">
		<Row noGutters className="page-header py-4">
			<PageTitle subtitle="Add Player" md="12" className="ml-sm-auto mr-sm-auto"/>
		</Row>
		<Row>
			<Col lg="12">
				<Card small className="mb-4">
					<CardHeader className="border-bottom">
						<h6 className="m-0">Player Bio</h6>
					</CardHeader>
					<CardBody>
						<Form onSubmit={onSubmit}>
							<Row form>
								<Col md="4" className="form-group">
									<label htmlFor="firstName">First Name</label>
									<FormInput id="firstName"
									           name="firstName"
									           required
									           placeholder="First Name"
									           defaultValue={player.firstName}
									           onChange={updatePlayer}/>
								</Col>

								<Col md="4" className="form-group">
									<label htmlFor="lastName">Last Name</label>
									<FormInput id="lastName"
									           name="lastName"
									           required
									           placeholder="Last Name"
									           defaultValue={player.lastName}/>
								</Col>

								<Col md="4" className="form-group">
									<label htmlFor="dateOfBirth">Date Of Birth</label>
									<FormInput id="lastName" type="date"
									           name="dateOfBirth"
									           required
									           placeholder="Date Of Birth"
									           defaultValue={player.dateOfBirth}/>
								</Col>
							</Row>

							<hr/>

							<Row form>
								<Col md="6" className="form-group">
									<label htmlFor="line1">Address Line 1</label>
									<FormInput id="line1"
									           placeholder="Address Line 1"
									           defaultValue={placeOfBirth.line1}
									           onChange={updatePlaceOfBirth}/>
								</Col>

								<Col md="6" className="form-group">
									<label htmlFor="line2">Address Line 2</label>
									<FormInput id="line2"
									           placeholder="Address Line 2"
									           defaultValue={placeOfBirth.line2}
									           onChange={updatePlaceOfBirth}/>
								</Col>
							</Row>

							<Row form>
								<Col md="3" className="form-group">
									<label htmlFor="city">City</label>
									<FormInput id="city"
									           name="city"
									           placeholder="City"
									           defaultValue={placeOfBirth.city}
									           onChange={updatePlaceOfBirth}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="state">State</label>
									<FormInput id="state"
									           name="state"
									           placeholder="State"
									           defaultValue={placeOfBirth.state}
									           onChange={updatePlaceOfBirth}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="country">Country</label>
									<FormSelect id="country"
									            name="country"
									            required
									            defaultValue={placeOfBirth.country}
									            onChange={updatePlaceOfBirth}>
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
									           defaultValue={placeOfBirth.pincode}
									           onChange={updatePlaceOfBirth}/>
								</Col>
							</Row>

							<hr/>

							<Row form>
								<Col md="3" className="form-group">
									<label htmlFor="height">Height</label>
									<FormInput type="number"
									           step="1"
									           id="height"
									           name="height"
									           placeholder="Height in Inches"
									           defaultValue={player.height}
									           onChange={updatePlayer}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="battingStyle">Batting Style</label>
									<FormSelect id="battingStyle"
									            name="battingStyle"
									            required
									            defaultValue={player.battingStyle}
									            onChange={updatePlaceOfBirth}>
										<option value={null}>Select Batting Style</option>
										<option value="RIGHT">Right Handed</option>
										<option value="LEFT">Left Handed</option>
									</FormSelect>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="bowlingStyle">Bowling Style</label>
									<FormSelect id="bowlingStyle"
									            name="bowlingStyle"
									            required
									            defaultValue={player.bowlingStyle}
									            onChange={updatePlaceOfBirth}>
										<option value={null}>Select Bowling Style</option>
										<option value="RIGHT">Right Arm</option>
										<option value="LEFT">Left Arm</option>
									</FormSelect>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="bowlingType">Bowling Type</label>
									<FormSelect id="bowlingType"
									            name="bowlingType"
									            required
									            defaultValue={player.bowlingType}
									            onChange={updatePlaceOfBirth}>
										<option value={null}>Select Bowling Type</option>
										<option value="MEDIUM">Medium</option>
										<option value="FAST">Fast</option>
										<option value="MEDIUMFAST">Medium Fast</option>
										<option value="WRIST">Wrist Spin</option>
										<option value="FINGER">Finger Spin</option>
									</FormSelect>
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

export default AddPlayer;

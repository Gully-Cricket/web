import React, {useEffect, useState} from "react";
import {Container, Row, Col, CardHeader, Form, FormInput, FormSelect, Button, Card, CardBody, CardFooter} from "shards-react";

import http from "../../axios";
import PageTitle from "../../components/common/PageTitle";
import countries from "../../data/countries.json";

const Edit = (props) => {
	const [savedPlayer, setSavedPlayer] = useState({placeOfBirth: {}});

	const [player, setPlayer] = useState({
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		role: '',
		battingStyle: '',
		bowlingStyle: '',
		bowlingType: '',
		height: ''
	});

	const [placeOfBirth, setPlaceOfBirth] = useState({
		line1: '',
		line2: '',
		city: '',
		state: '',
		country: '',
		pincode: '',
	});

	useEffect(() => {
		getPlayer().then(() => {
		}).catch(() => {
		});
	}, []);

	useEffect(() => {
		if(savedPlayer.id) {
			reset();
		}
	}, [savedPlayer]);

	useEffect(() => {
		if(player.id) {
		}
	}, [player]);

	useEffect(() => {
		if(placeOfBirth.id) {
		}
	}, [placeOfBirth]);

	const getPlayer = async () => {
		try {
			let {data} = await http.get(`players/${props.match.params.playerId}`);
			if(data) {
				setSavedPlayer(data);
			} else {
				props.history.push('/notfound');
			}
		} catch(e) {
			props.history.push('/erros');
		}
	}

	const updatePlaceOfBirth = (e) => {
		let update              = {};
		update[e.target.name]   = e.target.value;
		let updatedPlaceOfBirth = {...placeOfBirth, ...update}
		setPlaceOfBirth(updatedPlaceOfBirth);
	}

	const updatePlayer = (e) => {
		let update            = {};
		update[e.target.name] = e.target.value;
		let updatedPlayer     = {...player, ...update}
		setPlayer(updatedPlayer);
	}

	const reset = () => {
		setPlayer({
			id: savedPlayer.id || '',
			firstName: savedPlayer.firstName || '',
			lastName: savedPlayer.lastName || '',
			dateOfBirth: savedPlayer.dateOfBirth || '',
			role: savedPlayer.role || '',
			battingStyle: savedPlayer.battingStyle || '',
			bowlingStyle: savedPlayer.bowlingStyle || '',
			bowlingType: savedPlayer.bowlingType || '',
			height: savedPlayer.height || ''
		});

		setPlaceOfBirth({
			id: savedPlayer.id ? savedPlayer.placeOfBirth.id : '',
			line1: savedPlayer.placeOfBirth ? savedPlayer.placeOfBirth.line1||'' : '',
			line2: savedPlayer.placeOfBirth ? savedPlayer.placeOfBirth.line2||'' : '',
			city: savedPlayer.placeOfBirth ? savedPlayer.placeOfBirth.city||'' : '',
			state: savedPlayer.placeOfBirth ? savedPlayer.placeOfBirth.state||'' : '',
			country: savedPlayer.placeOfBirth ? savedPlayer.placeOfBirth.country||'' : '',
			pincode: savedPlayer.placeOfBirth ? savedPlayer.placeOfBirth.pincode||'' : ''
		});
	}

	const savePlayer = async () => {
		try {
			let payload = {
				...player,
				placeOfBirth
			}
			let {data}  = await http.put(`players/${props.match.params.playerId}`, payload);
			props.history.push(`/players/${data}`);
		} catch(e) {
			console.error(e);
		}
	}

	const submit = () => {
		document.getElementById('submit').click();
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		await savePlayer();
	}

	return (<Container fluid className="main-content-container px-4">
		<Row noGutters className="page-header py-4">
			<PageTitle subtitle="Edit Player" md="12" className="ml-sm-auto mr-sm-auto"/>
		</Row>
		<Row>
			<Col lg="12">
				<Card small className="mb-4">
					<CardHeader className="border-bottom">
						<h6 className="m-0">Edit Player</h6>
					</CardHeader>
					<CardBody>
						<Form onSubmit={onSubmit}>
							<Row form>
								<Col md="3" className="form-group">
									<label htmlFor="firstName">First Name <span className="text-danger">*</span></label>
									<FormInput id="firstName"
									           name="firstName"
									           required
									           placeholder="First Name"
									           value={player.firstName}
									           onChange={updatePlayer}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="lastName">Last Name <span className="text-danger">*</span></label>
									<FormInput id="lastName"
									           name="lastName"
									           required
									           placeholder="Last Name"
									           value={player.lastName}
									           onChange={updatePlayer}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="dateOfBirth">Date Of Birth <span className="text-danger">*</span></label>
									<FormInput id="lastName" type="date"
									           name="dateOfBirth"
									           required
									           placeholder="Date Of Birth"
									           value={player.dateOfBirth}
									           onChange={updatePlayer}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="height">Height</label>
									<FormInput type="number"
									           step="1"
									           id="height"
									           name="height"
									           placeholder="Height in Inches"
									           value={player.height}
									           onChange={updatePlayer}/>
								</Col>
							</Row>

							<hr/>

							<Row form>
								<Col md="6" className="form-group">
									<label htmlFor="line1">Address Line 1</label>
									<FormInput id="line1"
									           name="line1"
									           placeholder="Address Line 1"
									           value={placeOfBirth.line1}
									           onChange={updatePlaceOfBirth}/>
								</Col>

								<Col md="6" className="form-group">
									<label htmlFor="line2">Address Line 2</label>
									<FormInput id="line2"
									           name="line2"
									           placeholder="Address Line 2"
									           value={placeOfBirth.line2}
									           onChange={updatePlaceOfBirth}/>
								</Col>
							</Row>

							<Row form>
								<Col md="3" className="form-group">
									<label htmlFor="city">City <span className="text-danger">*</span></label>
									<FormInput id="city"
									           name="city"
									           required
									           placeholder="City"
									           value={placeOfBirth.city}
									           onChange={updatePlaceOfBirth}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="state">State <span className="text-danger">*</span></label>
									<FormInput id="state"
									           name="state"
									           required
									           placeholder="State"
									           value={placeOfBirth.state}
									           onChange={updatePlaceOfBirth}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="country">Country <span className="text-danger">*</span></label>
									<FormSelect id="country"
									            name="country"
									            required
									            value={placeOfBirth.country || ''}
									            onChange={updatePlaceOfBirth}>
										<option value={''}>Select Country</option>
										{
											countries.map((country, index) => {
												return (
												<option key={index} value={country.code}>
													{country.name}
												</option>
												)
											})
										}
									</FormSelect>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="pincode">Pin Code</label>
									<FormInput id="pincode"
									           name="pincode"
									           placeholder="Pin Code"
									           value={placeOfBirth.pincode}
									           onChange={updatePlaceOfBirth}/>
								</Col>
							</Row>

							<hr/>

							<Row form>
								<Col md="3" className="form-group">
									<label htmlFor="role">Role <span className="text-danger">*</span></label>
									<FormSelect id="role"
									            name="role"
									            required
									            value={player.role || ''}
									            onChange={updatePlayer}>
										<option value={''}>Select Role</option>
										<option value="BATSMAN">Batsman</option>
										<option value="BOWLER">Bowler</option>
										<option value="ALLROUNDER">All Rounder</option>
										<option value="WICKETKEEPER">Wicket Keeper</option>
									</FormSelect>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="battingStyle">Batting Style <span className="text-danger">*</span></label>
									<FormSelect id="battingStyle"
									            name="battingStyle"
									            required
									            value={player.battingStyle || ''}
									            onChange={updatePlayer}>
										<option value={''}>Select Batting Style</option>
										<option value="RIGHT">Right Handed</option>
										<option value="LEFT">Left Handed</option>
									</FormSelect>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="bowlingStyle">Bowling Style <span className="text-danger">*</span></label>
									<FormSelect id="bowlingStyle"
									            name="bowlingStyle"
									            required
									            value={player.bowlingStyle || ''}
									            onChange={updatePlayer}>
										<option value={''}>Select Bowling Style</option>
										<option value="RIGHT">Right Arm</option>
										<option value="LEFT">Left Arm</option>
									</FormSelect>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="bowlingType">Bowling Type <span className="text-danger">*</span></label>
									<FormSelect id="bowlingType"
									            name="bowlingType"
									            required
									            value={player.bowlingType || ''}
									            onChange={updatePlayer}>
										<option value={''}>Select Bowling Type</option>
										<option value="MEDIUM">Medium</option>
										<option value="FAST">Fast</option>
										<option value="MEDIUMFAST">Medium Fast</option>
										<option value="WRIST">Wrist Spin</option>
										<option value="FINGER">Finger Spin</option>
									</FormSelect>
								</Col>
							</Row>

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
	</Container>);
};

export default Edit;

import React, {useState} from "react";
import {Container, Row, Col, CardHeader, Form, FormInput, FormSelect, Button, Card, CardBody, CardFooter} from "shards-react";

import http from "../../axios";
import PageTitle from "../../components/common/PageTitle";
import countries from "../../data/countries.json";

const Add = (props) => {
	const [venue, setVenue] = useState({
		name: null,
		capacity: null,
		end1: null,
		end2: null
	});

	const [address, setAddress] = useState({
		line1: null,
		line2: null,
		city: null,
		state: null,
		country: null,
		pincode: null,
	});

	const updateVenue = (e) => {
		let update            = {};
		update[e.target.name] = e.target.value;
		let updatedVenue       = {...venue, ...update}
		setVenue(updatedVenue);
	}

	const updateAddress = (e) => {
		let update            = {};
		update[e.target.name] = e.target.value;
		let updatedAddress       = {...address, ...update}
		setAddress(updatedAddress);
	}

	const reset = () => {
		document.getElementById('reset').click();
	}

	const submit = () => {
		document.getElementById('submit').click();
	}

	const createVenue = async () => {
		try {
			let payload = {
				...venue,
				address
			}
			let {data}  = await http.post('venues', payload);
			console.log(data)
			props.history.push(`/venues/${data}`);
		} catch(e) {
			console.error(e);
		}
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		await createVenue();
	}

	return (
	<Container fluid className="main-content-container px-4">
		<Row noGutters className="page-header py-4">
			<PageTitle subtitle="Add Venue" md="12" className="ml-sm-auto mr-sm-auto"/>
		</Row>
		<Row>
			<Col lg="12">
				<Card small className="mb-4">
					<CardHeader className="border-bottom">
						<h6 className="m-0">Add New Venue</h6>
					</CardHeader>
					<CardBody>
						<Form onSubmit={onSubmit}>
							<Row form>
								<Col md="4" className="form-group">
									<label htmlFor="name">Venue Name <span className="text-danger">*</span></label>
									<FormInput id="name"
									           name="name"
									           required
									           placeholder="Venue Name"
									           defaultValue={venue.name}
									           onChange={updateVenue}/>
								</Col>

								<Col md="2" className="form-group">
									<label htmlFor="capacity">Capacity</label>
									<FormInput id="capacity"
									           type="number"
									           min="0"
									           max="400000"
									           step="1"
									           name="capacity"
									           placeholder="Capacity"
									           defaultValue={venue.capacity}
									           onChange={updateVenue}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="end1">End 1 <span className="text-danger">*</span></label>
									<FormInput id="end1"
									           name="end1"
									           required
									           placeholder="Venue End 1"
									           defaultValue={venue.end1}
									           onChange={updateVenue}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="end2">End 2 <span className="text-danger">*</span></label>
									<FormInput id="end2"
									           name="end2"
									           required
									           placeholder="Venue End 2"
									           defaultValue={venue.end2}
									           onChange={updateVenue}/>
								</Col>
							</Row>

							<hr/>

							<Row form>
								<Col md="6" className="form-group">
									<label htmlFor="line1">Address Line 1</label>
									<FormInput id="line1"
									           name="line1"
									           placeholder="Address Line 1"
									           defaultValue={address.line1}
									           onChange={updateAddress}/>
								</Col>

								<Col md="6" className="form-group">
									<label htmlFor="line2">Address Line 2</label>
									<FormInput id="line2"
									           name="line2"
									           placeholder="Address Line 2"
									           defaultValue={address.line2}
									           onChange={updateAddress}/>
								</Col>
							</Row>

							<Row form>
								<Col md="3" className="form-group">
									<label htmlFor="city">City <span className="text-danger">*</span></label>
									<FormInput id="city"
									           name="city"
									           required
									           placeholder="City"
									           defaultValue={address.city}
									           onChange={updateAddress}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="state">State <span className="text-danger">*</span></label>
									<FormInput id="state"
									           name="state"
									           required
									           placeholder="State"
									           defaultValue={address.state}
									           onChange={updateAddress}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="country">Country <span className="text-danger">*</span></label>
									<FormSelect id="country"
									            name="country"
									            required
									            defaultValue={address.country}
									            onChange={updateAddress}>
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
									           defaultValue={address.pincode}
									           onChange={updateAddress}/>
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

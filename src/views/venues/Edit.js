import React, {useEffect, useState} from "react";
import {Container, Row, Col, CardHeader, Form, FormInput, FormSelect, Button, Card, CardBody, CardFooter} from "shards-react";

import http from "../../axios";
import PageTitle from "../../components/common/PageTitle";
import countries from "../../data/countries.json";

const Edit = (props) => {
	const [savedVenue, setSavedVenue] = useState({address: {}});

	const [venue, setVenue] = useState({
		name: '',
		capacity: '',
		end1: '',
		end2: ''
	});

	const [address, setAddress] = useState({
		line1: '',
		line2: '',
		city: '',
		state: '',
		country: '',
		pincode: '',
	});

	useEffect(() => {
		getVenue().then(() => {
		}).catch(() => {
		});
	}, []);

	useEffect(() => {
		if(savedVenue.id) {
			reset();
		}
	}, [savedVenue]);

	useEffect(() => {
		if(venue.id) {
		}
	}, [venue]);

	useEffect(() => {
		if(address.id) {
		}
	}, [address]);

	const getVenue = async () => {
		try {
			let {data} = await http.get(`venues/${props.match.params.venueId}`);
			if(data) {
				setSavedVenue(data);
			} else {
				props.history.push('/notfound');
			}
		} catch(e) {
			props.history.push('/erros');
		}
	}

	const updateAddress = (e) => {
		let update            = {};
		update[e.target.name] = e.target.value;
		let updatedAddress    = {...address, ...update}
		setAddress(updatedAddress);
	}

	const updateVenue = (e) => {
		let update            = {};
		update[e.target.name] = e.target.value;
		let updatedVenue      = {...venue, ...update}
		setVenue(updatedVenue);
	}

	const reset = () => {
		setVenue({
			id: savedVenue.id || '',
			name: savedVenue.name || '',
			capacity: savedVenue.capacity || '',
			end1: savedVenue.end1 || '',
			end2: savedVenue.end2 || ''
		});

		setAddress({
			id: savedVenue.address ? savedVenue.address.id : '',
			line1: savedVenue.address ? savedVenue.address.line1 || '' : '',
			line2: savedVenue.address ? savedVenue.address.line2 || '' : '',
			city: savedVenue.address ? savedVenue.address.city || '' : '',
			state: savedVenue.address ? savedVenue.address.state || '' : '',
			country: savedVenue.address ? savedVenue.address.country || '' : '',
			pincode: savedVenue.address ? savedVenue.address.pincode || '' : ''
		});
	}

	const saveVenue = async () => {
		try {
			let payload = {
				...venue,
				address
			}
			let {data}  = await http.put(`venues/${props.match.params.venueId}`, payload);
			props.history.push(`/venues/${data}`);
		} catch(e) {
			console.error(e);
		}
	}

	const submit = () => {
		document.getElementById('submit').click();
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		await saveVenue();
	}

	return (<Container fluid className="main-content-container px-4">
		<Row noGutters className="page-header py-4">
			<PageTitle subtitle="Edit Venue" md="12" className="ml-sm-auto mr-sm-auto"/>
		</Row>
		<Row>
			<Col lg="12">
				<Card small className="mb-4">
					<CardHeader className="border-bottom">
						<h6 className="m-0">Edit Venue</h6>
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
									           value={venue.name}
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
									           value={venue.capacity}
									           onChange={updateVenue}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="end1">End 1 <span className="text-danger">*</span></label>
									<FormInput id="end1"
									           name="end1"
									           required
									           placeholder="Venue End 1"
									           value={venue.end1}
									           onChange={updateVenue}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="end2">End 2 <span className="text-danger">*</span></label>
									<FormInput id="end2"
									           name="end2"
									           required
									           placeholder="Venue End 2"
									           value={venue.end2}
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
									           value={address.line1}
									           onChange={updateAddress}/>
								</Col>

								<Col md="6" className="form-group">
									<label htmlFor="line2">Address Line 2</label>
									<FormInput id="line2"
									           name="line2"
									           placeholder="Address Line 2"
									           value={address.line2}
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
									           value={address.city}
									           onChange={updateAddress}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="state">State <span className="text-danger">*</span></label>
									<FormInput id="state"
									           name="state"
									           required
									           placeholder="State"
									           value={address.state}
									           onChange={updateAddress}/>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="country">Country {address.country}<span className="text-danger">*</span></label>
									<FormSelect id="country"
									            name="country"
									            required
									            value={address.country}
									            onChange={updateAddress}>
										<option value={''}>Select Country</option>
										{
											countries.map((country, index) => {
												return (<option key={country.code + index} value={country.code}>{country.name}</option>)
											})
										}
									</FormSelect>
								</Col>

								<Col md="3" className="form-group">
									<label htmlFor="pincode">Pin Code</label>
									<FormInput id="pincode"
									           name="pincode"
									           placeholder="Pin Code"
									           value={address.pincode}
									           onChange={updateAddress}/>
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

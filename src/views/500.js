import React from "react";
import {Container} from "shards-react";
import {Link} from "react-router-dom";

const Error500 = () => (
<Container fluid className="main-content-container px-4 pb-4">
	<div className="error">
		<div className="error__content">
			<h2>500</h2>
			<h3>Something went wrong!</h3>
			<p>There was a problem on our end. Please try again later.</p>
			<Link to="/" className="btn btn-primary btn-pill">&larr; Back To Home</Link>
		</div>
	</div>
</Container>
);

export default Error500;

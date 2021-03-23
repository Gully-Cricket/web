import React from "react";
import {Container} from "shards-react";
import {Link} from "react-router-dom";

const Error404 = () => (
<Container fluid className="main-content-container px-4 pb-4">
	<div className="error">
		<div className="error__content">
			<h2>404</h2>
			<h3>Oops!</h3>
			<p>The resource you were looking for does not exist.</p>
			<Link to="/" className="btn btn-primary btn-pill">&larr; Back To Home</Link>
		</div>
	</div>
</Container>
);

export default Error404;

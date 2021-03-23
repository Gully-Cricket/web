import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {Col} from "shards-react";

const PageTitle = ({title, subtitle, className, history, ...attrs}) => {
	const classes = classNames(className, "text-center", "text-md-left", "mb-sm-0");

	const back = () => {
		window.history.back();
	}

	return (<Col xs="12" sm="4" className={classes} {...attrs}>
		<span className="text-uppercase page-subtitle">{subtitle}</span>
		<button className={"btn p-0 float-right text-uppercase page-subtitle text-decoration-none"} onClick={back}>
			<i className="fa fa-arrow-left"/> Back
		</button>
		<h3 className="page-title">{title}</h3>
	</Col>)
};

PageTitle.propTypes = {
	/**
	 * The page title.
	 */
	title: PropTypes.string,
	/**
	 * The page subtitle.
	 */
	subtitle: PropTypes.string
};

export default PageTitle;

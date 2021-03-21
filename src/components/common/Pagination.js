import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
	const {total, perPage, page, onPageChange, onPageSizeChange} = props;
	const pageCount                            = total === 0 ? 1 : Math.ceil(total / perPage);
	let pages                                  = _.range(0, pageCount);

	const handlePageChange = (e) => {
		if(Number(e.target.innerHTML) !== (page + 1)) {
			onPageChange(Number(e.target.innerHTML) - 1);
		}
	}

	const handlePageSizeChange = (e) => {
		console.log(Number(e.target.value));
		onPageSizeChange(Number(e.target.value));
	}

	const prev = (e) => {
		onPageChange(page - 1);
	}

	const next = (e) => {
		onPageChange(page + 1);
	}

	return (
	<div className={'d-flex justify-content-between'}>
		<div className={"d-flex justify-content-center"}>
			<label style={{width: '70px'}} className={"mt-2 mb-0"}>Per Page</label>
			<select style={{width: '65px'}} className="form-control flex-1"
			        onChange={handlePageSizeChange} defaultValue={perPage}>
				<option value={10}>10</option>
				<option value={20}>20</option>
				<option value={50}>50</option>
				<option value={1}>1</option>
			</select>
			<label style={{width: '40px'}} className={"ml-2 mt-2 mb-0"}>Items</label>
		</div>

		<div className="btn-group">
			<button className="btn btn-primary" disabled={page === 0} onClick={prev}>
				<i className="material-icons f-12"> arrow_left </i>
			</button>
			{pages.map(_page => (
			<button key={_page}
			        onClick={handlePageChange}
			        className={`btn ${_page === page ? 'btn-primary' : 'btn-outline-primary'}`}>
				{_page + 1}
			</button>
			))}
			<button className="btn btn-primary" disabled={pageCount === page + 1} onClick={next}>
				<i className="material-icons f-12"> arrow_right </i>
			</button>
		</div>
	</div>
	)
}

export default Pagination;

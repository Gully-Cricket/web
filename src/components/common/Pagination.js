import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
	const {pager, total, onPagerChange} = props;
	const pageCount                     = total === 0 ? 1 : Math.ceil(total / pager.perPage);
	let pages                           = _.range(0, pageCount);

	const handlePageChange = (e) => {
		if(Number(e.target.innerHTML) !== (pager.page + 1)) {
			onPagerChange({page: (Number(e.target.innerHTML) - 1), perPage: pager.perPage});
		}
	}

	const handlePageSizeChange = (e) => {
		onPagerChange({page: 0, perPage: Number(e.target.value)});
	}

	const prev = () => {
		onPagerChange({page: pager.page - 1, perPage: pager.perPage});
	}

	const next = () => {
		onPagerChange({page: pager.page + 1, perPage: pager.perPage});
	}

	return (
	<div className={'d-flex justify-content-between'}>
		<div className={"d-flex justify-content-center"}>
			<label style={{width: '70px'}} className={"mt-2 mb-0"}>Per Page</label>
			<select style={{width: '65px'}} className="form-control flex-1"
			        onChange={handlePageSizeChange} defaultValue={pager.perPage}>
				<option value={10}>10</option>
				<option value={20}>20</option>
				<option value={50}>50</option>
			</select>
			<label style={{width: '40px'}} className={"ml-2 mt-2 mb-0"}>Items</label>
		</div>

		<div className="btn-group">
			<button className="btn btn-primary px-1" disabled={pager.page === 0} onClick={prev}>
				<i className="material-icons f-12"> arrow_left </i>
			</button>
			{pages.map(page => (
			<button key={page}
			        onClick={handlePageChange}
			        className={`btn px-2 ${page === pager.page ? 'btn-primary' : 'btn-outline-primary'}`}>
				{page + 1}
			</button>
			))}
			<button className="btn btn-primary px-1" disabled={pageCount === pager.page + 1} onClick={next}>
				<i className="material-icons f-12"> arrow_right </i>
			</button>
		</div>
	</div>
	)
}

export default Pagination;

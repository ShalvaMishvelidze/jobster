import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../features/allJobs/allJobsSlice';

const PageBtnContainer = () => {
	const { numOfPages, page } = useSelector((store) => store.allJobs);

	const dispatch = useDispatch();

	const pages = Array.from({ length: numOfPages }, (_, index) => {
		return index + 1;
	});

	const prevPage = () => {
		if (page === 1) return;
		let newPage = page - 1;
		dispatch(changePage(newPage));
	};
	const nextPage = () => {
		if (page === pages.length) return;
		let newPage = page + 1;
		dispatch(changePage(newPage));
	};

	return (
		<Wrapper>
			<button type="button" className="prev-btn" onClick={prevPage}>
				<HiChevronDoubleLeft />
			</button>
			<div className="btn-container">
				{pages.map((pageNumber) => {
					return (
						<button
							type="button"
							className={
								pageNumber === page ? 'pageBtn active' : 'pageBtn'
							}
							key={pageNumber}
							onClick={() => dispatch(changePage(pageNumber))}
						>
							{pageNumber}
						</button>
					);
				})}
			</div>
			<button type="button" className="next-btn" onClick={nextPage}>
				<HiChevronDoubleRight />
			</button>
		</Wrapper>
	);
};

export default PageBtnContainer;

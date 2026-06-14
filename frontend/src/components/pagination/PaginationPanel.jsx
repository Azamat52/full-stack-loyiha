import { useDispatch, useSelector } from 'react-redux'
import { nextPage, prevPage, setCurrentPage, setPerPage } from '../../slices/paginationSlice'

function PaginationPanel({
	totalPages,
	filteredButtonPagination
}) {
	const { currentPage } = useSelector((state) => state.paginations)
	const dispatch = useDispatch()
	return (
		<div className="pagination-wrapper">

			<button
				className="pagination-btn pagination-nav"
				onClick={() => dispatch(prevPage())}
				style={{
					display: currentPage > 1 ? "block" : "none"
				}}
			>
				Prev
			</button>

			{filteredButtonPagination.map((buttonNumber, index) =>
				buttonNumber === "..." ? (
					<span key={index} className="pagination-dots">
						...
					</span>
				) : (
					<button
						key={index}
						className={`pagination-btn ${currentPage === buttonNumber ? "active_button" : ""
							}`}
						onClick={() => dispatch(setCurrentPage(buttonNumber))}
					>
						{buttonNumber}
					</button>
				)
			)}

			<button
				className="pagination-btn pagination-nav"
				onClick={() => dispatch(nextPage())}
				style={{
					display: currentPage === totalPages ? "none" : "block"
				}}
			>
				Next
			</button>

			<select
				className="pagination-select"
				onChange={e => dispatch(setPerPage(Number(e.target.value)))}
			>
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="30">30</option>
				<option value="50">50</option>
			</select>

		</div>
	)
}

export default PaginationPanel





function PaginationPanel({
	totalPages,
}) {
	return (
		<div className="d-flex justify-content-center align-items-center gap-3 py-3">

			<button>
				Prev
			</button>

			<button>
				Next
			</button>

			<select>
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="30">30</option>
				<option value="40">50</option>
			</select>

		</div>
	)
}

export default PaginationPanel
import { RotatingLines } from "react-loader-spinner"

function LoadingOverlay() {
	return (
		<div className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center bg-black bg-opacity-50"
			style={{ zIndex: 10001 }}
		>
			<RotatingLines color="#fff" width="50" />
		</div>
	)
}

export default LoadingOverlay
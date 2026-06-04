import { useSelector } from "react-redux";

function ValidationErrors({ type }) {
	const { AuthError } = useSelector((state) => state.auth);
	const { PostError } = useSelector((state) => state.post);

	const errorData = type === "auth" ? AuthError : PostError;

	if (!errorData) return null;

	return (
		<div className="validation-errors mb-3">

			{errorData.errors?.length > 0 ? (
				errorData.errors.map((error, index) => (
					<div key={index} className="validation-error">
						<i className="fa-solid fa-circle-exclamation"></i>
						<span>{error.msg}</span>
					</div>
				))
			) : (
				errorData.message && (
					<div className="validation-error">
						<i className="fa-solid fa-circle-exclamation"></i>
						<span>{errorData.message}</span>
					</div>
				)
			)}

		</div>
	);
}

export default ValidationErrors;
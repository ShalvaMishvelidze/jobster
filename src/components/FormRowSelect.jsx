function FormRowSelect({ labelText, name, value, handleChange, options }) {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<select
				name={name}
				id={name}
				value={value}
				onChange={handleChange}
				className="form-select"
			>
				{options.map((opt, index) => {
					return (
						<option key={index} value={opt}>
							{opt}
						</option>
					);
				})}
			</select>
		</div>
	);
}

export default FormRowSelect;

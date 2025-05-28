export default function InputRow({ idx, form, handleInputChange })
{
    return (
        <>
            <label htmlFor={`F_r_${idx}`}>F_r:</label>
            <input
                type="text"
                id={`F_r_${idx}`}
                value={form.F_r}
                onChange={e => handleInputChange(idx, "F_r", e.target.value)}
            />
            <label htmlFor={`F_theta_${idx}`}>F_theta:</label>
            <input
                type="text"
                id={`F_theta_${idx}`}
                value={form.F_theta}
                onChange={e => handleInputChange(idx, "F_theta", e.target.value)}
            />
            <label htmlFor={`t_thrust_${idx}`}>t_thrust:</label>
            <input
                type="text"
                id={`t_thrust_${idx}`}
                value={form.t_thrust}
                onChange={e => handleInputChange(idx, "t_thrust", e.target.value)}
            />
        </>
    )
}
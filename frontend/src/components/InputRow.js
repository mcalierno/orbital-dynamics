import './InputRow.css';

export default function InputRow({ idx, form, handleInputChange })
{
    return (
        <>
            <input
                type="number"
                id={`F_r_${idx}`}
                value={form.F_r}
                onChange={e => handleInputChange(idx, "F_r", e.target.value)}
            />
            <input
                type="number"
                id={`F_theta_${idx}`}
                value={form.F_theta}
                onChange={e => handleInputChange(idx, "F_theta", e.target.value)}
            />
            <input
                type="number"
                id={`t_thrust_${idx}`}
                value={form.t_thrust}
                onChange={e => handleInputChange(idx, "t_thrust", e.target.value)}
            />
        </>
    )
}
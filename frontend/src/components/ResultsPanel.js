import "./ResultsPanel.css";

export default function ResultsPanel({ results }) {
    if (!results || results.length === 0 || results[0] === "") {
        return null;
    }
    return (
        <div className="results-panel">
            <table>
                <thead>
                    <tr>
                        {Object.keys(results[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {results.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'row-even' : 'row-odd'}>
                            {Object.values(row).map((val, i) => (
                                <td key={i}>
                                    {typeof val === "number"
                                        ? val.toFixed(1)
                                        : val}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
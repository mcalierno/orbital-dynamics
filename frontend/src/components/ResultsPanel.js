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
                            <th key={key} dangerouslySetInnerHTML={{ __html: key }} />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {results.map((row, idx) => (
                        <tr key={idx} >
                            {Object.values(row).map((val, i) => (
                                <td key={i}>
                                    {typeof val === "number"
                                        ? (val % 1 !== 0 ? val.toFixed(1) : val)
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
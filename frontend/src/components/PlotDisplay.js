export default function PlotDisplay({ plot }) {
    if (!plot) return null;
    return (
        <div>
            <img src={`data:image/png;base64,${plot}`} alt="Result Plot" />
        </div>
    );
}
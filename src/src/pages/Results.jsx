export default function Results({phase1score, phase2score, phase3score}) {
    return (
        <div>
        <h1>Results</h1>
        <p>Phase 1 Score: {phase1score}</p>
        <p>Phase 2 Score: {phase2score}</p>
        <p>Phase 3 Score: {phase3score}</p>
        </div>
    );
}
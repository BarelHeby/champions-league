import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Match from "../../models/Match";
import Team from "../../models/Team";
const EditMatch = ({ phasesOptions }) => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    async function fetchMatches() {
      const resp = await Match.getAll();
      const sorted_resp = resp.sort((a, b) => a.timestamp - b.timestamp);
      setMatches(sorted_resp);
    }
    async function fetchTeams() {
      const resp = await Team.getAll();
      setTeams(resp);
    }
    fetchTeams();
    fetchMatches();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Match.update(selectedMatch);
      alert("Match updated successfully");
      window.location.reload();
    } catch (error) {
      alert("Error updating match");
    }
  };

  const handleChange = (e) => {
    const match = matches[e.target.value];
    setSelectedMatch(match);
  };

  const phaseIndex = phasesOptions.findIndex(
    (phase) =>
      phase?.value.directionAward === selectedMatch?.directionAward &&
      phase?.value.exactAward === selectedMatch?.exactAward
  );
  const form_groups_classnames = "mt-2 mb-2 ";
  console.log(selectedMatch);
  return (
    <Form onSubmit={handleSubmit}>
      <Card className=" p-3 ">
        <Card.Header>Edit Match</Card.Header>
        <Card.Body>
          <Form.Group
            controlId="Select Match"
            className={form_groups_classnames}
          >
            <Form.Label>Select Match</Form.Label>
            <Form.Control as="select" name="match" onChange={handleChange}>
              <option value="">Select Match</option>
              {matches.map((match, i) => (
                <option key={i} value={i}>
                  {match.team1} vs {match.team2} {"   "}
                  {match.timestamp?.split("T")[0]}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {selectedMatch && (
            <>
              <Form.Group controlId="team1" className={form_groups_classnames}>
                <Form.Label>Team 1</Form.Label>
                <Form.Control
                  as="select"
                  name="team1"
                  onChange={(e) => {
                    const selectedMatchCopy = selectedMatch;
                    selectedMatchCopy.team1 = e.target.value;
                    setSelectedMatch(selectedMatchCopy);
                  }}
                >
                  <option value="">{selectedMatch.team1}</option>
                  {teams
                    .filter(({ name }) => name !== selectedMatch.team1)
                    .map((team, i) => (
                      <option key={team.id + i} value={team.name}>
                        {team.name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="team2" className={form_groups_classnames}>
                <Form.Label>Team 2</Form.Label>
                <Form.Control
                  as="select"
                  name="team2"
                  onChange={(e) => {
                    const selectedMatchCopy = selectedMatch;
                    selectedMatchCopy.team2 = e.target.value;
                    setSelectedMatch(selectedMatchCopy);
                  }}
                >
                  <option value="">{selectedMatch.team2}</option>
                  {teams
                    .filter(({ name }) => name !== selectedMatch.team2)
                    .map((team, i) => (
                      <option key={team.id} value={team.name}>
                        {team.name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
              <Form.Group
                controlId="dateTime"
                className={form_groups_classnames}
              >
                <Form.Label>Date and Time</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={selectedMatch.timestamp
                    ?.replace("T", " ")
                    .substring(0, 16)}
                />
              </Form.Group>
              <Form.Group
                controlId="phase"
                onChange={(e) => {
                  const { directionAward, exactAward } = JSON.parse(
                    e.target.value
                  );
                  const selectedMatchCopy = selectedMatch;
                  selectedMatchCopy.exactAward = exactAward;
                  selectedMatchCopy.directionAward = directionAward;
                  setSelectedMatch(selectedMatchCopy);
                }}
                className={form_groups_classnames}
              >
                <Form.Label>Phase</Form.Label>
                <Form.Control as="select">
                  <option
                    value={JSON.stringify(phasesOptions[phaseIndex]?.value)}
                  >
                    {phasesOptions[phaseIndex]?.label}
                  </option>

                  {phasesOptions
                    .filter(
                      ({ label, value }, i) =>
                        label !== "Select Phase" && i !== phaseIndex
                    )
                    .map((phase, j) => (
                      <option key={j} value={JSON.stringify(phase.value)}>
                        {phase.label}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
              <Form.Group
                controlId="team1Score"
                className={form_groups_classnames}
              >
                <Form.Label>Team 1 Score</Form.Label>
                <Form.Control
                  type="number"
                  pattern="\d*"
                  value={
                    selectedMatch.team1Score ? selectedMatch.team1Score : ""
                  }
                  onChange={(e) => {
                    const score = e.target.value;
                    setSelectedMatch((prev) => ({
                      ...prev,
                      team1Score: score,
                    }));
                  }}
                />
              </Form.Group>
              <Form.Group
                controlId="team2Score"
                className={form_groups_classnames}
              >
                <Form.Label>Team 2 Score</Form.Label>
                <Form.Control
                  type="number"
                  pattern="\d*"
                  value={
                    selectedMatch.team2Score ? selectedMatch.team2Score : ""
                  }
                  onChange={(e) => {
                    const score = e.target.value;
                    setSelectedMatch((prev) => ({
                      ...prev,
                      team2Score: score,
                    }));
                  }}
                />
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center mt-4">
                <Button
                  variant="primary"
                  type="submit"
                  className={form_groups_classnames}
                >
                  Submit
                </Button>
                <button
                  className={
                    "text-white border border-white rounded-2 p-2 bg-danger "
                  }
                  onClick={() => {
                    Match.delete(selectedMatch);
                  }}
                  type="button"
                >
                  Delete Match
                </button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Form>
  );
};

export default EditMatch;

import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Team from "../../models/Team";
import Match from "../../models/Match";
const AddMatch = ({ phasesOptions }) => {
  const [teams, setTeams] = useState([]);
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [exactAward, setExactAward] = useState(null);
  const [directionAward, setDirectionAward] = useState(null);

  const handleTeam1Change = (e) => {
    setTeam1(teams[e.target.value]);
  };

  const handleTeam2Change = (e) => {
    setTeam2(teams[e.target.value]);
  };

  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
    console.log(e.target.value);
  };

  const handlePhaseChange = (e) => {
    const data = JSON.parse(e.target.value);

    setDirectionAward(data.directionAward);
    setExactAward(data.exactAward);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!team1 || !team2 || !dateTime || !directionAward || !exactAward) {
      alert("Please fill all fields");
      return;
    }
    const resp = await Match.addMatch(
      team1.id,
      team2.id,
      dateTime,
      directionAward,
      exactAward
    );
    if (resp.status === 200) {
      alert("Match added successfully");
    } else {
      alert("Error adding match");
    }
  };

  useEffect(() => {
    async function fetchTeams() {
      const resp = await Team.getAll();
      console.log(resp);
      setTeams(resp);
    }
    fetchTeams();
  }, []);
  const form_groups_classnames = "mt-2 mb-2 ";
  return (
    <Form onSubmit={handleSubmit}>
      <Card className=" p-3 ">
        <Card.Header>Add Match</Card.Header>
        <Card.Body>
          <Form.Group controlId="team1" className={form_groups_classnames}>
            <Form.Label>Team 1</Form.Label>
            {team1 && (
              <img
                className="mt-2 mb-2 ms-2"
                src={team1.logo}
                width={30}
                height={30}
                alt="teamLogo"
              />
            )}
            <Form.Control
              as="select"
              onChange={handleTeam1Change}
              className={form_groups_classnames}
            >
              <option value="">Select Team 1</option>
              {teams.map((team, i) => (
                <option key={team.id} value={i}>
                  {team.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="team2" className={form_groups_classnames}>
            <Form.Label>Team 2</Form.Label>
            {team2 && (
              <img
                className="mt-2 mb-2 ms-2"
                src={team2.logo}
                width={30}
                height={30}
                alt="teamLogo2"
              />
            )}
            <Form.Control
              className={form_groups_classnames}
              as="select"
              onChange={handleTeam2Change}
            >
              <option value="">Select Team 2</option>
              {teams.map((team, i) => (
                <option key={team.id} value={i}>
                  {team.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="dateTime" className={form_groups_classnames}>
            <Form.Label>Date and Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={dateTime}
              onChange={handleDateTimeChange}
            />
          </Form.Group>
          <Form.Group
            controlId="phase"
            onChange={handlePhaseChange}
            className={form_groups_classnames}
          >
            <Form.Label>Phase</Form.Label>
            <Form.Control as="select">
              {phasesOptions.map((phase, i) => (
                <option key={i} value={JSON.stringify(phase.value)}>
                  {phase.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className={form_groups_classnames}
          >
            Submit
          </Button>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default AddMatch;

import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Team from "../../models/Team";
const AddTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [teamLogo, setTeamLogo] = useState("");
  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Team.addTeam(teamName, teamLogo);
      alert("Team added successfully");
      window.location.reload();
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Card className=" p-3 ">
        <Card.Header>Edit Match</Card.Header>
        <Card.Body>
          <Form.Group controlId="teamName">
            <Form.Label>Team Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter team name"
              value={teamName}
              onChange={handleTeamNameChange}
            />
          </Form.Group>
          <Form.Group controlId="teamLogo">
            <Form.Label>Team Logo</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Add Team
          </Button>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default AddTeam;

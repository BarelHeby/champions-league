import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import User from "../../models/User";
import Team from "../../models/Team";
const AddUser = ({ setIsLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [photo, setPhoto] = useState("");
  const [winnerTeam, setWinnerTeam] = useState(null);
  const [topScorer, setTopScorer] = useState("");
  const [teams, setTeams] = useState([]);

  const handleTopScorerChange = (e) => {
    setTopScorer(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const resp = await User.createUser(
      username,
      nickName,
      photo,
      password,
      winnerTeam?.id,
      topScorer
    );
    setIsLoading(false);
    if (resp.status === 200) {
      alert("User added successfully");
    } else {
      alert("Error adding user");
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
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
  return (
    <Form onSubmit={handleSubmit}>
      <Card className=" p-3 ">
        <Card.Header>Add User</Card.Header>
        <Card.Body>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password name"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Form.Group controlId="nickName">
            <Form.Label>Nick Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Nick Name"
              value={nickName}
              onChange={handleNickNameChange}
            />
          </Form.Group>

          <Form.Group controlId="team2">
            <Form.Label>Winner Team</Form.Label>
            {winnerTeam && (
              <>
                <br />
                <Form.Label>{winnerTeam.name}</Form.Label>
                <img
                  className="mt-2 mb-2 ms-2"
                  src={winnerTeam.logo}
                  width={30}
                  height={30}
                  alt="teamLogo"
                />
              </>
            )}
            <Form.Control
              as="select"
              onChange={(e) => setWinnerTeam(teams[e.target.value])}
            >
              <option value="">Select Winner Team</option>
              {teams.map((team, i) => (
                <option key={team.id} value={i}>
                  {team.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="topScorer">
            <Form.Label>Top Scorer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Top Scorer"
              value={topScorer}
              onChange={handleTopScorerChange}
            />
          </Form.Group>
          <Form.Group controlId="photo">
            <Form.Label>Photo</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Add User
          </Button>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default AddUser;

import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Auth from "../../auth";
import APIService from "../../service/APIService";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    Auth.checkAuth(false);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await APIService.post("users/login", {
        username,
        password,
      });
      await Auth.login(resp.data.token, resp.data.id);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      setError(err.response.data.error);
    }
  };

  return (
    <Container className="w-100 vh-100 mt-5">
      <Card>
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div>
              <Form.Label htmlFor="username">Username:</Form.Label>
              <Form.Control
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Form.Label htmlFor="password">Password:</Form.Label>
              <Form.Control
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="mt-2">
              Login
            </Button>
            <br />
            <label className="mt-2">{error}</label>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;

import React from "react";
import User from "../../models/User";
import { Card, Container, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchUsers() {
      const resp = await User.getAll();
      setUsers(resp);
      setIsLoading(false);
    }
    fetchUsers();
  }, []);
  return (
    <Container>
      <Card>
        <Card.Header>Manage Users</Card.Header>
        <Card.Body>
          <Table striped bordered className="text-center">
            <thead>
              <tr>
                <th>Nickname</th>
                <th>Photo</th>
              </tr>
            </thead>
            {!isLoading && (
              <tbody className="fade-in">
                {users.map((user) => (
                  <UserCard user={user} />
                ))}
              </tbody>
            )}
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ManageUsers;

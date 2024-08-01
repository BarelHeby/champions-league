import React, { useEffect } from "react";
import AddTeam from "./AddTeam";
import AddMatch from "./AddMatch";
import EditMatch from "./EditMatch";
import AddUser from "./AddUser";
import { Button, Col, Container, Row } from "react-bootstrap";
import ManageUsers from "./ManageUsers";
import Auth from "../../auth";
const Admin = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [action, setAction] = React.useState(null);
  const rewardDict = (dAward, eAward) => {
    return { directionAward: dAward, exactAward: eAward };
  };
  const phasesOptions = [
    { label: "Select Phase", value: rewardDict(0, 0) },
    { label: "Group Phase", value: rewardDict(1, 3) },
    { label: "Round of 16", value: rewardDict(3, 5) },
    { label: "Quarter Finals", value: rewardDict(5, 8) },
    { label: "Semi Finals", value: rewardDict(5, 10) },
    { label: "Final", value: rewardDict(10, 15) },
  ];

  useEffect(() => {
    async function auth() {
      await Auth.checkAuth(true, true);
      setIsLoading(false);
    }
    auth();
  }, []);

  if (isLoading) {
    return <Container className="bg-champions pb-5" fluid></Container>;
  }

  const actions = [
    { label: "Add Match", value: "add_match" },
    { label: "Edit Match", value: "edit_match" },
    { label: "Add User", value: "add_user" },
    { label: "Add Team", value: "add_team" },
    { label: "Manage Users", value: "manage_users" },
  ];
  return (
    <div className="bg-champions pb-5">
      <Container fluid={"md"}>
        <Row className="mb-3 p-3 justify-content-center gy-2 gx-3">
          {actions.map((a) => (
            <Col xs={6} className="text-center">
              <Button
                key={a.label}
                onClick={() => {
                  setAction(a.value);
                }}
                className="me-2 w-100 p-3"
              >
                {a.label}
              </Button>
            </Col>
          ))}
        </Row>
        {action === "add_user" && <AddUser setIsLoading={setIsLoading} />}
        {action === "add_team" && <AddTeam />}
        {action === "add_match" && <AddMatch phasesOptions={phasesOptions} />}
        {action === "edit_match" && <EditMatch phasesOptions={phasesOptions} />}
        {action === "manage_users" && <ManageUsers />}
      </Container>
    </div>
  );
};

export default Admin;

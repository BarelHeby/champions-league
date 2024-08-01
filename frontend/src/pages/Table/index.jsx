import React from "react";
import { Container } from "react-bootstrap";
import "./table.css";
import Auth from "../../auth";
import UserModel from "../../models/User";
const TableComponent = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    async function fetchTable() {
      const temp_users = await UserModel.getTable();
      setUsers(temp_users);
      setIsLoading(false);
    }

    async function auth() {
      await Auth.checkAuth();
      fetchTable();
    }
    auth();
  }, []);
  if (isLoading) {
    return <Container fluid className="bg-champions pt-3"></Container>;
  }
  return (
    <Container fluid className="bg-champions pt-3 ">
      <table className="w-100  fade-in   ">
        <thead>
          <tr className="opacity-75 header-row ">
            <td className="custom-width ">
              <small>Team Member</small>
            </td>
            <td className="text-center  ">
              <small>Points</small>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr
              className="  text-center user-row mt-3 border-top border-bottom "
              onClick={() => (window.location.href = "user/" + user.id)}
            >
              <td className="text-start ">
                <div className="d-flex align-items-center ">
                  <span className="me-3 ms-2">{i}</span>
                  <img
                    src={user.winnerTeam?.logo}
                    alt="winnerTeam"
                    className="rounded-circle me-3 shadow"
                    width={50}
                    height={50}
                  />
                  <img
                    src={user.photo}
                    alt="userPhoto"
                    className="rounded-circle me-3 shadow"
                    width={50}
                    height={50}
                  />

                  <div>
                    <span className="user-name">{user.nickName}</span>
                  </div>
                </div>
              </td>
              <td className="align-content-center">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default TableComponent;

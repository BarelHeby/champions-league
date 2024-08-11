import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./table.css";
import Auth from "../../auth";
import UserModel from "../../models/User";
import Loading from "../Loading";
import golden_cup from "./golden_cup.png";
const TableComponent = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    async function fetchTable() {
      const cached_users = await UserModel.getTableFromCache();
      if (cached_users) {
        setUsers(cached_users);
        setIsLoading(false);
      }
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
    return (
      <Container fluid className="bg-champions pt-3 text-center">
        <Loading />
      </Container>
    );
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
          {users?.map((user, i) => (
            <tr
              key={i}
              className="  text-center user-row mt-3 border-top border-bottom "
              onClick={() => (window.location.href = "user/" + user.id)}
            >
              <td className="text-start ">
                <Row className="align-items-center">
                  <Col xs={2} md={1} className=" text-center">
                    {i === 0 ? (
                      <img
                        src={golden_cup}
                        alt="golden_cup"
                        className="rounded-circle shadow"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <span>{i + 1}</span>
                    )}
                  </Col>

                  <Col xs={2} md={1}>
                    <img
                      src={user.winnerTeam?.logo}
                      alt="winnerTeam"
                      className="rounded-circle me-3 shadow"
                      width={50}
                      height={50}
                    />
                  </Col>
                  <Col xs={2} md={1}>
                    <img
                      src={user.photo}
                      alt="userPhoto"
                      className="rounded-circle me-3 shadow"
                      width={50}
                      height={50}
                    />
                  </Col>
                  <Col>
                    <span className="user-name">{user.nickName}</span>
                  </Col>
                </Row>
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

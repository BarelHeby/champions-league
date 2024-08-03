import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import BetModel from "../../models/Bet";
import UserModel from "../../models/User";
import Auth from "../../auth";
import BetCard from "./BetCard";
const User = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState(null);
  const [bets, setBets] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    async function fetchBets() {
      const temp_bets = await BetModel.getBets(id);
      setBets(temp_bets);
    }

    async function fetchUser() {
      const temp_user = await UserModel.getUser(id);
      setUser(temp_user);
      setIsLoading(false);
    }

    async function auth() {
      await Auth.checkAuth();
      fetchBets();
      fetchUser();
    }
    auth();
  }, [id]);

  if (isLoading) {
    return <div className="bg-champions"></div>;
  }

  const userInfo = [
    { label: "Score", value: user?.score },
    { label: "Top Scorer", value: user?.topScorer },
    {
      label: "Winner",
      value: user && user.winnerTeam ? user.winnerTeam.name : "",
    },
  ];
  return (
    <div className="bg-champions  pb-4 ">
      <Container fluid={"md"} className="fade-in">
        {user && (
          <>
            <Row className="text-center mb-3 p-3 pt-4   ">
              <Col xs={6}>
                <div className="">
                  <img
                    src={user?.photo}
                    alt={user?.nickName}
                    width={80}
                    height={80}
                    className=" rounded-circle shadow "
                  />
                </div>
              </Col>
              <Col xs={6} className="border-start">
                <div>
                  <img
                    src={user?.winnerTeam?.logo}
                    alt={user?.winnerTeam?.name}
                    width={80}
                    height={80}
                    className="rounded-circle   shadow"
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <h1>{user?.nickName}</h1>
            </Row>
            {userInfo.map(({ label, value }, i) => (
              <Row key={i}>
                <Col xs={4} md={2} lg={1}>
                  <span>
                    <b>{label}</b>
                  </span>
                </Col>
                <Col className="text-start">{value}</Col>
              </Row>
            ))}
          </>
        )}
        <hr />
        <Row className="gy-2 ">
          {bets.map((bet, i) => (
            <Col
              xs={12}
              md={6}
              key={i}
              className="fade-in"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <BetCard betObject={bet} userId={id} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default User;

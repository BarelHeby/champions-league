import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import BetModel from "../../models/Bet";

const BetCard = ({ betObject, userId }) => {
  const [teamToUpdate, setTeamToUpdate] = React.useState(null);
  const [showFooter, setShowFooter] = React.useState(false);
  const [bet, setBet] = React.useState(betObject);
  const [isLoading, setIsLoading] = React.useState(false);
  if (!bet) {
    return <div></div>;
  }
  console.log(bet);
  return (
    <Card>
      <Card.Header as="h3" className="d-flex justify-content-between">
        <div>
          {bet.team1} vs {bet.team2}
          <Card.Subtitle className="mt-1">
            {bet.timestamp
              ?.toISOString()
              .replace("T", " ")
              .replace("Z", "")
              .substring(0, 16)}
            {bet.team1ActualScore && bet.team2ActualScore && (
              <div>
                <label>
                  Final Score{" "}
                  {bet.team1ActualScore + " : " + bet.team2ActualScore}
                </label>
              </div>
            )}
          </Card.Subtitle>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <Row className="align-items-center text-center">
            <Col className="text-center">
              <img
                src={bet.team1Logo}
                alt={bet.team1}
                width={50}
                height={50}
                className="rounded-circle"
              />
            </Col>

            <Col xs={2}>
              <Button
                disabled={!bet.isBettable || isLoading}
                onClick={() => {
                  setTeamToUpdate(1);
                  setShowFooter(true);
                }}
              >
                {bet.team1Score !== null ? bet.team1Score : "?"}
              </Button>
            </Col>
            <Col xs={1}>:</Col>
            <Col xs={2}>
              <Button
                disabled={!bet.isBettable || isLoading}
                onClick={() => {
                  setTeamToUpdate(2);
                  setShowFooter(true);
                }}
              >
                {bet.team2Score !== null ? bet.team2Score : "?"}
              </Button>
            </Col>

            <Col className="text-center">
              <img
                src={bet.team2Logo}
                alt={bet.team2}
                width={50}
                height={50}
                className="rounded-circle"
              />
            </Col>
          </Row>
        </Card.Title>
      </Card.Body>
      <Card.Footer className={showFooter ? "d-block" : "d-none"}>
        <Row>
          {Array.from(Array(6).keys()).map((i) => (
            <Col key={i}>
              <Button
                onClick={async () => {
                  setShowFooter(false);
                  setIsLoading(true);
                  await BetModel.updateBet(userId, bet, teamToUpdate, i);
                  setIsLoading(false);
                  const tempBet = { ...bet };
                  if (teamToUpdate === 1) tempBet.team1Score = i;
                  else tempBet.team2Score = i;
                  setBet(tempBet);
                }}
              >
                {i}
              </Button>
            </Col>
          ))}
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default BetCard;

import React from "react";
import { Button, Card } from "react-bootstrap";
import ApproveModel from "./ApproveModel";
import User from "../../models/User";
import Auth from "../../auth";

function UserCard({ user }) {
  const [show, setShow] = React.useState(false);
  const [showApprovedModel, setShowApprovedModel] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const handleDelete = async (id) => {
    const resp = await User.delete(id);
    if (resp.status === 200) {
      window.location.reload();
    }
  };

  const myUserId = Auth.getUserId();
  return (
    <>
      <tr key={user.id} onClick={() => setShow((prev) => !prev)}>
        <td>{user.nickName}</td>
        <td>
          <img
            src={user.photo}
            width={50}
            height={50}
            className="rounded-circle"
            alt="userPhoto"
          />
        </td>
      </tr>
      {show && (
        <tr>
          <td colSpan={"100%"}>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-around align-items-center ">
                  <Card.Title>{user.nickName}</Card.Title>
                  <Card.Text>
                    <img
                      src={user.photo}
                      width={60}
                      height={60}
                      className="rounded-circle"
                      alt="userPhoto2"
                    />
                  </Card.Text>
                  <Card.Title>Score: {user.score}</Card.Title>
                </div>
                <Card.Text className="text-center">
                  {user?.isAdmin && <h3>Admin</h3>}
                </Card.Text>
                <div className="d-flex justify-content-around">
                  <button
                    className="bg-danger text-white p-2  rounded-3 border-white"
                    onClick={() => setShowApprovedModel(true)}
                    disabled={myUserId.toString() === user.id.toString()}
                  >
                    Delete
                  </button>
                  <Button
                    className=" text-white p-2  rounded-3 border-white"
                    onClick={async () => {
                      setIsLoading(true);
                      await User.changeAdmin(user.id, !user.isAdmin);
                      setIsLoading(false);
                      window.location.reload();
                    }}
                    disabled={
                      !isLoading || myUserId.toString() === user.id.toString()
                    }
                  >
                    {user.isAdmin ? "Remove Admin" : "Make Admin"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </td>
        </tr>
      )}
      {showApprovedModel && (
        <ApproveModel
          show={showApprovedModel}
          setShow={setShowApprovedModel}
          title={"Delete User"}
          body={`Are you sure you want to delete ${user.nickName}?`}
          handleApprove={() => handleDelete(user.id)}
          handleReject={() => setShowApprovedModel(false)}
        />
      )}
    </>
  );
}

export default UserCard;

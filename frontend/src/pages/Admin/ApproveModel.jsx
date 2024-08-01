import React from "react";
import { Modal } from "react-bootstrap";

function ApproveModel({
  show,
  setShow,
  title,
  body,
  handleApprove,
  handleReject,
}) {
  return (
    <Modal show={show} className="vh-100 align-content-center">
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-danger" onClick={handleReject}>
          No
        </button>
        <button className="btn btn-success" onClick={handleApprove}>
          Yes
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ApproveModel;

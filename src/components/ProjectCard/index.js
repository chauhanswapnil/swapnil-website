import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import styles from "./index.module.css";

export default function ProjectCard({ project }) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div className={styles.card} onClick={() => setModalShow(true)}>
        <div className={styles.imageOverlay}>
          <div className={styles.imageOverlayText}>
            <p className={styles.projectTitle}>{project.title}</p>
          </div>
        </div>
      </div>
      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} project={project} />
    </>
  );
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered contentClassName={styles.modalContainer}>
      <Modal.Header closeButton>{/* <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title> */}</Modal.Header>
      <Modal.Body>
        <h4 className={styles.modalTitle}>{props.project.title}</h4>
        <p className={styles.modalDescription}>{props.project.description}</p>
      </Modal.Body>
    </Modal>
  );
}

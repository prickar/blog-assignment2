import React from "react";
import * as Icons from "../../icons";
import styles from "./link-modal.module.css";
import { Modal } from "../../../modal/modal";
import Button from "../../../button";

export function LinkModal({
  url,
  closeModal,
  onSaveLink,
  onChangeUrl,
  onRemoveLink,
  ...rest
}) {
  return (
    <Modal {...rest}>
      <div className={styles.container}>
        <div className={styles.modalHeader}>
          <h2 className="modal-title">Edit link</h2>
          <Button
            className={styles.closeModal}
            type="button"
            onClick={closeModal}
          >
            <Icons.X />
          </Button>
        </div>

        <div className={styles.input}>
          <label className="modal-label">URL</label>
          <input
            className={styles.modalInput}
            autoFocus
            value={url}
            onChange={onChangeUrl}
          />
        </div>
        <div className={styles.modalButtons}>
          <Button
            className={styles.modalButton}
            type="button"
            onClick={onRemoveLink}
          >
            Remove
          </Button>
          <Button
            className={styles.modalButton}
            type="button"
            onClick={onSaveLink}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}

import { Tag } from "../types";
import styles from "../scss/EditTagsModal.module.scss";

type EditTagsModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: (state: boolean) => void;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

const EditTagsModal = ({
  availableTags,
  show,
  handleClose,
  deleteTag,
  updateTag,
}: EditTagsModalProps) => {
  return (
    <div className={styles.modal__background}>
      <div className={styles.modal__wrapper}>
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>Edit tags</h2>
          <button
            className={styles.modal__closeButton}
            onClick={() => handleClose(!show)}
          >
            &times;
          </button>
        </div>
        <form action="">
          {availableTags.map((tag) => (
            <div className={styles.modal__inputWrapper} key={tag.id}>
              <input
                type="text"
                name="title"
                id="title"
                value={tag.label}
                onChange={(event) => updateTag(tag.id, event.target.value)}
              />
              <button onClick={() => deleteTag(tag.id)}>&times;</button>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default EditTagsModal;

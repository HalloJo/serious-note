import { NoteData, Tag } from "../types";
import NoteForm from "./NoteForm";
import styles from "../scss/NewNote.module.scss";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const NewNote = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
  return (
    <div className={styles.newNote}>
      <h1 className={styles.newNote__title}>Create a new note.</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default NewNote;

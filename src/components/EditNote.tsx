import { NoteData, Tag } from "../types";
import NoteForm from "./NoteForm";
import { useNote } from "./NotesLayout";
import styles from "../scss/EditNote.module.scss";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
  const note = useNote();

  return (
    <div className={styles.editNote}>
      <h1 className={styles.editNote__title}>Edit note.</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default EditNote;

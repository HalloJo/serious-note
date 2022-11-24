import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NotesLayout";
import ReactMarkdown from "react-markdown";
import styles from "../scss/Note.module.scss";

type NoteProps = {
  onDelete: (id: string) => void;
};

const Note = ({ onDelete }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <div className={styles.note}>
      <div className={styles.note__wrapper}>
        <h1 className={styles.note__title}>{note.title}</h1>
        {note.tags.length > 0 && (
          <ul className={styles.note__tagList}>
            {note.tags.map((tag) => (
              <li className={styles.note__tag} key={tag.id}>
                {tag.label}
              </li>
            ))}
          </ul>
        )}
        <ReactMarkdown className={styles.note__markdown}>
          {note.markdown}
        </ReactMarkdown>
        <div className={styles.note__buttonWrapper}>
          <Link to={`/${note.id}/edit`}>
            <button className={styles.note__primary} type="button">
              Edit
            </button>
          </Link>
          <Link to="/">
            <button
              className={styles.note__delete}
              onClick={() => {
                onDelete(note.id);
                // navigate("/");
              }}
              type="button"
            >
              Delete
            </button>
          </Link>
          <Link to="/">
            <button className="notesList__buttonPrimary" type="button">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;

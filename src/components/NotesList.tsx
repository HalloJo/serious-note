import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag, Note, SimplifiedNote } from "../types";
import EditTagsModal from "./EditTagsModal";
import Logo from "./Logo";
import NoteCard from "./NoteCard";
import styles from "../scss/Noteslist.module.scss";

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

const NotesList = ({
  availableTags,
  notes,
  deleteTag,
  updateTag,
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        title === "" ||
        (note.title.toLowerCase().includes(title.toLowerCase()) &&
          (selectedTags.length === 0 ||
            selectedTags.every((tag) =>
              note.tags.some((noteTag) => noteTag.id === tag.id)
            )))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <header className={styles.notesList}>
        <div className={styles.notesList__header}>
          <Logo />
          <div className={styles.notesList__buttons}>
            <Link to="/new">
              <button
                className={`${styles.notesList__primary} ${styles.notesList__button}`}
                type="button"
              >
                Create note.
              </button>
            </Link>
            <button onClick={() => setShow(true)}>Edit tags</button>
          </div>
        </div>
        <form className={styles.notesList__form} action="">
          <div className={styles.notesList__inputWrapper}>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              placeholder="Filter on title here.."
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
          <div className="noteForm__inputWrapper">
            <ReactSelect
              placeholder="Filter on tags here.."
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: "#535bf2",
                  backgroundColor: "#242424",
                  borderRadius: "25px",
                  padding: "0.4rem 0.4rem",
                  fontSize: "15px",
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  color: "#fff",
                  backgroundColor: "#242424",
                  border: "#535bf2",
                }),
                option: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "#242424",
                  ":hover": {
                    backgroundColor: "#535bf2",
                  },
                }),
                multiValue: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "#e611d7",
                  borderRadius: "20px",
                  padding: "0px 5px",
                }),
                multiValueLabel: (baseStyles) => ({
                  ...baseStyles,
                  color: "#fff",
                }),
              }}
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
              isMulti
            />
          </div>
        </form>
      </header>
      <div className={styles.notesList__notes}>
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            tags={note.tags}
          />
        ))}
      </div>
      {notes.length === 0 && (
        <h1 className={styles.notesList__message}>
          No serious notes yet. Create one, quick!
        </h1>
      )}
      {show && (
        <EditTagsModal
          show={show}
          handleClose={() => setShow(false)}
          deleteTag={deleteTag}
          updateTag={updateTag}
          availableTags={availableTags}
        />
      )}
    </>
  );
};

export default NotesList;

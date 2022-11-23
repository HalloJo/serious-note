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
        <form action="">
          <div className="noteForm__inputWrapper">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
          <div className="noteForm__inputWrapper">
            <label htmlFor="tag">Tag</label>
            <ReactSelect
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: "rgb(118, 118, 118)",
                  backgroundColor: "#242424",
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
      <div>
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            tags={note.tags}
          />
        ))}
      </div>
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

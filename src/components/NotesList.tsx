import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag, Note, SimplifiedNote } from "../types";
import NoteCard from "./NoteCard";

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
};

const NotesList = ({ availableTags, notes }: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

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
      <header className="notesList__header">
        <h1 className="notesList__title">On a more serious note.</h1>
        <div className="notesList__buttonWrapper">
          <Link to="/new">
            <button className="notesList__buttonPrimary" type="button">
              Create
            </button>
          </Link>
          <button>Edit tags</button>
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
    </>
  );
};

export default NotesList;

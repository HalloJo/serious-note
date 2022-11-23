import { Link } from "react-router-dom";
import { useNote } from "./NotesLayout";

const Note = () => {
  const note = useNote();

  return (
    <>
      <h1>{note.title}</h1>
      {note.tags.length > 0 && (
        <ul>
          {note.tags.map((tag) => (
            <li key={tag.id}>{tag.label}</li>
          ))}
        </ul>
      )}
      <Link to={`/${note.id}/edit`}>
        <button className="notesList__buttonPrimary" type="button">
          Edit
        </button>
      </Link>
      <button>Delete</button>
      <Link to="/">
        <button className="notesList__buttonPrimary" type="button">
          Back
        </button>
      </Link>
    </>
  );
};

export default Note;

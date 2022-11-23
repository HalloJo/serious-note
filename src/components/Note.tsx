import { Link } from "react-router-dom";
import { useNote } from "./NotesLayout";
import ReactMarkdown from "react-markdown";

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
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
};

export default Note;

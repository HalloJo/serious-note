import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NotesLayout";
import ReactMarkdown from "react-markdown";

type NoteProps = {
  onDelete: (id: string) => void;
};

const Note = ({ onDelete }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();

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
      <button
        onClick={() => {
          onDelete(note.id);
          navigate("/");
        }}
      >
        Delete
      </button>
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

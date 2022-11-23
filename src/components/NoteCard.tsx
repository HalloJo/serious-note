import { Link } from "react-router-dom";
import { SimplifiedNote, Tag } from "../types";

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
  return (
    <Link to={`/${id}`}>
      <h3>{title}</h3>
      {tags.length > 0 && (
        <ul>
          {tags.map((tag) => (
            <li key={tag.id}>{tag.label}</li>
          ))}
        </ul>
      )}
    </Link>
  );
};

export default NoteCard;

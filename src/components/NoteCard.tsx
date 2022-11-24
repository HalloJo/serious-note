import { Link } from "react-router-dom";
import { SimplifiedNote, Tag } from "../types";
import styles from "../scss/NoteCard.module.scss";

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
  return (
    <Link to={`/${id}`} className={styles.noteCard}>
      <div className={styles.noteCard__wrapper}>
        <h3 className={styles.noteCard__title}>{title}</h3>
        {tags.length > 0 && (
          <ul className={styles.noteCard__tagList}>
            {tags.map((tag) => (
              <li className={styles.noteCard__tag} key={tag.id}>
                {tag.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
};

export default NoteCard;

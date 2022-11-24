import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../types";
import { v4 as uuidV4 } from "uuid";
import styles from "../scss/NoteForm.module.scss";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  };

  return (
    <form action="" onSubmit={handleSubmit} className={styles.noteForm}>
      <div className={styles.noteForm__inputWrapper}>
        <input
          ref={titleRef}
          type="text"
          name="title"
          id="title"
          defaultValue={title}
          placeholder="Write down the title here.."
          required
        />
      </div>
      <div className={styles.noteForm__inputWrapper}>
        <CreateableReactSelect
          placeholder="Select or create a tag.."
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
            input: (baseStyles) => ({
              ...baseStyles,
              color: "#fff",
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
          onCreateOption={(label) => {
            const newTag = { id: uuidV4(), label };
            onAddTag(newTag);
            setSelectedTags((previous) => [...previous, newTag]);
          }}
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
      <div className={styles.noteForm__inputWrapper}>
        <textarea
          className={styles.noteForm__textarea}
          ref={markdownRef}
          name="markdown"
          id="markdown"
          required
          rows={12}
          defaultValue={markdown}
          placeholder="Type your note here.."
        />
      </div>
      <div className={styles.noteForm__buttonWrapper}>
        <button className={styles.noteForm__primary} type="submit">
          Save
        </button>
        <Link to="..">
          <button type="button">Cancel</button>
        </Link>
      </div>
    </form>
  );
};

export default NoteForm;

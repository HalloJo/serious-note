import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../types";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const NoteForm = ({ onSubmit, onAddTag, availableTags }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
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
    <form action="" onSubmit={handleSubmit}>
      <div className="noteForm__inputWrapper">
        <label htmlFor="title">Title</label>
        <input ref={titleRef} type="text" name="title" id="title" required />
      </div>
      <div className="noteForm__inputWrapper">
        <label htmlFor="tag">Tag</label>
        <CreateableReactSelect
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
      <div className="noteForm__inputWrapper">
        <label htmlFor="markdown">Body</label>
        <textarea
          ref={markdownRef}
          name="markdown"
          id="markdown"
          required
          rows={15}
        />
      </div>
      <div className="noteForm__buttonWrapper">
        <button className="noteForm__buttonPrimary" type="submit">
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

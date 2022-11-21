import { Link } from "react-router-dom";
import CreateableReactSelect from "react-select/creatable";

const NoteForm = () => {
  return (
    <form action="">
      <div className="noteForm__inputWrapper">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required />
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
          isMulti
        />
      </div>
      <div className="noteForm__inputWrapper">
        <label htmlFor="markdown">Body</label>
        <textarea name="markdown" id="markdown" required rows={15} />
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

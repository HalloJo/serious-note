import { Tag } from "../types";

type EditTagsModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: (state: boolean) => void;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

const EditTagsModal = ({
  availableTags,
  show,
  handleClose,
  deleteTag,
  updateTag,
}: EditTagsModalProps) => {
  return (
    <div>
      <h1>Edit tags</h1>
      <button onClick={() => handleClose(!show)}>Close</button>
      <form action="">
        {availableTags.map((tag) => (
          <div key={tag.id}>
            <input
              type="text"
              name="title"
              id="title"
              value={tag.label}
              onChange={(event) => updateTag(tag.id, event.target.value)}
            />
            <button onClick={() => deleteTag(tag.id)}>&times;</button>
          </div>
        ))}
      </form>
    </div>
  );
};

export default EditTagsModal;

import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./components/NewNote";
import "./scss/App.scss";
import "./scss/globals.scss";
import { NoteData, RawNote, Tag } from "./types";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((previousNotes) => {
      return [
        ...previousNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  const addTag = (tag: Tag) => {
    setTags((previous) => [...previous, tag]);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>On a more serious note.</h1>} />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;

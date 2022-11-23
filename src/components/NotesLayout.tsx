import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "../types";

type NotesLayoutProps = {
  notes: Note[];
};

const NotesLayout = ({ notes }: NotesLayoutProps) => {
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);

  if (note == null) return <Navigate to="/" replace />;

  return <Outlet context={note} />;
};

export function useNote() {
  return useOutletContext<Note>();
}

export default NotesLayout;

import { Navigate, Route, Routes } from "react-router-dom";
import "./scss/App.scss";
import "./scss/globals.scss";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>On a more serious note.</h1>} />
        <Route path="/new" element={<p>New</p>} />
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

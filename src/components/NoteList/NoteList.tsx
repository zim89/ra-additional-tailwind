import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Note } from "../../types";
import NoteItem from "../NoteItem/NoteItem";
import { setFilter } from "../../redux/notesReducer";
import FormCreate from "../FormCreate/FormCreate";
import FormEdit from "../FormEdit/FormEdit";

const NoteList: FC = () => {
  const [addForm, setAddForm] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<boolean>(false);
  const [noteId, setNoteId] = useState<string>("");

  const dispatch = useDispatch();
  const notes = useSelector(({ notes }) => notes.items);
  const filter = useSelector(({ notes }) => notes.isArchived);
  const filteredNotes = notes.filter(
    (item: Note) => item.isArchived === filter
  );

  const handleEdit = (noteId: string) => {
    setAddForm(false);
    setNoteId(noteId);
    setEditForm(true);
  };

  return (
    <>
      {addForm && <FormCreate setAddForm={setAddForm} />}
      {editForm && <FormEdit setEditForm={setEditForm} noteId={noteId} />}
      <div className="flex justify-start gap-4 mt-4 text-sm">
        <button
          className="rounded border px-4 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          onClick={() => {
            setAddForm(!addForm);
            setEditForm(false);
          }}
        >
          Add note
        </button>
        <label className="flex align-middle">
          Show archived notes&nbsp;
          <input
            type="checkbox"
            name="filter"
            onChange={(e: React.BaseSyntheticEvent) =>
              dispatch(setFilter(e.currentTarget.checked))
            }
          />
        </label>
      </div>
      <table className=" mt-3 text-sm">
        <thead>
          <tr className="">
            <th className="w-40 border border-gray-50 text-gray-50 bg-slate-600 py-1">
              Name
            </th>
            <th className="w-32 border border-gray-50 text-gray-50 bg-slate-600 py-1">
              Created
            </th>
            <th className="w-40 border border-gray-50 text-gray-50 bg-slate-600 py-1">
              Category
            </th>
            <th className="w-60 border border-gray-50 text-gray-50 bg-slate-600 py-1">
              Content
            </th>
            <th className="w-32 border border-gray-50 text-gray-50 bg-slate-600 py-1">
              Dates
            </th>
            <th className="w-24 border border-gray-50 text-gray-50 bg-slate-600 py-1">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredNotes.map((note: Note) => (
            <tr key={note.id} className="border-b border-gray-400">
              <NoteItem note={note} handleEdit={handleEdit} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default NoteList;

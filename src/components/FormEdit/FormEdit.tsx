import { FC, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Note } from "../../types";
import moment from "moment";
import { createNote, editNote } from "../../redux/notesReducer";

interface FormEditProps {
  noteId: string;
  setEditForm: (value: boolean) => void;
}

const FormEdit: FC<FormEditProps> = ({ noteId, setEditForm }) => {
  const dispatch = useDispatch();
  const notes = useSelector(({ notes }) => notes.items);
  const note = notes.find((note: Note) => note.id === noteId);

  const [name, setName] = useState<string>(note.name);
  const [category, setCategory] = useState<string>(note.category);
  const [content, setContent] = useState<string>(note.content);
  const [date, setDate] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editedNote: Note = {
      id: note.id,
      created_at: note.created_at,
      name,
      category,
      content,
      dates: [...note.dates],
      isArchived: note.isArchived,
    };

    if (date) {
      if (!isNaN(Date.parse(date))) {
        editedNote.dates.push(moment(Date.parse(date)).format("YYYY.MM.DD"));
      } else {
        alert("Enter valid date");
        return;
      }
    }

    dispatch(editNote(editedNote));
    setEditForm(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-96 my-6 py-6 px-4 text-sm rounded-md border "
      >
        <h3 className="mb-4 text-center text-red-700">Edit Note:</h3>
        <div className="flex flex-col gap-4">
          <label
            htmlFor="name"
            className="flex gap-4 align-middle justify-between"
          >
            Name:{" "}
            <input
              type="text"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="rounded border border-gray-400 w-9/12 px-2"
            />
          </label>

          <label
            htmlFor="category"
            className="flex gap-4 align-middle justify-between"
          >
            Category:{" "}
            <select
              name="category"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
              className="rounded border border-gray-400 w-9/12 px-2"
            >
              <option value="Task">Task</option>
              <option value="Quote">Quote</option>
              <option value="Idea">Idea</option>
              <option value="Random Thought">Random Thought</option>
            </select>
          </label>

          <label
            htmlFor="content"
            className="flex gap-4 align-middle justify-between"
          >
            Content:{" "}
            <textarea
              name="content"
              value={content}
              rows={1}
              required
              onChange={(e) => setContent(e.target.value)}
              className="rounded border border-gray-400 w-9/12 px-2"
            />
          </label>

          <label
            htmlFor="dates"
            className="flex gap-4 align-middle justify-between"
          >
            Dates:{" "}
            <input
              type="text"
              name="dates"
              value={note.dates.join(", ")}
              disabled
              className="rounded border border-gray-400 w-9/12 bg-gray-100 px-2"
            />
          </label>

          <label
            htmlFor="date"
            className="flex gap-4 align-middle justify-between"
          >
            Set date:{" "}
            <input
              type="text"
              name="name"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded border border-gray-400 w-9/12 px-2"
            />
          </label>
        </div>

        <div className="mt-6 flex gap-8 justify-center">
          <button
            onClick={() => setEditForm(false)}
            type="button"
            className="rounded border px-4  border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
          >
            Close form
          </button>
          <button
            type="submit"
            className="rounded border px-4  border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            Save note
          </button>
        </div>
      </form>
    </>
  );
};

export default FormEdit;

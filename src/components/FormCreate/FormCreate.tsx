import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Note } from "../../types";
import { nanoid } from "@reduxjs/toolkit";
import moment from "moment";
import { createNote } from "../../redux/notesReducer";

interface FormCreateProps {
  setAddForm: (value: boolean) => void;
}

const FormCreate: FC<FormCreateProps> = ({ setAddForm }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("Task");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote: Note = {
      id: nanoid(),
      created_at: new Date().toLocaleString(),
      name,
      category,
      content,
      dates: [],
      isArchived: false,
    };

    if (date) {
      if (!isNaN(Date.parse(date))) {
        newNote.dates.push(moment(Date.parse(date)).format("YYYY.MM.DD"));
      } else {
        alert("Enter valid date");
        return;
      }
    }

    dispatch(createNote(newNote));
    setAddForm(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-96 my-6 py-6 px-4 text-sm rounded-md border "
      >
        <h3 className="mb-4 text-center text-red-700">Create Note:</h3>
        <div className="flex flex-col gap-4">
          <label
            htmlFor="name"
            className="flex gap-4 align-middle justify-between"
          >
            Name:{" "}
            <input
              type="text"
              id="name"
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
              id="category"
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
              id="content"
              name="content"
              value={content}
              rows={1}
              required
              onChange={(e) => setContent(e.target.value)}
              className="rounded border border-gray-400 w-9/12 px-2"
            />
          </label>

          <label
            htmlFor="date"
            className="flex gap-4 align-middle justify-between"
          >
            Date:{" "}
            <input
              type="text"
              name="name"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded border border-gray-400 w-9/12 px-2"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="rounded border px-4  border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            Create note
          </button>
        </div>
      </form>
    </>
  );
};

export default FormCreate;

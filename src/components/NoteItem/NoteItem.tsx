import { FC } from "react";
import { Note } from "../../types";
import {
  PencilSquareIcon,
  ArchiveBoxIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { archiveNote, deleteNote } from "../../redux/notesReducer";

interface NoteItemProps {
  handleEdit: (id: string) => void;
  note: Note;
}

const NoteItem: FC<NoteItemProps> = ({ note, handleEdit }) => {
  const { id, name, created_at, category, content, dates } = note;
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteNote(id));
  const handleArchive = () => dispatch(archiveNote(id));

  return (
    <>
      <td className="py-2">{name}</td>
      <td className="py-2">{created_at}</td>
      <td className="py-2">{category}</td>
      <td className="py-2">{content}</td>
      <td className="py-2">{dates.length > 0 ? dates.join(", ") : null}</td>
      <td className="flex flex-nowrap justify-center py-2">
        <button onClick={() => handleEdit(id)}>
          <PencilSquareIcon className="h-6 w-6 text-green-500 hover:text-green-700" />
        </button>
        <button onClick={handleArchive}>
          <ArchiveBoxIcon className="h-6 w-6 text-gray-400 hover:text-gray-600" />
        </button>
        <button onClick={handleDelete}>
          <TrashIcon className="h-6 w-6 text-red-400 hover:text-red-700" />
        </button>
      </td>
    </>
  );
};
export default NoteItem;

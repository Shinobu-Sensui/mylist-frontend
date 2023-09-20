import "./interface.css";
import SearchBar from "../searchInterface/SearchBar";
import { ChangeEvent, useState, useEffect } from "react";
import TableEdit from "./Table";
import DeleteModal from "../modal/deletemodal/DeleteModal";
import AddModal from "../modal/addmodal/AddModal";
import EditModal from "../modal/editmodal/EditModal";
import AddTagModal from "../modal/addtagmodal/AddTagModal";
import { useSearchEdit } from "../../hooks/useSearch";
import { env } from "../../url";

const Interface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [syllable, setSyllable] = useState("test");
  const [debouncedSyllable, setDebouncedSyllable] = useState<string>(syllable);
  const searchResults = useSearchEdit(debouncedSyllable, isOpen);

  const [editAction, setEditAction] = useState({
    action: "normal",
    word: "",
    tags: null as any,
    tagsGlobal: null as any,
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSyllable(syllable);
    }, 100);

    return () => {
      clearTimeout(timerId);
    };
  }, [syllable]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSyllable(value);
  };

  const getTags = async (word: string) => {
    const url = `${env}/getTags/${word}`;
    const response: any = await fetch(url);
    if (!response) return;
    return await response.json();
  };

  const handleClick = async (
    action: "edit" | "delete" | "add" | "deleteTag" | "addTag",
    word?: string | any
  ) => {
    if (action === "edit") {
      setEditAction({ ...editAction, action, word });
      setIsOpen(true);
    } else if (action === "delete") {
      setEditAction({ ...editAction, action, word });
      setIsOpen(true);
    } else if (action === "add") {
      setEditAction({ ...editAction, action });
      setIsOpen(true);
    } else if (action === "addTag") {
      const data = await getTags(word);
      setEditAction({
        ...editAction,
        action,
        word,
        tagsGlobal: data.list,
        tags: data.tagsElement,
      });
      setIsOpen(true);
    }
  };

  return (
    <>
      {editAction.action === "normal" && (
        <>
          <div className="addWordAndInput">
            <SearchBar change={handleChange} id="search-edit" />
            <button
              onClick={ () =>
                handleClick("add")
              }
              className="add-button">
              Ajouter des mots
            </button>
          </div>

          <TableEdit handleClick={() => handleClick} searchResults={searchResults} />
        </>
      )}

      {editAction.action === "edit" && (
        <EditModal
          onClose={() => {
            setEditAction({ ...editAction, action: "normal" });
            setIsOpen(false);
          }}
          isOpen={isOpen}
          word={editAction.word}
        />
      )}
      {editAction.action === "delete" && (
        <DeleteModal
          onClose={() => {
            setEditAction({ ...editAction, action: "normal" });
            setIsOpen(false);
          }}
          word={editAction.word}
          isOpen={isOpen}
        />
      )}
      {editAction.action === "add" && (
        <AddModal
          onClose={() => {
            setEditAction({ ...editAction, action: "normal" });
            setIsOpen(false);
          }}
          isOpen={isOpen}
        />
      )}

      {editAction.action === "addTag" && (
        <AddTagModal
          onClose={() => {
            setEditAction({ ...editAction, action: "normal" });
            setIsOpen(false);
          }}
          word={editAction.word}
          tags={editAction.tags}
          tagsGlobal={editAction.tagsGlobal}
          isOpen={isOpen}
        />
      )}
    </>
  );
};

export default Interface;

import React, {  useState } from "react";
import "./addtagmodal.css";
import { FaPeopleArrows } from "react-icons/fa";
import { putModal } from "../../../hooks/useAddTagModal";

type ModalProps = {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  word: string;
  tagsGlobal: string[];
  tags: string[],

};

const AddTagModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  word,
  tags,
  tagsGlobal,
}): any => {

  const [selectAddTagModal, setSelectTagAddModal] = useState<any>(
    tagsGlobal.map((element, index) => {
      return {
        selected: tags.includes(element) ? true : false,
        index,
        element,
      };
    })
  );

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
    index?: number
  ) => {
    const { value } = event.currentTarget;

    if (value === "addTagEdit") {
      setSelectTagAddModal((current: any) => {
        return [...current].map((element, i) =>
          index === i ? { ...element, selected: !element.selected } : element
        );
      });

    } else if (value === "addTagModalSuccess") {
        putModal(selectAddTagModal, word)
        onClose(event);
      }
    }

  return isOpen ? (
    <div
      className="containerAddTagModal"
      style={{
        top:0,
        left:0,
        right: 0,
        bottom: 0,
      }}>
      <div
        className="addTagModal"
        style={{
          padding: "20px",
          borderRadius: "10px",
        }}>
        <div className="addTagModalTitle">
          Mode Association <FaPeopleArrows />
        </div>
        <div className="addTagModalWord">Associer des tags au mot {word}</div>
        <div className="addTagModalTagEdit">
          {tagsGlobal.map((element: any, index: number) => (
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => 
                handleClick(e, index)
              }
              key={index}
              value="addTagEdit"
              className="addTagEdit"
              id={selectAddTagModal[index].selected ? "selectedAddTag" : ""}>
              {element}
            </button>
          ))}
        </div>

        <div className="action-confirm">
          <button
            onClick={handleClick}
            value="addTagModalSuccess"
            className="addTagModalSuccess">
            Confirmer
          </button>
          <button className="addTagModalCancel" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddTagModal;

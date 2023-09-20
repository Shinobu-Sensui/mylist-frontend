import React from "react";


interface SearchResultsProps {
  searchResults: {
    solutions: [string, string[]][];
  };
  handleClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
    action: "edit" | "delete" | "add" | "deleteTag" | "addTag",
    word?: string | any,
    tag?:string | any
  ) => void;
}
const TableEdit: React.FC<SearchResultsProps> = ({
  searchResults,
  handleClick,
}) => {
  return (
    <div className="elegant-dark-table">
      <table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchResults &&
            searchResults.solutions.map(
              (word: [string, string[]], index: number) => (
                <tr key={index}>
                  <td className="wordEdit"> 
                  <button onClick={(e) => handleClick(e, 0, "addTag", word[0], word[1])} className="addTag">
                      +
                    </button>
                   <div className="editWord">{word[0]}</div>
                  </td>
                  <td className="containerTagEdit">
                    {word[1].map((tag: string, tagIndex: number) => (
                      <span key={tagIndex} className="tagEdit">
                        {tag}
                      </span>
                    ))}
                  </td>
                  
                  <td className="actions">
                    <button
                      className="edit-button"
                      onClick={(e) => handleClick(e, index, "edit", word[0])}>
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={(e) => handleClick(e, index, "delete", word[0])}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default TableEdit;

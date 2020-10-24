import React, { useState, useEffect } from "react";
import "./FileSelector.css";

export default function FileSelector(props) {
  const [files, setFiles] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [selectedVoteCodeFile, setSelectedVoteCodeFile] = useState(
    "Välj en fil med röstkoder"
  );
  const [selectedVoteFile, setSelectedVoteFile] = useState(
    "Välj en fil med röster"
  );

  /* useEffect hook that enables submit button if two files are provided. */
  useEffect(() => {
    if (files.length === 0) {
      setEnabled(false);
    } else if (files.length === 2) {
      setEnabled(true);
    }
  }, [files]);

  /* Called when each file is provided, set current state for component. */
  const handleFileUpload = (event) => {
    event.preventDefault();
    let id = event.target.id;
    let file = event.target.files[0];
    setFiles([...files, { file_id: id, uploaded_file: file }]);
    if (id === "0") {
      setSelectedVoteCodeFile(file?.name);
    } else {
      setSelectedVoteFile(file?.name);
    }
  };

  /* Called when submitting. Pushes files to Firebase Storage, and provides a download URL. */
  const handleSubmit = (event) => {
    event.preventDefault();
    files.forEach((file) => {
      if (file?.file_id === "0") {
        props.setVoteCodeFile(file?.uploaded_file);
      } else {
        props.setVoteFile(file?.uploaded_file);
      }
      props.setSubmitted(true);
      setFiles([]);
      setSelectedVoteCodeFile("Välj en fil med röstkoder");
      setSelectedVoteFile("Välj en fil med röster");
    });
  };

  return (
    <div className="container">
      <form className="upload-container" onSubmit={handleSubmit}>
        <div className="upload-btn">
          <h3 className="file-upload-header">Röstkoder</h3>
          <input
            id={0}
            name="file"
            type="file"
            accept=".xlsx"
            className="file-input"
            onChange={handleFileUpload}
          />
          <label for={0}>{selectedVoteCodeFile}</label>
        </div>
        <div className="upload-btn">
          <h3 className="file-upload-header">Röster</h3>
          <input
            id={1}
            type="file"
            accept=".xlsx"
            className="file-input"
            onChange={handleFileUpload}
          />
          <label for={1}>{selectedVoteFile}</label>
        </div>
        {enabled ? (
          <div className="submit-btn-root">
            <button className="btn btn-success btn-lg" type="submit">
              Ladda upp
            </button>
          </div>
        ) : (
          <div className="submit-btn-root">
            <button className="btn btn-success btn-lg" type="submit" disabled>
              Ladda upp
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

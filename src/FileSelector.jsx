import FirebaseInstance from "./FirebaseInstance.jsx";
import React, { useState, useEffect } from "react";

export default function FileSelector() {
  const [files, setFiles] = useState([]);
  const [voteCodeFileUrl, setVoteCodeFileUrl] = useState("");
  const [voteFileUrl, setVoteFileUrl] = useState("");
  const [enabled, setEnabled] = useState(false);

  /* Singleton Firebase instance */
  const firebase = new FirebaseInstance().firebase;

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
  };

  /* Called when submitting. Pushes files to Firebase Storage, and provides a download URL. */
  const handleSubmit = (event) => {
    event.preventDefault();
    const storageRef = firebase.storage().ref();
    files.forEach((file) => {
      if (file.file_id === "0") {
        let excelFile = storageRef.child("voting_codes.xlsx");
        excelFile.put(file.uploaded_file).then((snapshot) => {
          excelFile.getDownloadURL().then((url) => {
            setVoteCodeFileUrl(url);
          });
        });
      } else {
        let excelFile = storageRef.child("votes.xlsx");
        excelFile.put(file.uploaded_file).then((snapshot) => {
          excelFile.getDownloadURL().then((url) => {
            setVoteFileUrl(url);
          });
        });
      }
      setFiles([]);
    });
  };

  return (
    <form className="upload-container" onSubmit={handleSubmit}>
      <div className="upload-button">
        <span>Röstkoder</span>
        <input id={0} accept=".xlsx" type="file" onChange={handleFileUpload} />
      </div>
      <div className="upload-button">
        <span>Röster</span>
        <input id={1} accept=".xlsx" type="file" onChange={handleFileUpload} />
      </div>
      {enabled ? (
        <button type="submit">Submit</button>
      ) : (
        <button disabled type="submit">
          Submit
        </button>
      )}
    </form>
  );
}

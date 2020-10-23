import FirebaseInstance from "./FirebaseInstance.jsx";
import React, { useState } from "react";

export default function FileSelector() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    event.preventDefault();
    let id = event.target.id;
    let file = event.target.files[0];
    setFiles([...files, { file_id: id, uploaded_file: file }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(files);
  };

  return (
    <form className="upload-container" onSubmit={handleSubmit}>
      <div className="upload-button">
        <span>Röstkoder</span>
        <input id={1} accept=".xlsx" type="file" onChange={handleFileUpload} />
      </div>
      <div className="upload-button">
        <span>Röster</span>
        <input id={2} accept=".xlsx" type="file" onChange={handleFileUpload} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

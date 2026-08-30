import React, { useEffect, useState } from "react";

const HTMLLoader = ({ filePath }) => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error("Error loading HTML:", error));
  }, [filePath]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default HTMLLoader;

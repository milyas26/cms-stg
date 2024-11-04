import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Editor } from "ckeditor5-custom-build";
import { useChapterPostStore } from "@/stores/chapterPostStore";

function CkEditorCustom({ value, onChange }) {
  const { setWordCount } = useChapterPostStore();
  const editorConfiguration = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "alignment",
      "|",
      "bulletedList",
      "numberedList",
      "|",
      "fontColor",
      "highlight",
      "|",
      "outdent",
      "indent",
      "horizontalLine",
      "|",
      "blockQuote",
      "undo",
      "redo",
      "|",
      "removeFormat",
    ],
    wordCount: {
      onUpdate: (stats) => {
        setWordCount(stats.words);
      },
    },
  };

  return (
    <CKEditor
      editor={Editor}
      data={value || ""}
      config={editorConfiguration}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}

export default CkEditorCustom;

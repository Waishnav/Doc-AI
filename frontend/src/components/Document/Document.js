import "./Document.css";
import { useEffect, useCallback, useState } from "react";
import Quill from "quill";
import { io } from "socket.io-client";
import "quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import OpenAi from "../openAi/openAi";
import Logo from "../../Assets/LOGO.png"

const OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["blockquote", "code-block"],
  ["clean"],
];

function DocumentEditor() {
  const [count, setCount] = useState(0);
  const [openAiResponse, setOpenAiResponse] = useState("");
  const [title, setTitle] = useState("Untitled Document");
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const { id: docID } = useParams();
  function shareDocument() {
    const link = document.location.href;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.log("Failed to copy link: ", err);
      });
  }

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
    socket.emit("update-title", { docID, newTitle });
  }

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: OPTIONS,
      },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on("title-updated", (title) => setTitle(title));
  }, [socket]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", docID);
  }, [socket, quill, docID]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  // useEffect(() => {
  //   if (quill == null) return;

  //   quill.on("text-change", async (delta) => {
  //       console.log(delta, count)
  //       setCount(count + 1)
  //       if (count == 50) {
  //         const contents = quill.getContents();
  //         if (contents.ops.length === 0) return;
  //         const lastLine = contents.ops[contents.ops.length - 1];
  //         let prompt
  //         if (lastLine.insert.indexOf("//") === 0) {
  //           prompt = lastLine.insert.slice(2);
  //         }
  //         console.log(prompt);
  //         const client = axios.create({
  //         headers: {
  //           Authorization:
  //             "Bearer " + "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",
  //           },
  //         });
  //       const params = {
  //         prompt: prompt,
  //         max_tokens: 500,
  //         temperature: 1,
  //         n: 1,
  //       };
  //       client
  //       .post(
  //         "https://api.openai.com/v1/engines/text-davinci-003/completions",
  //         params
  //       ).then((res) => {
  //           console.log(res.data.choices[0].text)
  //           setOpenAiResponse(res.data.choices[0].text);
  //           // console.log(openAiResponse)
  //           // const delta = quill.clipboard.convert(openAiResponse)
  //           const cursorPosition = quill.getSelection().index;
  //           console.log(cursorPosition)
  //           // quill.insertText(cursorPosition, '\n', {
  //             // 'italic': true
  //           // });
  //           // quill.insertText(cursorPosition, String(openAiResponse), {
  //           //   'italic': true
  //           // });
  //           console.log(openAiResponse)

  //           const editor = document.querySelector(".ql-editor")
  //           const para = document.createElement("p");
  //           para.innerText = openAiResponse;

  //           editor.appendChild(para)

  //           // quill.setText(`{openAiResponse}\n`);
  //           // quill.clipboard.dangerouslyPasteHTML(openAiResponse);
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //         });

  //       }
  //       // if (source !== "user") return
  //        // OpenAI code here
  //   });
  // }, [quill, count]);

  return (
    <div>
      <div id="header">
        <div className="flex">
          <img src={Logo} alt="Logo" />
          <input
            id="text"
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
        </div>
        <div id="share">
          <button onClick={() => shareDocument()}>Share</button>
        </div>
      </div>
      <div className="documents">
        <div id="container" ref={wrapperRef}></div>
        <div>
          <OpenAi></OpenAi>
        </div>
      </div>
    </div>
  );
}

export default DocumentEditor;

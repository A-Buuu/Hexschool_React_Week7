import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// 因 Toast API 與我們元件撞名，因此改名 BsToast
import { Toast as BsToast } from "bootstrap";
import { removeMessage } from "../slices/toastSlice";


export default function Toast() {
  const messages = useSelector((state) => {
    // console.log(state);
    return state.toast.messages;
  })

  // 建立 Toast 實例
  const toastRef = useRef({});
  const dispatch = useDispatch();
  useEffect(() => {
    // 讓每個訊息都建立一個 Toast 的實例
    messages.forEach((message) => {
      // current 為物件，因以變數取 Key 因此要以括號法取值(該 Toast DOM)
      const messageElement = toastRef.current[message.id];

      if (messageElement) {
        const toastInstance = new BsToast(messageElement);
        toastInstance.show();

        setTimeout(() => {
          dispatch(removeMessage(message.id))
        }, 2000);
      }
    });
    // console.log(toastRef);
  }, [messages]);

  const handleDismiss = (message_id) => {
    dispatch(removeMessage(message_id));
  }

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
      {messages.map((message) => (
        <div
          key={message.id}
          ref={(el) => (toastRef.current[message.id] = el)}
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div
            className={`toast-header ${
              message.status === "success" ? "bg-success" : "bg-danger"
            } text-white`}
          >
            <strong className="me-auto">
              {message.status === "success" ? "成功" : "失敗"}
            </strong>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => handleDismiss(message.id)}
            ></button>
          </div>
          <div className="toast-body text-start">{message.text}</div>
        </div>
      ))}
    </div>
  );
}
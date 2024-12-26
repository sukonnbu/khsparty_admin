import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBoothAuthInfo } from "../utils/firebase";

export default function Login() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [pw, setPwd] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  async function onClick() {
    const boothAuthInfos = await getBoothAuthInfo();
    boothAuthInfos.forEach((info) => {
      if (info.code === code && info.pw === pw) {
        setLoginFailed(false);
        navigate(`/console/${code}`);
      }
    });
    setLoginFailed(true);
  }
  return (
    <>
      <div className="flex-grow flex flex-col items-center justify-start p-4">
        <span className="text-4xl font-bold pb-3">경황제 부스 로그인</span>
        <input
          type="text"
          id="code"
          onChange={(e) => setCode(e.target.value)}
          placeholder="부스 코드"
          className="w-full text-2xl p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto"
          required
        />
        <input
          type="password"
          id="pw"
          onChange={(e) => setPwd(e.target.value)}
          placeholder="비밀번호"
          className="w-full p-3 text-2xl mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto"
          required
        />
        {loginFailed && (
          <span className="text-red-500">로그인 실패... 다시 시도해주세요</span>
        )}
        <button
          onClick={async () => await onClick()}
          className="w-full p-3 bg-button-color text-white rounded"
        >
          로그인
        </button>
      </div>
    </>
  );
}

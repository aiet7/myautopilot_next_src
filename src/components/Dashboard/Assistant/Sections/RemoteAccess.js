"use client";

const RemoteAccess = () => {
  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Remote Access</h3>
      <button className="bg-blue-800 text-white py-2">
        <a
          className="break-words"
          href="https://rmm.etech7.com:8040/Login?Reason=0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Remote Access Portal
        </a>
      </button>
    </div>
  );
};

export default RemoteAccess;

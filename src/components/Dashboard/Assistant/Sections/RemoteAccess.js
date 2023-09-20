"use client";

const RemoteAccess = () => {
  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Remote Access</h3>
      <a
        href="https://rmm.etech7.com:8040/Login?Reason=0"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="hover:bg-blue-500 bg-blue-800 text-white py-2 w-full">
          Remote Access
        </button>
      </a>
    </div>
  );
};

export default RemoteAccess;

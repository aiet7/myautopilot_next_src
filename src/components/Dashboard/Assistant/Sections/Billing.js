"use client";

const Billing = () => {
  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Billing</h3>
      <button className="bg-blue-800 text-white py-2">
        <a
          className="break-words"
          href="https://etech7.connectboosterportal.com/platform/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          Billing Portal
        </a>
      </button>
    </div>
  );
};

export default Billing;

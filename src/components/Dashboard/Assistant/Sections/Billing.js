"use client";

const Billing = () => {
  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Billing</h3>
      <a
        href="https://etech7.connectboosterportal.com/platform/login"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="hover:bg-blue-500 bg-blue-800 text-white py-2 w-full">
          Billing Portal
        </button>
      </a>
    </div>
  );
};

export default Billing;

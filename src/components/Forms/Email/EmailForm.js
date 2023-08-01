const EmailForm = ({
  currentEmailId,
  setCurrentEmailId,
  currentEmailSubject,
  setCurrentEmailSubject,
  currentEmailBody,
  setCurrentEmailBody,
  loading,
  handleEmailConfirmation,
  itemId,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="font-bold">Email</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentEmailId || ""}
            onChange={(e) => setCurrentEmailId(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Subject</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentEmailSubject || ""}
            onChange={(e) => setCurrentEmailSubject(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Body</span>
          <textarea
            className="h-[200px] border outline-blue-500 w-full px-4 resize-none"
            value={currentEmailBody || ""}
            onChange={(e) => setCurrentEmailBody(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="border border-white/30 bg-blue-800 px-3 py-1 text-white"
          disabled={loading.emailForm}
          onClick={() => {
            handleEmailConfirmation(true, itemId);
          }}
        >
          {loading.emailForm ? "Sending..." : "Send Email"}
        </button>
        <button
          className="dark:text-white dark:border-white/30 border border-blue-800 px-3 py-1 text-blue-800"
          onClick={() => {
            handleEmailConfirmation(false, itemId);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EmailForm;

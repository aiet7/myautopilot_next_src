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
      <div>
        <div>
          <span className="font-bold">Email</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentEmailId}
            onChange={(e) => setCurrentEmailId(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Subject</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentEmailSubject}
            onChange={(e) => setCurrentEmailSubject(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Body</span>
          <textarea
            className="h-[200px] border outline-blue-500 w-full px-4 resize-none"
            value={currentEmailBody}
            onChange={(e) => setCurrentEmailBody(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="bg-green-300 rounded-md px-3 py-2 text-white"
          disabled={loading.emailForm}
          onClick={() => {
            handleEmailConfirmation(true, itemId);
          }}
        >
          {loading.emailForm ? "Sending..." : "Send Email"}
        </button>
        <button
          className="bg-red-300 rounded-md px-3 py-2 text-white"
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

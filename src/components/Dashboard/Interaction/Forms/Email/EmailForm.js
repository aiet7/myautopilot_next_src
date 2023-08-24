import useFormsStore from "@/utils/store/interaction/forms/formsStore";

const EmailForm = ({ itemId }) => {
  const { loading, email, setEmail, handleEmailConfirmation } = useFormsStore();
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="font-bold">Email</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={email.currentEmailId || ""}
            onChange={(e) => setEmail("currentEmailId", e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Subject</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={email.currentEmailSubject || ""}
            onChange={(e) => setEmail("currentEmailSubject", e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Body</span>
          <textarea
            className="h-[200px] border outline-blue-500 w-full px-4 resize-none"
            value={email.currentEmailBody || ""}
            onChange={(e) => setEmail("currentEmailBody", e.target.value)}
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

const EmailButtons = ({
  availableEmailIds,
  selectedEmailIndex,
  handleEmailSelection,
}) => {
  return (
    <div className="flex flex-col items-start gap-2">
      {availableEmailIds.map((email, index) => (
        <button
          key={index}
          onClick={() => handleEmailSelection(email, index)}
          className={`${
            selectedEmailIndex === index ? "bg-blue-900" : "bg-gray-500"
          }  text-white px-4 py-2 rounded-md`}
        >
          {email}
        </button>
      ))}
    </div>
  );
};

export default EmailButtons;

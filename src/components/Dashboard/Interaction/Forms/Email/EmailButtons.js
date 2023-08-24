import useFormsStore from "@/utils/store/interaction/forms/formsStore";

const EmailButtons = ({}) => {
  const { email, handleEmailSelection } =
    useFormsStore();
  return (
    <div className="flex flex-col items-start gap-2">
      {email.availableEmailIds.map((email, index) => (
        <button
          key={index}
          onClick={() => handleEmailSelection(email, index)}
          className={`${
            email.selectedEmailIndex === index ? "bg-blue-800" : "bg-gray-500"
          }  text-white px-4 py-2`}
        >
          {email}
        </button>
      ))}
    </div>
  );
};

export default EmailButtons;

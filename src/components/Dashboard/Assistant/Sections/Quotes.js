"use client";

const Quotes = () => {
  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Quotes</h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <button className="bg-blue-800 text-white py-2">
            <a
              className="break-words"
              // href="https://na1.orderporter.com/OrderPorter3.2/online.order?passcode=42d616b0877d54de077e4de3014b99af&entrykey=Sell%20Accordion%20CC%202019"
              target="_blank"
              rel="noopener noreferrer"
            >
              Surveillance Conroe
            </a>
          </button>
        </div>
        <div className="flex flex-col">
          <button className="bg-blue-800 text-white py-2">
            <a
              className="break-words"
              // href="https://na1.orderporter.com/OrderPorter3.2/online.order?passcode=ed158180349b83579acd8970c13b78fd&entrykey=Sell+Accordion+CC+2019"
              target="_blank"
              rel="noopener noreferrer"
            >
              Surveillance Fort Worth
            </a>
          </button>
        </div>
        <div className="flex flex-col">
          <button className="bg-blue-800 text-white py-2">
            <a
              className="break-words"
              // href="https://na1.orderporter.com/OrderPorter3.2/online.order?passcode=a55188892a15bc30d54d9329c94202fb&entrykey=Sell+Accordion+CC+2019"
              target="_blank"
              rel="noopener noreferrer"
            >
              Surveillance Pittston
            </a>
          </button>
        </div>
        <div className="flex flex-col">
          <button className="bg-blue-800 text-white py-2">
            <a
              className="break-words"
              // href="https://na1.orderporter.com/OrderPorter3.2/online.order?passcode=bc05508478bff2ed0e4f4825e2c16ba8&entrykey=Sell+Accordion+CC+2019"
              target="_blank"
              rel="noopener noreferrer"
            >
              Surveillance Monticello
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quotes;

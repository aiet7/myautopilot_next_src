"use client";

import useUiStore from "@/utils/store/ui/uiStore";

const Guide = ({}) => {
  const { openHistory, handleHistoryMenu } = useUiStore();
  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1024) {
          openHistory && handleHistoryMenu(false);
        }
      }}
      className={`${
        openHistory && "lg:opacity-100 opacity-5 xl:ml-[350px]"
      } dark:bg-black w-full h-full overflow-y-auto scrollbar-thin transition-all duration-300 ease-in-out bg-white`}
    >
      <div className="dark:text-white/80 text-black/70 p-4 max-w-[850px] mx-auto">
        <h2 className="dark:text-white text-black text-center text-4xl font-bold mb-4">
          Welcome to the Agents Tab!
        </h2>
        <p className="mb-4">
          Here, you have the power to select industry-specific agents tailored
          to answer your questions and facilitate specific tasks and workflows.
        </p>
        <p className=" mb-4">
          Each agent is a specialist in their domain, ready to help you navigate
          through complex industry nuances. Our agents are at your service to
          provide the most relevant and accurate information.
        </p>
        <p>
          But thats not all! With our advanced features, you can open multiple
          chat threads inside each agent, customizing the conversation to suit
          your individual needs. This personalization ensures you get the most
          out of your interactions.
        </p>
        <div className="mt-6">
          <h3 className="dark:text-white text-black text-3xl font-semibold mb-2">
            Meet Our Agents:
          </h3>
          <div className="dark:text-white/80 text-black/70  text-left">
            <h4 className="text-xl font-bold">Marketing Agent:</h4>
            <p>
              The Marketing Agent is your personal advisor for all your
              marketing needs. This agent is equipped with knowledge on the
              latest market trends, SEO, content marketing, digital advertising,
              and so much more. Whether youre a small business trying to break
              into the market or a seasoned enterprise looking to expand your
              reach, the Marketing Agent is equipped with the strategies and
              tools to give you a competitive edge. The agent can guide you in
              creating impactful campaigns, developing customer personas,
              understanding customer behavior, and leveraging analytics for
              continuous improvement.
            </p>

            <h4 className="text-xl font-bold mt-4">IT Agent:</h4>
            <p>
              The IT Agent is your technological troubleshooter, always ready to
              solve your most pressing IT problems. This agent can help with
              everything from basic computer issues to complex network errors.
              The IT Agent has a deep understanding of both hardware and
              software issues, and can provide guidance on system updates,
              cybersecurity, data management, cloud computing, and more. Whether
              you need assistance setting up new equipment, troubleshooting a
              software glitch, or advice on the best tech solutions for your
              business, the IT Agent is here to help.
            </p>

            <h4 className="text-xl font-bold mt-4">Law Agent:</h4>
            <p>
              The Law Agent is your personal legal advisor, ready to help you
              navigate the complexities of legal procedures. This agent is
              knowledgeable in a wide range of legal fields, from corporate and
              contract law, to civil rights and personal injury law. The Law
              Agent can help you understand the intricacies of contracts, guide
              you through the steps of legal procedures, provide insight into
              recent legal developments and how they may impact you or your
              business, and even assist you in preparing for a court case.
              Please note, while the Law Agent can provide valuable legal
              information, it should not replace the advice of a licensed
              attorney for critical or sensitive matters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;

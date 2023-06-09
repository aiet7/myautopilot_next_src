"use client";

const Intro = ({ activeTab }) => {
  return (
    <div className="px-4 py-2 flex flex-col items-center w-full">
      <h1 className="text-2xl text-center my-9">
        🤖 Welcome to MyAutoPilot: Your Ultimate Voice Assistant for Seamless
        Workflows! 🤖
      </h1>
      <div className="flex flex-col gap-10 max-w-[800px]">
        <div>
          <h2 className="text-xl text-center font-bold sm:text-3xl">
            🚀 Revolutionize Your Workday! 🚀
          </h2>
          <p>
            Picture this: a cutting-edge voice assistant that learns from your
            commands and automates your workflows like never before. Introducing
            MyAutoPilot, the game-changing chatbot application that allows you
            to create skills and automate tasks using just your voice. Say
            goodbye to manual labor and welcome the future of voice-powered
            workflows.
          </p>
        </div>
        <div>
          <h2 className="text-xl text-center font-bold sm:text-3xl">
            🎯 Power of Intents! 🎯
          </h2>
          <p>
            MyAutoPilot is built upon the concept of intents, which are
            predefined actions that the chatbot understands and executes
            flawlessly. With intents like an email or schedule a meeting,
            MyAutoPilot simplifies and streamlines your daily tasks. Combine
            multiple intents to create powerful and efficient workflows tailored
            to your needs.
          </p>
        </div>
        <div>
          <h2 className="text-xl text-center font-bold sm:text-3xl">
            📚 Easy to Learn, Fun to Master! 📚
          </h2>
          <p>
            New to the world of chatbots and voice assistants? Dont
            worry! MyAutoPilot is designed with user-friendliness in mind. Our
            comprehensive tutorials, engaging demos, and helpful community will
            have you up and running in no time. Before you know it, youll
            be creating custom workflows and optimizing your daily routine like
            a pro.
          </p>
        </div>
        <div>
          <h2 className="text-xl text-center font-bold sm:text-3xl">
            🔒 Secure and Private 🔒
          </h2>
          <p>
            We understand the importance of data privacy and security. That
            &apos s why MyAutoPilot is designed with end-to-end encryption,
            ensuring your data stays safe and protected at all times. We
            prioritize your privacy so you can focus on what &apos s important -
            getting things done.
          </p>
        </div>
        <div>
          <h2 className="text-xl text-center font-bold sm:text-3xl">
            🌐 Join the MyAutoPilot Community 🌐
          </h2>
          <p>
            Ready to embark on your journey to productivity and efficiency?
            Connect with other MyAutoPilot users in our thriving community,
            where you can share tips, exchange ideas, and discover new
            possibilities. We cant wait to see what you create with
            MyAutoPilot! So, what are you waiting for? Dive into the world of
            MyAutoPilot and experience the future of voice-powered workflows
            today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;

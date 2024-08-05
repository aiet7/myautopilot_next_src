"use client";

import useBillingStore from "@/utils/store/assistant/sections/external/billing/billingStore";

const Billing = () => {
  const { billingBenefits } = useBillingStore();
  return (
    <div className="flex-grow flex flex-col gap-8 overflow-hidden">
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="flex flex-grow flex-col gap-4">
          <div className="flex flex-col ">
            <p className="dark:text-white/60 text-lg text-black/60">
              Providing a direct payment and accounting
              integration, simplifying your billing process.
            </p>
          </div>
          {billingBenefits.map((benefit, index) => {
            const { title, description } = benefit;
            return (
              <div key={index}>
                <p className="text-lg font-bold">{title}</p>
                <p className="dark:text-white/60 text-black/60">
                  {description}
                </p>
              </div>
            );
          })}
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
      </div>
    </div>
  );
};

export default Billing;

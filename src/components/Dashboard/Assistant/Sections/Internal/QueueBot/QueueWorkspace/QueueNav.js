"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useUserStore from "@/utils/store/user/userStore";
import { MdOutlineQueuePlayNext } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { GrLinkNext } from "react-icons/gr";
import { FaRegSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";

const QueueNav = () => {
  const { user } = useUserStore();
  const {
    editTicket,
    myQueueTicket,
    ticketRequeued,
    ticketClosed,
    setCancelEdit,
    handleSaveTicket,
    handleRequeueTicket,
    handleNextQueueTicket,
    handleEditTicket,
    handleCloseTicket,
  } = useQueueStore();

  return (
    <div className="dark:bg-gray-900 flex flex-wrap bg-white w-full shadow-xl px-4 py-2  gap-4">
      <div
        disabled={editTicket}
        className={`${
          editTicket
            ? "dark:text-white/20 text-gray-200 "
            : "hover:text-blue-500 cursor-pointer"
        } flex items-center gap-1 `}
        onClick={() =>
          handleRequeueTicket(user?.mspCustomDomain, myQueueTicket, user?.id)
        }
      >
        <MdOutlineQueuePlayNext size={20} />

        <span>Requeue</span>
      </div>
      <div
        disabled={editTicket}
        onClick={() =>
          handleCloseTicket(
            user?.mspCustomDomain,
            myQueueTicket?.ticketId,
            user?.id
          )
        }
        className={`${
          editTicket
            ? "dark:text-white/20 text-gray-200 "
            : "hover:text-blue-500 cursor-pointer"
        } flex items-center gap-1 `}
      >
        <FaCheck size={20} />
        <span>Close</span>
      </div>
      <div
        disabled={editTicket || (!ticketRequeued && !ticketClosed)}
        onClick={() =>
          handleNextQueueTicket(
            user?.mspCustomDomain,
            user?.connectWiseTechnicanId,
            user?.id
          )
        }
        className={`${
          editTicket || (!ticketRequeued && !ticketClosed)
            ? "dark:text-white/20 text-gray-200 "
            : "hover:text-blue-500 cursor-pointer"
        } flex items-center gap-1 `}
      >
        <GrLinkNext size={20} />
        <span>Next</span>
      </div>
      <div
        disabled={!editTicket}
        onClick={() =>
          handleSaveTicket(user?.mspCustomDomain, myQueueTicket?.ticketId)
        }
        className={`${
          !editTicket
            ? "dark:text-white/20 text-gray-200 "
            : "hover:text-blue-500 cursor-pointer"
        } flex items-center gap-1 `}
      >
        <FaRegSave size={20} />
        <span>Save</span>
      </div>
      <div
        disabled={editTicket}
        onClick={() => handleEditTicket(user?.mspCustomDomain)}
        className={`${
          editTicket
            ? "dark:text-white/20 text-gray-200 "
            : "hover:text-blue-500 cursor-pointer"
        } flex items-center gap-1 `}
      >
        <MdEdit size={20} />
        <span>Edit</span>
      </div>
      <div
        disabled={!editTicket}
        onClick={setCancelEdit}
        className={`${
          !editTicket
            ? "dark:text-white/20 text-gray-200 "
            : "hover:text-blue-500 cursor-pointer"
        } flex items-center gap-1 `}
      >
        <MdCancel size={20} />
        <span>Cancel</span>
      </div>
    </div>
  );
};

export default QueueNav;

"use client";

import TeamMeetingHistory from "./TeamMeetingHistory";
import TeamInteraction from "./TeamInteraction";

const Teams = ({
  showSummarized,
  connected,
  wsIsPending,
  activeTab,
  teamsHistories,
  currentTeamsIndex,
  openTeamsHistory,
  openTeamsAssistant,
  setTeamsHistories,
  handleConnectToWebSocket,
  handleShowSummarized,
  handleTeamRoomSelected,
  handleCreateNewRoom,
  handleSaveRoom,
  handleOpenTeamsHistory,
  handleOpenTeamsAssistant,
}) => {
  return (
    <div className="flex flex-1 relative overflow-hidden">
      <TeamMeetingHistory
        teamsHistories={teamsHistories}
        currentTeamsIndex={currentTeamsIndex}
        openTeamsHistory={openTeamsHistory}
        setTeamsHistories={setTeamsHistories}
        handleTeamRoomSelected={handleTeamRoomSelected}
        handleCreateNewRoom={handleCreateNewRoom}
        handleSaveRoom={handleSaveRoom}
      />
      <TeamInteraction
        showSummarized={showSummarized}
        connected={connected}
        wsIsPending={wsIsPending}
        activeTab={activeTab}
        teamsHistories={teamsHistories}
        currentTeamsIndex={currentTeamsIndex}
        setTeamsHistories={setTeamsHistories}
        openTeamsAssistant={openTeamsAssistant}
        openTeamsHistory={openTeamsHistory}
        handleConnectToWebSocket={handleConnectToWebSocket}
        handleShowSummarized={handleShowSummarized}
        handleOpenTeamsAssistant={handleOpenTeamsAssistant}
        handleOpenTeamsHistory={handleOpenTeamsHistory}
      />
    </div>
  );
};

export default Teams;

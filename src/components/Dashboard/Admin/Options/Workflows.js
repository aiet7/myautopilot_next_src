// "use client";
// import { useCallback, useState } from "react";

// import useUiStore from "@/utils/store/ui/uiStore";
// import ReactFlow, { addEdge, MiniMap, Controls, Background } from "reactflow";
// import "reactflow/dist/style.css";

// import { useTheme } from "next-themes";

// const Workflows = () => {
//   const { theme } = useTheme();
//   const { openAdmin, handleHistoryMenu } = useUiStore();

//   const initialElements = [
//     {
//       id: "1",
//       type: "input",
//       data: { label: "Node 1" },
//       position: { x: 250, y: 5 },
//     },
//   ];

//   const [elements, setElements] = useState(initialElements);

//   const onConnect = useCallback((params) =>
//     setElements((els) => addEdge(params, els))
//   );

//   return (
//     <div
//       onClick={() => {
//         if (window.innerWidth < 1023) {
//           openAdmin && handleHistoryMenu(false);
//         }
//       }}
//       className={`relative flex flex-col h-full w-full ${
//         openAdmin && "lg:opacity-100 opacity-5 xl:ml-[350px]"
//       }  dark:bg-black transition-all duration-300 ease bg-white`}
//     >
//       <div className="w-full h-full flex flex-col ">
//         <div className="dark:border-b-white/20 border-b p-4">
//           <h1 className="text-2xl">Workflows</h1>
//         </div>

//         <ReactFlow onConnect={onConnect}>
//           <Controls position="bottom-left" />
//           <MiniMap zoomable pannable />
//           <Background color={theme === "dark" ? "white" : "blue"} gap={12} />
//         </ReactFlow>
//       </div>
//     </div>
//   );
// };


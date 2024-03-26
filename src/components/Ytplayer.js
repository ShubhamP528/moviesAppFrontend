// import React, { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";
// import YouTube from "react-youtube";

// const socket = io("http://localhost:8080"); // Adjust this to your server's address

// function Ytplayer() {
//   const [sessionId, setSessionId] = useState("defaultRoom");
//   const [videoId, setVideoId] = useState("B2aHXbnu9dI"); // Sample YouTube video ID
//   const [player, setPlayer] = useState(null);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     const handleStateChange = (event) => {
//       const playerState = event.data;
//       switch (playerState) {
//         case window.YT.PlayerState.PLAYING:
//           playVideo();
//           break;
//         case window.YT.PlayerState.PAUSED:
//           pauseVideo();
//           break;
//         case window.YT.PlayerState.ENDED:
//           // Handle video end if needed
//           break;
//         default:
//           break;
//       }
//     };

//     if (player) {
//       player.addEventListener("onStateChange", handleStateChange);
//     }

//     return () => {
//       if (player) {
//         player.removeEventListener("onStateChange", handleStateChange);
//       }
//     };
//   }, [player, sessionId]);

//   useEffect(() => {
//     socket.emit("joinRoom", { sessionId });

//     socket.on("control", (data) => {
//       if (player) {
//         switch (data.action) {
//           case "play":
//             player.playVideo();
//             break;
//           case "pause":
//             player.pauseVideo();
//             break;
//           case "seek":
//             // Ensure the video is loaded before seeking
//             if (player.getPlayerState() !== -1) {
//               player.seekTo(data.time, true);
//             } else {
//               const checkReady = setInterval(() => {
//                 if (player.getPlayerState() !== -1) {
//                   player.seekTo(data.time, true);
//                   clearInterval(checkReady);
//                 }
//               }, 100);
//             }
//             break;
//           default:
//             console.log("Unknown action");
//         }
//       }

//       // If the received action is "play" or "seek", set the playback position to match the received time
//       if (data.action === "play" || data.action === "seek") {
//         // Check if the player is initialized before accessing its methods
//         if (player) {
//           const currentTime = player.getCurrentTime();
//           const timeDifference = Math.abs(data.time - currentTime);

//           // If the difference between the current time and the received time is significant (e.g., > 1 second),
//           // seek to the received time to synchronize playback
//           if (timeDifference > 1) {
//             player.seekTo(data.time, true);
//           }
//         }
//       }
//     });

//     socket.on("newUserJoined", () => {
//       if (player) {
//         const currentTime = player.getCurrentTime();
//         const state = player.getPlayerState();
//         const action = state === 1 ? "play" : "pause"; // 1 is playing, 2 is paused for YouTube Player
//         console.log(action);

//         // Emit the current state and time
//         socket.emit("currentState", { sessionId, action, time: currentTime });
//       }
//     });

//     // Handle new host notification
//     socket.on("newHost", ({ newHost }) => {
//       console.log(`New host selected: ${newHost}`);
//       // Optionally, update frontend state to reflect the new host
//       // Fetch the current state from the server
//       socket.emit("requestInitialPlaybackTime", { sessionId });
//     });

//     // Handle receiving the current state from the server
//     socket.on("currentState", ({ action, time }) => {
//       console.log(`Received current state: action=${action}, time=${time}`);
//       // Synchronize video player with the received state
//       if (player) {
//         switch (action) {
//           case "play":
//             player.playVideo();
//             break;
//           case "pause":
//             player.pauseVideo();
//             break;
//           case "seek":
//             player.seekTo(time, true);
//             break;
//           default:
//             console.log("Unknown action");
//         }
//       }
//     });

//     return () => {
//       socket.off("control");
//       socket.off("newUserJoined");
//       socket.off("newHost");
//       socket.off("currentState");
//     };
//   }, [sessionId, player]);

//   const onPlayerReady = (event) => {
//     setPlayer(event.target); // Store player instance in state
//     playerRef.current = player;
//   };

//   // Example button handlers
//   const playVideo = () => {
//     const currentTime = player.getCurrentTime();
//     socket.emit("play", { sessionId, time: currentTime });
//   };

//   const pauseVideo = () => {
//     const currentTime = player.getCurrentTime();
//     socket.emit("pause", { sessionId, time: currentTime });
//   };

//   const seekForward = () => {
//     if (!player) return; // Ensure the player is defined
//     const currentTime = player.getCurrentTime(); // Get the current time
//     const newTime = currentTime + 30; // Calculate the new time by adding 30 seconds
//     socket.emit("seek", { sessionId, time: newTime }); // Emit the new seek time
//   };

//   const seekBackward = () => {
//     if (!player) return; // Ensure the player is defined
//     const currentTime = player.getCurrentTime(); // Get the current time
//     const newTime = currentTime - 30; // Calculate the new time by adding 30 seconds
//     socket.emit("seek", { sessionId, time: newTime }); // Emit the new seek time
//   };

//   const opts = {
//     height: "390",
//     width: "640",
//     playerVars: {
//       autoplay: 1, // Enable autoplay
//       mute: 1, // Mute the video
//       rel: 0, // Do not show related videos on video end
//     },
//   };

//   return (
//     <div className="video-wrapper">
//       <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
//       {/* <div className="overlay"></div> */}
//       <div className="flex justify-center gap-4">
//         <button
//           className="border border-spacing-3 p-1 m-1 "
//           onClick={playVideo}
//         >
//           Play
//         </button>
//         <button
//           className="border border-spacing-3 p-1 m-1 "
//           onClick={pauseVideo}
//         >
//           Pause
//         </button>
//         <button
//           className="border border-spacing-3 p-1 m-1 "
//           onClick={() => seekBackward()}
//         >
//           Seek backward to 30s
//         </button>
//         <button
//           className="border border-spacing-3 p-1 m-1 "
//           onClick={() => seekForward()}
//         >
//           Seek forward to 30s
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Ytplayer;

//------------------------------------------------------------------------------

import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";

const socket = io("https://moviesappbackend.onrender.com"); // Adjust this to your server's address

function Ytplayer() {
  const { id, room } = useParams();

  const [sessionId, setSessionId] = useState(room);
  const [videoId, setVideoId] = useState(id); // Sample YouTube video ID
  const [player, setPlayer] = useState(null);
  const [host, setHost] = useState(null); // State to maintain the host
  const playerRef = useRef(null);

  useEffect(() => {
    const handleStateChange = (event) => {
      const playerState = event.data;
      switch (playerState) {
        case window.YT.PlayerState.PLAYING:
          playVideo();
          break;
        case window.YT.PlayerState.PAUSED:
          pauseVideo();
          break;
        case window.YT.PlayerState.ENDED:
          // Handle video end if needed
          break;
        default:
          break;
      }
    };

    if (player) {
      player.addEventListener("onStateChange", handleStateChange);
    }

    return () => {
      if (player) {
        player.removeEventListener("onStateChange", handleStateChange);
      }
    };
  }, [player, sessionId]);

  useEffect(() => {
    socket.emit("joinRoom", { sessionId, videoId }); // Send videoId along with sessionId

    socket.on("control", (data) => {
      if (player) {
        switch (data.action) {
          case "play":
            player.playVideo();
            break;
          case "pause":
            player.pauseVideo();
            break;
          case "seek":
            // Ensure the video is loaded before seeking
            if (player.getPlayerState() !== -1) {
              player.seekTo(data.time, true);
            } else {
              const checkReady = setInterval(() => {
                if (player.getPlayerState() !== -1) {
                  player.seekTo(data.time, true);
                  clearInterval(checkReady);
                }
              }, 100);
            }
            break;
          default:
            console.log("Unknown action");
        }
      }

      // If the received action is "play" or "seek", set the playback position to match the received time
      if (data.action === "play" || data.action === "seek") {
        // Check if the player is initialized before accessing its methods
        if (player) {
          const currentTime = player.getCurrentTime();
          const timeDifference = Math.abs(data.time - currentTime);

          // If the difference between the current time and the received time is significant (e.g., > 1 second),
          // seek to the received time to synchronize playback
          if (timeDifference > 1) {
            player.seekTo(data.time, true);
          }
        }
      }
    });

    socket.on("newUserJoined", () => {
      if (player) {
        const currentTime = player.getCurrentTime();
        const state = player.getPlayerState();
        const action = state === 1 ? "play" : "pause"; // 1 is playing, 2 is paused for YouTube Player
        console.log(action);

        // Emit the current state and time
        socket.emit("currentState", {
          videoId,
          sessionId,
          action,
          time: currentTime,
        });
        videoId;
      }
    });

    // Handle new host notification
    socket.on("newHost", ({ newHost }) => {
      console.log(`New host selected: ${newHost}`);
      setHost(newHost); // Set the new host in state
      // Optionally, update frontend state to reflect the new host
      // Fetch the current state from the server
      socket.emit("requestInitialPlaybackTime", { sessionId });
    });

    // Handle receiving the current state from the server
    socket.on("currentState", ({ action, time }) => {
      console.log(`Received current state: action=${action}, time=${time}`);
      // Synchronize video player with the received state
      if (player) {
        switch (action) {
          case "play":
            player.playVideo();
            break;
          case "pause":
            player.pauseVideo();
            break;
          case "seek":
            player.seekTo(time, true);
            break;
          default:
            console.log("Unknown action");
        }
      }
    });

    return () => {
      socket.off("control");
      socket.off("newUserJoined");
      socket.off("newHost");
      socket.off("currentState");
      socket.off("requestInitialPlaybackTime");
    };
  }, [sessionId, player, videoId]);

  const onPlayerReady = (event) => {
    console.log("Player is ready:", event.target);
    setPlayer(event.target); // Store player instance in state
    playerRef.current = event.target;
  };

  // Example button handlers
  const playVideo = () => {
    const currentTime = player.getCurrentTime();
    socket.emit("play", { sessionId, time: currentTime });
  };

  const pauseVideo = () => {
    const currentTime = player.getCurrentTime();
    socket.emit("pause", { sessionId, time: currentTime });
  };

  const seekForward = () => {
    if (!player) return; // Ensure the player is defined
    const currentTime = player.getCurrentTime(); // Get the current time
    const newTime = currentTime + 30; // Calculate the new time by adding 30 seconds
    socket.emit("seek", { sessionId, time: newTime }); // Emit the new seek time
  };

  const seekBackward = () => {
    if (!player) return; // Ensure the player is defined
    const currentTime = player.getCurrentTime(); // Get the current time
    const newTime = currentTime - 30; // Calculate the new time by adding 30 seconds
    socket.emit("seek", { sessionId, time: newTime }); // Emit the new seek time
  };

  // Frontend code to handle mute/unmute events from YouTube player
  const onPlayerMuteChange = (event) => {
    const isMuted = event.target.isMuted();
    socket.emit("playerMuteChange", { sessionId, isMuted });
  };

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1, // Enable autoplay
      mute: 1, // Mute the video
      rel: 0, // Do not show related videos on video end
    },
  };
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="w-full md:w-2/4 h-96 md:h-full">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          onMute={onPlayerMuteChange}
          onUnmute={onPlayerMuteChange}
          className="w-full h-full"
        />
        <div className="flex justify-center pb-4 md:pb-0">
          <div className="border-t border-gray-300 pt-4">
            <button
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full m-2 md:py-1 md:px-3 md:m-1"
              onClick={playVideo}
            >
              Play
            </button>
            <button
              className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full m-2 md:py-1 md:px-3 md:m-1"
              onClick={pauseVideo}
            >
              Pause
            </button>
            <button
              className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full m-2 md:py-1 md:px-3 md:m-1"
              onClick={() => seekBackward()}
            >
              Seek backward to 30s
            </button>
            <button
              className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full m-2 md:py-1 md:px-3 md:m-1"
              onClick={() => seekForward()}
            >
              Seek forward to 30s
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/4 h-96 md:h-full">
        <img src="" />
        {/* Chat component goes here */}
      </div>
    </div>
  );
}

export default Ytplayer;

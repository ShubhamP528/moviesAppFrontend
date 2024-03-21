import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";

const YouTubeVideoCard = ({ video }) => {
  const navigate = useNavigate();
  const { room } = useAppContext();

  const playHandle = () => {
    console.log("hello");
    navigate(`/video/${video?.id?.videoId}/${room}`);
  };

  return (
    <div
      key={video?.id?.videoId}
      onClick={playHandle}
      className="max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg"
    >
      <img
        className="w-full"
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
      />
      <div className="p-4">
        <div className="font-semibold text-lg truncate">
          {video.snippet.title}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-600">
            {video.snippet.channelTitle}
          </span>
          <span className="text-sm text-gray-600">
            {new Date(video.snippet.publishTime).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideoCard;

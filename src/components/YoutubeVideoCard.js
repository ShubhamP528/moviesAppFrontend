import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";
import { useAuthcontext } from "../Contexts/AuthContext";
import toast from "react-hot-toast";

const YouTubeVideoCard = ({ video }) => {
  const navigate = useNavigate();
  const { TheatorUser } = useAuthcontext();
  const { room } = useAppContext();

  const playHandle = () => {
    if (TheatorUser) {
      navigate(`/video/${video?.id?.videoId}/${room}`);
    } else {
      navigate("/login");
      toast.error("please Login Fisrt");
    }
  };

  return (
    <div
      onClick={playHandle}
      className="max-w-xs mx-auto bg-white rounded-lg cursor-pointer overflow-hidden shadow-md hover:shadow-lg"
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

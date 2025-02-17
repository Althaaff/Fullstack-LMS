import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ width = "100%", height = "100%", url }) => {
  const [playing, setPlaying] = useState(false);

  const [volume, setVolume] = useState(0.5);

  const [muted, setMuted] = useState(false);

  const [played, setPlayed] = useState(0);

  const [seeking, setSeeking] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const [showControls, setShowControls] = useState(true);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeOutRef = useRef(null);

  function handleSeekChange(newValue) {
    setPlayed(newValue[0]); // how much video is played
    setSeeking(true);
    playerRef.current.seekTo(played);
  }

  function handleSeekMouseUp() {}

  function handlePlayAndPause() {
    setPlaying(!playing);
  }

  function handleProgress(state) {
    if (!seeking) {
      setPlayed(state.played); // if not seeking means video is stopped till there played seconds
    }
  }

  function handleRewind() {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 5); // rewinding -5 seconds
  }

  function handleForward() {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
  }

  function handleToggleMute() {
    setMuted(!muted);
  }

  function handleVolumeChange(newValue) {
    setVolume(newValue[0]);
  }

  function pad(string) {
    return ("0" + string).slice(-2);
  }

  // handling video fullscreen :
  const handleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [isFullScreen]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  //
  function handleMouseMove() {
    setShowControls(true);
    clearTimeout(controlsTimeOutRef.current);
    controlsTimeOutRef.current = setTimeout(() => setShowControls(false), 3000);
  }

  function forMatTime(seconds) {
    let date = new Date(seconds * 1000);

    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());

    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`;
    }
    return `${mm}:${ss}`;
  }

  return (
    <div
      ref={playerContainerRef}
      className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out ${
        isFullScreen ? "w-screen h-screen" : ""
      }`}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        with="100%"
        height="100%"
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
      />

      {showControls && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <Slider
            value={[played * 100]}
            max={100}
            step={0.1}
            onValueChange={(value) => handleSeekChange([value[0] / 100])}
            onValueCommit={handleSeekMouseUp}
            className="w-full mb-4"
          />

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white bg-transparent hover:text-primary hover:bg-gray-700"
                onClick={handlePlayAndPause}
              >
                {playing ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white  bg-transparent hover:text-primary hover:bg-gray-700"
                onClick={handleRewind}
              >
                <RotateCcw className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white  bg-transparent hover:text-primary hover:bg-gray-700"
                onClick={handleForward}
              >
                <RotateCw className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white  bg-transparent hover:text-primary hover:bg-gray-700"
                onClick={handleToggleMute}
              >
                {muted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </Button>
              {/* slider for volume */}
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={(value) => handleVolumeChange([value[0] / 100])}
                className="w-24"
              />
              15/15
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-white">
                {forMatTime(played * playerRef?.current?.getDuration() || 0)}{" "}
                <span className="text-gray-600 font-bold">/</span>{" "}
                {forMatTime(playerRef?.current?.getDuration() || 0)}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-white  bg-transparent hover:text-primary hover:bg-gray-700"
                onClick={handleFullScreen}
              >
                {isFullScreen ? (
                  <Minimize className="h-6 w-6" />
                ) : (
                  <Maximize className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

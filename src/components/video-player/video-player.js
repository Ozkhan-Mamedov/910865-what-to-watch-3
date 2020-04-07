import React from "react";
import PropTypes from "prop-types";

import {PreviewPlayerProperty} from "../../constants";

const VideoPlayer = (props) => {
  const {poster, videoRef} = props;

  return (
    <video
      width={PreviewPlayerProperty.WIDTH}
      height={PreviewPlayerProperty.HEIGHT}
      poster={poster}
      ref={videoRef}
    />
  );
};

VideoPlayer.propTypes = {
  poster: PropTypes.string.isRequired,
  videoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ])
};

export default VideoPlayer;

import React from "react";
import PropTypes from "prop-types";

import {PREVIEW_PLAYER_PROPERTIES} from "../../constants";

const VideoPlayer = (props) => {
  const {poster, videoRef} = props;

  return (
    <video
      width={PREVIEW_PLAYER_PROPERTIES.WIDTH}
      height={PREVIEW_PLAYER_PROPERTIES.HEIGHT}
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

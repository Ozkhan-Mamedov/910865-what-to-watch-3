const filmAdapter = (data) => {
  return {
    name: data.name,
    picture: data[`preview_image`],
    previewImage: data[`poster_image`],
    genre: data.genre,
    id: data.id,
    releaseDate: data.released.toString(),
    ratingScore: data[`scores_count`],
    ratingsNumber: data.rating,
    director: data.director,
    starring: data.starring,
    description: data.description,
    preview: data[`preview_video_link`],
    runTime: data[`run_time`],
    videoLink: data[`video_link`],
    isFavorite: data[`is_favorite`],
    backgroundColor: data[`background_color`],
    backgroundImage: data[`background_image`]
  };
};

const commentAdapter = (comment) => {
  return {
    id: comment.id,
    userId: comment.user.id,
    userName: comment.user.name,
    rating: comment.rating,
    date: comment.date,
    comment: comment.comment,
  };
};

export {filmAdapter, commentAdapter};

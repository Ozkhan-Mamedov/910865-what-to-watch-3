import NameSpace from "../name-space";

const NAME_SPACE = NameSpace.APP;

const getGenre = (state) => {
  return state[NAME_SPACE].genre;
};

const getActiveCard = (state) => {
  return state[NAME_SPACE].activeCard;
};

const getCardsRenderNumber = (state) => {
  return state[NAME_SPACE].cardsRenderNumber;
};

const getServerStatus = (state) => {
  return state[NAME_SPACE].isServerAvailable;
};

export {getGenre, getActiveCard, getCardsRenderNumber, getServerStatus};

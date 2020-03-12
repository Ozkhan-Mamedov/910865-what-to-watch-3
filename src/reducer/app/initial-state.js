import {ALL_GENRES, MAX_CARD_RENDER_NUMBER} from "../../constants";

const initialState = {
  genre: ALL_GENRES,
  activeCard: -1,
  cardsRenderNumber: MAX_CARD_RENDER_NUMBER,
  isPlayerActive: false,
  isServerAvailable: true,
  filmsToWatch: [],
};

export default initialState;

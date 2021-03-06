import { LOAD_NOTE, UPDATE_NOTE, CREATE_NOTE } from "./actions";
const initialState = {
   fetching : false,
   fetched: false,
   posts: [],
   error: null,
   displayedNote: null
}

const note = (state = { displayedNote: null }, action) => {
 switch (action.type) {
  case LOAD_NOTE:
   state = Object.assign({}, state, {
      fetching: false, 
          fetched: true,
          posts: action.payload,
          displayedNote: action.payload[0]
      });
   return state;
case CREATE_NOTE:
   let newNote = action.newNote;
   state = Object.assign({}, state, {
    displayedNote: newNote
   });
   return state;
case UPDATE_NOTE:
  state = Object.assign({}, state, {
    displayedNote: action.updated_note
   });
   return state;
default:
   return state;
 }
};
const rootReducer = note;
export default rootReducer;
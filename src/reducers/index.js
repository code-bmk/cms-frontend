import { LOAD_NOTE, UPDATE_NOTE, CREATE_NOTE } from "../actions";

const note = (state = { displayedNote: null }, action) => {
	switch (action.type) {
		case LOAD_NOTE:
		
			state = Object.assign({}, state, {
				displayedNote: action.payload[1] || null
            });
            console.log(state.displayedNote)
			return state;

		case CREATE_NOTE:
			let newNote = action.newNote;
			state = Object.assign({}, state, {
				displayedNote: newNote
			});
			return state;

		case UPDATE_NOTE:
		console.log(state.displayedNote)

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

export const LOAD_NOTE = "LOAD_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const CREATE_NOTE = "CREATE_NOTE";

export function loadNote() {
    let token = localStorage.getItem("token");
	return dispatch => {
		fetch("https://cryptic-escarpment-29124.herokuapp.com/post/getAll")
			.then(response => response.json())
			.then(json => 
				console.log(json),
				dispatch({
					type: LOAD_NOTE,
					payload: json
				})
			);
	};
}

export function createNote(noteContent) {
    console.log("in createNote")
    let token = localStorage.getItem("token");
	debugger
	return dispatch => {
		fetch("https://cryptic-escarpment-29124.herokuapp.com/post/createPost", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
                "Accepts": "application/json",
                "Authorization": "Bearer "+token
			},
			body: JSON.stringify({
                title: "",
                author: "",
                status: "",
                content: noteContent
			})
		})
			.then(response => response.json())
			.then(json => {
				dispatch({
					type: CREATE_NOTE,
					newNote: json
				});
			});
	};
}

export function updateNote(note_id, note_content) {
	console.log(note_id)
	return dispatch => {
		fetch(`http://localhost:3000/api/v1/notes/${note_id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accepts: "application/json"
			},
			body: JSON.stringify({
				content: note_content
			})
		})
			.then(response => response.json())
			.then(json =>
				dispatch({
					type: UPDATE_NOTE,
					updated_note: json
				})
			);
	};
}

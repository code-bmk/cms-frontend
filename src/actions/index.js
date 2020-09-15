export const LOAD_NOTE = "LOAD_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const CREATE_NOTE = "CREATE_NOTE";
export const LOAD_ONE_NOTE = "LOAD_ONE_NOTE";

export function loadNote() {
	return dispatch => {
		fetch("https://infinite-falls-77019.herokuapp.com/post/getAll")
			.then(response => response.json())
			.then(json => 
				dispatch({
					type: LOAD_NOTE,
					payload: json
				})
			);
	};
}

export function loadOneNote(nodeId) {
	return dispatch => {
		fetch("https://infinite-falls-77019.herokuapp.com/post/getOne/" + nodeId)
			.then(response => response.json())
			.then(json => 
				dispatch({
					type: LOAD_ONE_NOTE,
					payload: json
				})
			);
	};
}

export function createNote(note) {
    console.log("in createNote")
    let token = localStorage.getItem("token");
	debugger
	return dispatch => {
		fetch("https://infinite-falls-77019.herokuapp.com/post/createPost", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
                "Accepts": "application/json",
                "Authorization": "Bearer "+token
			},
			body: JSON.stringify({
                title: note.title,
                author: "",
                status: "",
                content: note.content
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
		fetch(`https://infinite-falls-77019.herokuapp.com/posts/updatePost/${note_id}`, {
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

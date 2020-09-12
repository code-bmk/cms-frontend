export const LOAD_NOTE = "LOAD_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const CREATE_NOTE = "CREATE_NOTE";

export function loadNote() {
 return dispatch => {
  fetch("https://infinite-falls-77019.herokuapp.com/post/getAll")
   .then(response => response.json())
   .then(json => dispatch({ type: LOAD_NOTE, payload: json })
 )}
}

export function createNote(noteContent) {
 let token = localStorage.getItem("token");
 console.log(token);
 return dispatch => {
  fetch("https://infinite-falls-77019.herokuapp.com/post/createPost", {
   method: "POST",
   headers: { "Content-Type": "application/json", 
              "Accepts": "application/json" , 
              "Authorization": "Bearer "+token},
   body: JSON.stringify({ 
        title: "",
        author: "",
        status: "",
       content: noteContent })
  })

   .then(response => response.json())
   .then(json => {
    dispatch({ type: CREATE_NOTE, newNote: json })
   })
 }
}

export function updateNote(note_id, note_content) {
 return dispatch => {
  fetch(`https://infinite-falls-77019.herokuapp.com/post/${note_id}/updatePost`, {
   method: "PATCH",
   headers: { "Content-Type": "application/json", Accepts: "application/json" , Authorization: ""},
   body: JSON.stringify({ content: note_content })
  })
   .then(response => response.json())
   .then(json =>
    dispatch({ type: UPDATE_NOTE, updated_note: json })
   );
 };
}
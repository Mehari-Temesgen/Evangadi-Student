import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";
export async function loginUser(creds) {
  try {
    const res = await axios.post("/api/users/login", creds);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Login failed");
  }
}
// create question api
export async function createQuestion(question, token) {
  try {
    const res = await axios.post("/api/questions/onequestion", question, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Question creation failed");
  }
}
export async function getQuestions(token) {
  try {
    const res = await axios.get("/api/questions/allquestion", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Question creation failed");
  }
}
//answer api
export async function createAnswer(answer, token, questionid) {
  try {
    const res = await axios.post(`/api/answer/${questionid}/create`, answer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Answer creation failed");
  }
}
//get answers api
export async function getAnswers(token, questionid) {
  try {
    const res = await axios.get(`/api/answer/${questionid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Answer creation failed !!!");
  }
}
//user profile image upload api
export async function uploadImage(formData, token) {
  try {
    const res = await axios.post("/api/images/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Image upload failed");
  }
}
export async function getAllUserImages(token) {
  try {
    const res = await axios.get("/api/images", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Image upload failed");
  }
}

export async function createAnswerLike(token, answerid) {
  try {
    const res = await axios.post(`/api/likes/answer/${answerid}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "answer like failed");
  }
}
export async function getAnswerLike(token, answerid) {
  try {
    const res = await axios.get(`/api/likes/answer/${answerid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Answer creation failed !!!");
  }
}

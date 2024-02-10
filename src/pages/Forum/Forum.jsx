import React, { useEffect, useState } from "react";
import "./Forum.css";
import PulseLoader from "react-spinners/PulseLoader";
import { AiOutlineComment } from "react-icons/ai";
import moment from "moment";
import { Link, Outlet } from "react-router-dom";
import { getQuestions } from "../../api";
import UserProfile from "../../Components/Userprofile/UserProfile";
const Forum = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [comment, setComment] = useState(null);
  const [commentCount, setCommentCount] = useState({});
  const [commentToggle, setCommentToggle] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      await getQuestions(token)
        .then((data) => {
          setData(data.questions);
          // setSuggests(data.questions);
        })
        .catch((err) => console.log(err));
    };
    // console.log(data);
    fetchData();
  }, [token, commentCount]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleComment = (id) => {
    setComment(id);
    comment === id ? setCommentToggle(!commentToggle) : setCommentToggle(true);
  };
  return (
    <section className="forum">
      <div className="forum-main">
        <div className="forum-header">
          <div className="askq">
            <Link to="askQ">Ask Question</Link>
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="Search for question"
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="forum-body">
          {data.length > 0 ? (
            data?.map((data) => {
              return (
                <div key={data.questionsid} style={{ width: "100%" }}>
                  {data.title.toLowerCase().includes(search) && (
                    <div className="question">
                      <div className="question-header">
                        <div className="question-title">
                          <h4>{data.title}</h4>
                        </div>
                        <div className="question-user">
                          <div className="user-profile">
                            <UserProfile
                              username={data.username}
                              userid={data.userid}
                            />
                          </div>
                          <div className="user-name">
                            <h3>
                              by <span> {data.username}</span>
                            </h3>
                          </div>
                          <div className="created-at">
                            {moment(data.createdAt).fromNow()}
                          </div>
                        </div>
                      </div>
                      <div className="question-body">
                        <p>{data.description}</p>
                      </div>
                      <div className="question-reply">
                        <button
                          onClick={() => handleComment(data.questionsid)}
                          style={{ cursor: "pointer" }}
                        >
                          {data.comment_count > 0 && (
                            <span style={{ margin: "0px 5px" }}>
                              {data.comment_count}
                            </span>
                          )}
                          <AiOutlineComment /> comment
                        </button>
                      </div>
                      {comment === data.questionsid && commentToggle && (
                        <Outlet
                          context={{
                            questionid: data.questionsid,
                            addCommentCount: (commentCount) => {
                              setCommentCount((prev) => ({
                                ...prev,
                                [data.questionsid]: commentCount,
                              }));
                            },
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <PulseLoader className="loading" size={20} color="#36d7b7" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Forum;

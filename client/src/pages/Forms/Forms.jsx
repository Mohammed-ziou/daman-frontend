import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { CircularProgress } from "@material-ui/core";
import { deleteForm, getForms, reset } from "../../redux/docs/docSlice";

import "./forms.css";
import { downloadRes } from "../../redux/response/resSlice";
import { useParams } from "react-router";

function Forms() {
  const [query, setQuery] = useState("");
  const [pN, setPN] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { docs, isLoading, message, isError } = useSelector(
    (state) => state.docs
  );

  // console.log(id);
  const paramss = useParams();

  const handleResponseDownload = (e, docId) => {
    dispatch(downloadRes(docId));
  };

  const handleFormDelete = (e, docId) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to delete this form? all data including all the responses will be deleted, there is no coming back!!!"
      )
    ) {
      dispatch(deleteForm(docId));
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user.token) {
      navigate("/login");
    }
    const querys = { query, pN };
    dispatch(getForms(querys));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message]);

  // const handleSearchClick = () => {

  //   const querys = { query, pN };
  //   dispatch(getForms(querys));
  // };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="container">
      {/* <div className="row search-header">
        <nav className="navbar navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <ul></ul>
          <form className="form-inline my-2 my-lg-0 d-flex">
            <input
              type="query"
              className="form-control mr-sm-2"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </form>
        </nav>
      </div> */}

      <div className="row d-flex justify-content-end my-5 w-100 align-items-center">
        <Link to="/forms/new">
          <button className="btn btn-success w-100">
            <AddIcon />
            New Form
          </button>
        </Link>
      </div>
      <div className="row">
        {docs.length > 0 ? (
          docs.map((doc) => (
            <div className={`col-12 col-sm-6 col-md-4 ${""}`} key={doc._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{doc.title}</h5>
                  <p className="card-text ">{doc.description}</p>
                  <div className="responseCounter">
                    <p>Responses: {doc.response.length}</p>
                  </div>
                  <div className="row">
                    <div className="col-6 px-1">
                      <Link to={`/form/edit/${doc._id}`}>
                        <button className="btn btn-forms btn-primary">
                          Edit
                        </button>
                      </Link>
                    </div>
                    <div className="col-6 px-1">
                      <button
                        className="btn btn-forms btn-danger"
                        onClick={(e) => handleFormDelete(e, doc._id)}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="col-12 px-1">
                      <a
                        href={`http://localhost:5000/api/docs/${doc._id}/download`}
                        target="_blank"
                        className="btn btn-forms btn-success mt-2"
                      >
                        Download Responses
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3>Create your first form</h3>
        )}
      </div>
    </div>
  );
}

export default Forms;

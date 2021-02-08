import React, { useState, useEffect, useMemo } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "../../Participant/Components/saras.css";
import logo from "../../../Assets/images/realizdea.png";
import AOS from "aos";

//readmore
import ReadMoreReact from "read-more-react";

// actions
import { postSearchParticipant } from "../../../reduxthunk/actions/postSearchParticipantActions";
import { postSearchAll } from "../../../reduxthunk/actions/postSearchAllActions";

function Search(props) {
  const dispatch = useDispatch();
  let history = useHistory();

  // search
  const [search, setSearch] = useState("");
  const data = {
    contest: search,
  };
  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(postSearchAll(data, pageActive));
  };
  const dataSearch = useSelector((state) => state.postSearchAll.dataJson);
  const loading = useSelector((state) => state.postSearchAll.loading);
  const totalResult = useSelector((state) => state.postSearchAll.total);
  const totalPages = useSelector((state) => state.postSearchAll.pages);
  console.log(search, "SEARCH");
  console.log(dataSearch, "SEARCH DATA");
  // search ends

  // modal
  const { buttonLabel, className } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  // pagination
  const [pageActive, setPageActive] = useState(1);
  const pageClick = async (page) => {
    await setPageActive(page);
  };
  console.log(pageActive, "PAGE ACTIVE 2");
  const pageNext = () => {
    if (pageActive < totalPages) {
      setPageActive(pageActive + 1);
    }
  };
  console.log(pageActive, "NEXT DILUAR");
  const pagePrev = () => {
    if (pageActive > 1) {
      setPageActive(pageActive - 1);
    }
  };
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  console.log(pages, "ARRAY PAGES");
  console.log(pageActive, typeof pageActive, "PAGES");
  // pagination ends

  // get contest id
  const getContestId = (e) => {
    let contestId = e.currentTarget.id;
    history.push(`/provider/detail/${contestId}`);
  };
  // get contest id ends

  useEffect(() => {
    dispatch(postSearchAll(data, pageActive));
    AOS.init({ duration: 500 });
  }, [pageActive]);

  //Aos animetion
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <>
      <Container style={{ minHeight: "750px" }}>
        <section className="src-parti">
          <form className="formsr" data-aos="fade">
            <div style={{ display: "flex" }}>
              <div className="search-box search-box1">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ marginLeft: "0", width: "377px" }}
                />
              </div>
              <button
                className="btn-btn"
                onClick={submitSearch}
                title="Search Contest"
              >
                Search
              </button>
            </div>
            <Link to="/provider/contest/create" class="btn-a">
              <button className="btn-1" title="Create New Contest">
                Create New Contest
              </button>
            </Link>
          </form>

          {loading ? (
            <div className="loadingLogo">
              <img src={logo} />
            </div>
          ) : (
            <div>
              {dataSearch ? (
                dataSearch.length === 0 ? (
                  <div className="noContest" data-aos="fade">
                    <h2>- No Contest Available -</h2>
                  </div>
                ) : (
                  <div>
                    {dataSearch.map((data) => {
                      return (
                        <div className="content-search" data-aos="fade-right">
                          <div
                            className="content-p"
                            title={`${data.title} Detail Page`}
                            id={data.id}
                            onClick={getContestId}
                          >
                            <div className="image-flex-container">
                              <div className="image-kecil">
                                <img
                                  className="image-kecil"
                                  src={
                                    "https://api.allorigins.win/raw?url=" +
                                    `http://13.228.25.124:3000${data.poster}`
                                  }
                                  onClick={toggle}
                                />
                                {/* <Modal
                                  isOpen={modal}
                                  toggle={toggle}
                                  className={className}
                                >
                                  <ModalHeader toggle={toggle}>
                                    <img
                                      src={
                                        "https://api.allorigins.win/raw?url=" +
                                        `http://13.228.25.124:3000${data.poster}`
                                      }
                                      onClick={toggle}
                                    />
                                  </ModalHeader>
                                </Modal> */}
                              </div>
                              <div className="clicked-div">
                                <div>
                                  <p>
                                    Posted <b>{data.posted}</b> | Due date:{" "}
                                    <b>{data.due_date}</b>
                                  </p>
                                  <h3>{data.title}</h3>
                                  <p>
                                    by <b>{data.user.provider}</b>
                                  </p>
                                  <p>{data.prize}</p>
                                </div>
                                <ReadMoreReact
                                  text={data.description}
                                  min={400}
                                  ideal={450}
                                  max={500}
                                  readMoreText="read more..."
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {totalResult > 5 ? (
                      <div className="pagination">
                        <div className="pageBox" onClick={pagePrev}>
                          <p>
                            <i className="fas fa-chevron-left"></i>
                          </p>
                        </div>
                        <div
                          className="pageBox pageBoxNew"
                          style={{ display: "none", boxShadow: "none" }}
                        >
                          <p style={{ fontSize: "22px" }}>{pageActive}</p>
                        </div>
                        {pages.map((page) => {
                          return (
                            <div
                              className={`pageNumber pageBox ${
                                pageActive === parseInt(page)
                                  ? "pageActive"
                                  : null
                              }`}
                              onClick={(e) => pageClick(page)}
                            >
                              <p>{page}</p>
                            </div>
                          );
                        })}
                        <div className="pageBox" onClick={pageNext}>
                          <p>
                            <i className="fas fa-chevron-right"></i>
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )
              ) : null}
            </div>
          )}
        </section>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({});
  return {
    ...actions,
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

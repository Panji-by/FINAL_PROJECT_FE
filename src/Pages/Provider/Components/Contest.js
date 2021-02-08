import React, { useState, useEffect, useCallback } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import logo from "../../../Assets/images/realizdea.png";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import AOS from "aos";

//readmore
import ReadMoreReact from "read-more-react";

// actions
import { getProviderContest } from "../../../reduxthunk/actions/getProviderContestActions";
import { postSearchProvider } from "../../../reduxthunk/actions/postSearchProviderActions";
import { map } from "jquery";

function Contest(props) {
  const dispatch = useDispatch();
  let history = useHistory();

  // search
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const data = {
    status: status,
    contest: search,
  };
  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(postSearchProvider(data, pageActive));
  };
  const dataSearch = useSelector((state) => state.postSearchProvider.dataJson);
  const loading = useSelector((state) => state.postSearchProvider.loading);
  const totalResult = useSelector((state) => state.postSearchProvider.total);
  const totalPages = useSelector((state) => state.postSearchProvider.pages);
  console.log(search, "SEARCH");
  console.log(dataSearch, "SEARCH DATA");
  console.log(totalResult, totalPages, "TOTAL");
  // search ends

  // modal
  const { buttonLabel, className } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  //Aos scroll animation
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

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
  const getContestId = (e, status) => {
    let contestId = e.currentTarget.id;
    // let status = e.target.getAttribute('value');
    console.log(contestId, status, "YUHUUU");
    if (status === "Open" || status === "Closed") {
      history.push(`/provider/contest/detail/${contestId}`);
    }
    if (status === "Waiting for payment confirmation") {
      history.push(`/provider/contest/waitpayment/${contestId}`);
    }
  };
  // get contest id ends

  useEffect(() => {
    dispatch(postSearchProvider(data, pageActive));
  }, [pageActive]);

  return (
    <>
      <Container className="contestProvider" style={{ minHeight: "750px" }}>
        <section className="prov-cts">
          <form data-aos="fade" className="formsr">
            <div style={{ display: "flex" }}>
              <select
                className="option"
                id="cars"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">-- select a status --</option>
                <option value="1">Open</option>
                <option value="2">Closed</option>
              </select>
              <div className="search-box">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
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
                  <div className="noContest">
                    <h2>- No Created Contest Yet -</h2>
                  </div>
                ) : (
                  <div style={{ marginBottom: "50px" }}>
                    {dataSearch.map((data) => {
                      return (
                        <div
                          data-aos="fade-right"
                          className="content-prov"
                          id={data.id}
                          onClick={(e) => getContestId(e, data.status.status)}
                          value={data.status.status}
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
                                      className="image-search-modal"
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
                          <button
                            className={
                              data.status.status === "Open"
                                ? "buttoniOpen"
                                : data.status.status === "Closed"
                                ? "buttoniClosed"
                                : "buttoniPending"
                            }
                          >
                            {data.status.status === "Open"
                              ? "Open"
                              : data.status.status === "Closed"
                              ? "Closed"
                              : "Pending"}
                          </button>
                        </div>
                      );
                    })}
                    {totalResult > 5 ? (
                      <div data-aos="fade" className="pagination">
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

export default connect(mapStateToProps, mapDispatchToProps)(Contest);

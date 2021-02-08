import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Modal, ModalHeader } from "reactstrap";
import logo from "../../../Assets/images/realizdea.png";
import AOS from "aos";

//read more
import ReadMoreReact from "read-more-react";

// actions
import { getParticipantContest } from "../../../reduxthunk/actions/getParticipantContestActions";
import { postParticipantAchiev } from "../../../reduxthunk/actions/postParticipantAchievAction";

function Contest(props) {
  let history = useHistory();

  const [status, setStatus] = useState("");
  const [contest, setContest] = useState("");
  const [show, setShow] = useState({
    search: true,
    achiev: false,
  });

  const dispatch = useDispatch();
  // data search
  const dataJson = useSelector((state) => state.getParticipantContest.dataJson);
  const loading = useSelector((state) => state.getParticipantContest.loading);
  const totalResult = useSelector((state) => state.getParticipantContest.total);
  const totalPages = useSelector((state) => state.getParticipantContest.pages);
  // data achiev
  const dataAchiev = useSelector(
    (state) => state.postParticipantAchiev.dataJson
  );
  const loadingAchiev = useSelector(
    (state) => state.postParticipantAchiev.loading
  );
  const totalResultAchiev = useSelector(
    (state) => state.postParticipantAchiev.total
  );
  const totalPagesAchiev = useSelector(
    (state) => state.postParticipantAchiev.pages
  );

  const data = { status: status, contest: contest };

  const handleChange = (e) => {
    setContest(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPageActive(1);
    dispatch(getParticipantContest(pageActive, data));
    setShow({
      search: true,
      achiev: false,
    });
  };

  console.log(contest, "conteest");

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

  // pagination achiev
  const [pageActiveAchiev, setPageActiveAchiev] = useState(1);
  const pageClickAchiev = async (page) => {
    await setPageActiveAchiev(page);
  };
  const pageNextAchiev = () => {
    if (pageActiveAchiev < totalPagesAchiev) {
      setPageActiveAchiev(pageActiveAchiev + 1);
    }
  };
  const pagePrevAchiev = () => {
    if (pageActiveAchiev > 1) {
      setPageActiveAchiev(pageActiveAchiev - 1);
    }
  };
  let pagesAchiev = [];
  for (let i = 1; i <= totalPagesAchiev; i++) {
    pagesAchiev.push(i);
  }
  // pagination achiev ends

  // get contest id
  const getContestId = (e) => {
    let contestId = e.currentTarget.id;
    history.push(`/participant/contest/detail/${contestId}`);
  };
  const getContestIdAchiev = (e) => {
    let contestId = e.currentTarget.id;
    history.push(`/participant/contest/winner/${contestId}`);
  };
  // get contest id ends

  // get my achievement
  const handleAchiev = (e) => {
    e.preventDefault();
    dispatch(postParticipantAchiev(pageActiveAchiev));
    setShow({
      search: false,
      achiev: true,
    });
  };
  // get my achievement ends

  useEffect(() => {
    dispatch(getParticipantContest(pageActive, data));
    AOS.init({ duration: 500 });
  }, [pageActive]);

  console.log(dataJson, "Jadii ngaa");
  console.log(dataAchiev, "ACHIEV");
  console.log(show, "LOOK");

  const showData = (dataTotal) => {
    if (dataTotal.length === 0) {
      return (
        <div className="noContest" data-aos="fade">
          {show.search && !show.achiev ? (
            <h2>- No Applied Contest Yet -</h2>
          ) : (
            <h2>- No Achievement Yet -</h2>
          )}
        </div>
      );
    } else {
      return dataTotal.map((data) => {
        return (
          <div
            className="content-prov"
            data-aos="fade-right"
            title={`${data.title} Detail Page`}
            id={data.id}
            onClick={
              show.search && !show.achiev ? getContestId : getContestIdAchiev
            }
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
                {/* <Modal isOpen={modal} toggle={toggle} className={className}>
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
                <p>
                  Posted <b>{data.posted}</b> | Due date: <b>{data.due_date}</b>
                </p>
                <h3>{data.title}</h3>
                <p>
                  by <b>{data.user.provider}</b>
                </p>
                <p>{data.prize}</p>
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
                  : "buttoniWin"
              }
            >
              {data.status.status}
            </button>
          </div>
        );
      });
    }
  };
  const showPage = (total, pageArr, pageState) => {
    if (total > 5) {
      return (
        <div className="pagination" data-aos="fade">
          <div
            className="pageBox"
            onClick={show.search && !show.achiev ? pagePrev : pagePrevAchiev}
          >
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
          {pageArr.map((page) => {
            return (
              <div
                className={`pageNumber pageBox ${
                  pageState === parseInt(page) ? "pageActive" : null
                }`}
                onClick={
                  show.search && !show.achiev
                    ? (e) => pageClick(page)
                    : (e) => pageClickAchiev(page)
                }
              >
                <p>{page}</p>
              </div>
            );
          })}
          <div
            className="pageBox"
            onClick={show.search && !show.achiev ? pageNext : pageNextAchiev}
          >
            <p>
              <i className="fas fa-chevron-right"></i>
            </p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  //Aos animation
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <>
      <Container style={{ minHeight: "750px" }}>
        <section className="parti-cts">
          <form className="formsr" data-aos="fade">
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
                  onChange={handleChange}
                />
              </div>
              <button
                className="btn-btn"
                onClick={handleSubmit}
                title="Search Contest"
              >
                Search
              </button>
            </div>
            <button
              className="btn-2"
              onClick={handleAchiev}
              title="My Achievement Page"
            >
              My Achievement
            </button>
          </form>
          {loading || loadingAchiev ? (
            <div className="loadingLogo">
              <img src={logo} />
            </div>
          ) : (
            <div>
              {show.search && !show.achiev
                ? showData(dataJson)
                : showData(dataAchiev)}
              {show.search && !show.achiev
                ? showPage(totalResult, pages, pageActive)
                : showPage(totalResultAchiev, pagesAchiev, pageActiveAchiev)}
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

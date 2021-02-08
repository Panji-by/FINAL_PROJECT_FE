import React, {useState, useEffect} from 'react';
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import {connect, useSelector, useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container, Row, Col, Spinner,
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import logo from '../../../Assets/images/realizdea.png';
import AOS from 'aos';

// actions
import {getContestDetail} from '../../../reduxthunk/actions/getContestDetailActions';
import {getSubmission} from '../../../reduxthunk/actions/getSubmissionAction';
import {updateClose} from '../../../reduxthunk/actions/updateCloseActions';
import {updateWinner} from '../../../reduxthunk/actions/updateWinnerActions';
import {getWinner} from '../../../reduxthunk/actions/getWinnerActions';


function ContestDetailOpen(props) {

  let {detail} = useParams();
  const dispatch = useDispatch();

  // get detail

  const dataDetail = useSelector(state => state.getContestDetail.dataJson);
  const loadingDetail = useSelector(state => state.getContestDetail.loading);
  const dataSubmission = useSelector(state => state.getSubmission.dataJson);
  const loadingSubmission = useSelector(state => state.getSubmission.loading);
  // console.log(dataDetail, 'DETAIL');
  // console.log(dataSubmission, 'SUBMISSION');

  let submissions = [];
  if(dataSubmission) {
    let temp = [];
    for(let i = 0; i < dataSubmission.length; i++) {
      temp.push(dataSubmission[i].user.participant);
    }
    let nameArr = [];
    let set = new Set(temp);
    for(let item of set) {
        nameArr.push(item);
    }
    for(let i = 0; i < nameArr.length; i++) {
      let temp1 = [];
      for(let x = 0; x < dataSubmission.length; x++) {
          if(nameArr[i] === dataSubmission[x].user.participant) {
              temp1.push(dataSubmission[x])
          }
      }
      submissions.push(temp1);
    }
    // console.log(temp, 'TEMP');
    // console.log(nameArr, 'NAME ARRAY');
    // console.log(submissions, 'SUBMISSIONS FINAL')
  }
  // get detail ends

  // update close
  const closeContest = () => {
    dispatch(updateClose(detail, JSON.parse(atob(localStorage.getItem("token").split(".")[1])).user.id));
  }
  const closed = useSelector(state => state.updateClose.dataJson);
  const loadingClose = useSelector(state => state.updateClose.loading);
  // console.log(closed, 'HMMMM');
  if(closed) {
    window.location.reload();
  }
  // update close ends

  // modal
  const {
    buttonLabel,
    className
  } = props;
  const [modal, setModal] = useState(false);
  const [modalWinner, setModalWinner] = useState(false);
  const [subId,setSubId] = useState(null);
  const [subName, setSubName] = useState('');
  const [subDesc, setSubDesc] = useState('');
  const [subPict, setSubPict] = useState([]);
  const [winnerId, setWinnerId] = useState(null);
  const toggle = (e) => {
    setSubId(e.currentTarget.id);
    for(let i = 0; i < submissions.length; i++) {
      if(e.currentTarget.id === submissions[i][0].user.participant) {
        setSubName(submissions[i][0].user.participant);
        setSubDesc(submissions[i][0].description);
      }
    }
    let temp1 = [];
    let temp2 = [];
    for(let i = 0; i < dataSubmission.length; i++) {
      if(e.currentTarget.id === dataSubmission[i].user.participant) {
        temp1.push(dataSubmission[i]);
        temp2.push(dataSubmission[i].id);
      }
    }
    setSubPict([...temp1]);
    setWinnerId([...temp2]);
    setModal(!modal);
  };
  const toggleWinner = (e) => {
    setModalWinner(!modalWinner);
  };
  // console.log(subId, 'ID SUBMISSION');
  // console.log(subName, 'NAME SUBMISSION');
  // console.log(subDesc, 'DESC SUBMISSION');
  // console.log(subPict, 'PICT SUBMISSION');
  // console.log(winnerId, 'ID WINNER');
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
  const closeBtnWinner = <button className="close" onClick={toggleWinner}>&times;</button>;
  // modal ends

  // carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  // const [winner, setWinner] = useState(null);
  // if(winner1 !== null) {
  //   setWinner(winner1);
  // }
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === subPict.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }
  const previous = () => {
    if (animating) return;
    const prevIndex = activeIndex === 0 ? subPict.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
  }
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }
  const slides = subPict.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.submission}
      >
        <img src={'https://api.allorigins.win/raw?url='+`http://13.228.25.124:3000${item.submission}`} className='carouselImage' />
        {/* <CarouselCaption captionText={item.caption} /> */}
      </CarouselItem>
    );
  });
  // carousel ends

  // update winner
  const [choose, setChoose] = useState(null);
  const dataUpdateWinner = useSelector(state => state.updateWinner.dataJson);
  const loadingUpdateWinner = useSelector(state => state.updateWinner.loading);
  // data get winner
  const dataWinner = useSelector(state => state.getWinner.dataJson);
  const loadingWinner = useSelector(state => state.getWinner.loading);
  const chooseWinner = (e) => {
    console.log(e.currentTarget.id, typeof e.currentTarget.id, 'WIN');
    // dispatch(updateWinner(JSON.parse(atob(localStorage.getItem("token").split(".")[1])).user.id, e.currentTarget.id));
    // toggleWinner();
    e.target.parentElement.lastElementChild.classList.toggle('showConfirm');
    // console.log(e.target.parentElement.lastElementChild, 'LOOK');
    setChoose(e.currentTarget.id);
  }

  if(dataUpdateWinner) {
    window.location.reload();
  }

  const removeShow = (e) => {
    e.target.parentElement.parentElement.classList.toggle('showConfirm');
    console.log(e.target.parentElement.parentElement, 'HMM')
  }
  const yesWinner = (id) => {
    dispatch(updateWinner(JSON.parse(atob(localStorage.getItem("token").split(".")[1])).user.id, id));
  }

  console.log(choose, typeof choose, 'LOOK');
  console.log(dataUpdateWinner, 'DATA UPDATE WINNER');
  console.log(dataWinner, 'DATA WINNER');
  // update winner ends

  useEffect(() => {
    dispatch(getContestDetail(detail));
    dispatch(getSubmission(detail));
    dispatch(getWinner(detail));
    AOS.init({ duration: 500 });
  }, []);
  
  return (
    <div className='providerContestDetail'>
      <Container className='contestDetail' style={{minHeight:'750px'}}>
        {loadingDetail || loadingSubmission || loadingWinner ? (
          <div className="loadingLogo">
            <img src={logo} />
          </div>
        ) : (
          <div>
            <Row data-aos='fade'>
              <Col sm="12" md={{ size: 8, offset: 2 }} className='contestTemplate'>
                <div className='posterContainer'>
                  <div>
                    <a href='#modalPoster'><img src={dataDetail ? 'https://api.allorigins.win/raw?url='+`http://13.228.25.124:3000${dataDetail.poster}` : null} alt='Contest Poster' className='contestPoster' /></a>
                  </div>
                  <div>
                    <h1>{dataDetail? dataDetail.title : null}</h1>
                    <h6>Status: <b>{dataDetail ? dataDetail.status ? dataDetail.status.status : null : null }</b></h6>
                    <h6>Winner Prize: <b>{dataDetail? dataDetail.prize : null}</b></h6>
                    <h6>Due Date: <b>{dataDetail? dataDetail.due_date : null}</b></h6>
                    <h6>Announcement: <b>{dataDetail? dataDetail.announcement : null}</b></h6>
                  </div>
                </div>
                <p>{dataDetail? dataDetail.description : null}</p>
                {dataDetail ? dataDetail.status ? dataDetail.status.status === 'Open' ? <button className='closeButton' onClick={closeContest} disabled={loadingClose ? 'true' : ''} style={{cursor:`${loadingClose ? 'not-allowed' : 'pointer'}`, backgroundColor:`${loadingClose ? '#ff9595' : '#FF6B6B'}`}} title='Close Contest'>{loadingClose ? <Spinner size="sm" color="light" className='spinner'/> :'Close Contest'}</button> : null : null : null}
                {dataWinner ? (
                  <div className='providerWinner' title={`${dataWinner ? dataWinner.user ? dataWinner.user.winner : null : null} Win the Contest`}>
                    <h1>Winner!</h1>
                    <div className='submissionsCardWinner'>
                    <img src={'https://api.allorigins.win/raw?url='+`http://13.228.25.124:3000${dataWinner ? dataWinner.submission : null}`} className='submissionsImage' />
                      <h5>by {dataWinner ? dataWinner.user ? dataWinner.user.winner : null : null}</h5>
                      <p>{dataWinner ? dataWinner.description : null}</p>
                    </div>
                  </div>
                ) : null}
              </Col>
            </Row>
            <Row data-aos='fade'>
              <Col className='submissions'>
                <h1>Submissions</h1>
                <div className='submissionsContainer'>
                  {submissions.map(data => {
                    return (
                      <div className='submissionsCard' id={data[0].user.participant} onClick={toggle} title={`${data[0].user.participant} Submissions`}>
                        <img src={'https://api.allorigins.win/raw?url='+`http://13.228.25.124:3000${data[0].submission}`} className='submissionsImage' />
                        <h5>by {data[0].user.participant}</h5>
                        <p>{data[0].description}</p>
                      </div>
                    );
                  })}
                  {submissions.length === 0 ? <h2 className='noSubmissions'>- No Submissions Yet -</h2> : null}
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Container>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalBody className='modalBody'>
          {closeBtn}
          <div className='modalImage'>
            <Carousel
              activeIndex={activeIndex}
              next={next}
              previous={previous}
              className='modalCarousel'
            >
              <CarouselIndicators items={subPict} activeIndex={activeIndex} onClickHandler={goToIndex} />
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
          </div>
          <h4>by {subName}</h4>
          <p>{subDesc}</p>
        </ModalBody>
        <div className='buttonContainer'>
          {dataDetail ? dataDetail.status ? dataDetail.status.status === 'Closed' && !dataWinner ? <button className='buttonWinner' onClick={toggleWinner} title='Pick a Winner'>Pick a Winner</button> : null : null : null}
        </div>
      </Modal>

      <Modal isOpen={modalWinner} toggle={toggleWinner} className={className}>
        <ModalBody className='modalBody modalBodyWinner'>
          <h3>Choose a Winner !</h3>
          <div className='modalWinner'>
            {subPict.map(data => {
              return (
                <div style={{textAlign:'center', position:'relative'}}>
                  <img src={'https://api.allorigins.win/raw?url='+`http://13.228.25.124:3000${data.submission}`} id={data.id} onClick={chooseWinner} />
                  <div className={`confirmWinner ${choose == data.id ? 'showConfirm' : null}`}>
                    <p>Are you sure?</p>
                    <div style={{display:'flex', justifyContent:'center'}}>
                      <button onClick={() => yesWinner(data.id)} disabled={loadingUpdateWinner ? 'true' : ''} style={{cursor:`${loadingUpdateWinner ? 'not-allowed' : 'pointer'}`}}>
                        {loadingUpdateWinner ? <Spinner size="sm" color="light" className='spinner'/> : 'Yes'}
                      </button>
                      <button onClick={removeShow} disabled={loadingUpdateWinner ? 'true' : ''} style={{cursor:`${loadingUpdateWinner ? 'not-allowed' : 'pointer'}`}}>No</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ModalBody>
      </Modal>

      <div id='modalPoster' className='modalPoster'>
        <a href='#'><i className="fas fa-times-circle"></i></a>
        <img src={dataDetail ? 'https://api.allorigins.win/raw?url='+`http://13.228.25.124:3000${dataDetail.poster}` : null} alt='Contest Poster' className='modalPosterContent' />
      </div>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({});
  return {
    ...actions, dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ContestDetailOpen);
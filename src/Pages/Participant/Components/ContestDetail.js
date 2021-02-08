import React, {useState, useEffect} from 'react';
import { Link, Redirect, useParams } from "react-router-dom";
import {connect, useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Container, Row, Col, Spinner, Button, Modal, ModalBody,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption} from 'reactstrap';
import logo from '../../../Assets/images/realizdea.png';
import AOS from 'aos';

// actions
import {getContestDetail} from '../../../reduxthunk/actions/getContestDetailActions';
import {getSubmission} from '../../../reduxthunk/actions/getSubmissionAction';
import {getJsonProfile} from '../../../reduxthunk/actions/getProfile';

function ContestDetail(props) {

  let {detail} = useParams();
  const dispatch = useDispatch();

  // get detail
  const dataDetail = useSelector(state => state.getContestDetail.dataJson);
  const loadingDetail = useSelector(state => state.getContestDetail.loading);
  const dataSubmission = useSelector(state => state.getSubmission.dataJson);
  const loadingSubmission = useSelector(state => state.getSubmission.loading);
  console.log(dataDetail, 'DETAIL');
  console.log(dataSubmission, 'SUBMISSION');

  let submissions = [];
  let nameArr = [];
  if(dataSubmission) {
    let temp = [];
    for(let i = 0; i < dataSubmission.length; i++) {
      temp.push(dataSubmission[i].user.participant);
    }
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
    console.log(nameArr, 'NAME ARRAY');
    console.log(submissions, 'SUBMISSIONS FINAL')
  }


  useEffect(() => {
    dispatch(getContestDetail(detail));
    dispatch(getSubmission(detail));
    dispatch(getJsonProfile());
    AOS.init({ duration: 500 });
  }, []);
  // get detail ends

  // check winner
  let isSubmitted = false;
  const dataProfile = useSelector((state) => state.getProfile.dataJson);
  let fullname;
  if(dataProfile) {
    fullname = `${dataProfile.firstname} ${dataProfile.lastname}`
  }
  for(let i = 0; i < nameArr.length; i++) {
    if(fullname === nameArr[i]) {
      isSubmitted = true;
    }
  }
  // check winner ends

  // modal
  const {
    buttonLabel,
    className
  } = props;
  const [modal, setModal] = useState(false);
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
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
  // modal ends

  // carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
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

  // console.log(isSubmitted, 'UDAH SUBMIT');
  // console.log(dataProfile, 'DATA');
  // console.log(fullname, 'FULLNAME');
  // console.log('TOKEN JWT', JSON.parse(atob(localStorage.getItem("token").split(".")[1])).user);
  console.log('DETAIL CONTEST', dataDetail);

  return (
    <div>
      <Container className='contestDetail' style={{minHeight:'750px'}}>
        {loadingDetail || loadingSubmission ? (
          <div className="loadingLogo">
            <img src={logo} />
          </div>
        ) : (
          <div>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }} className='contestTemplate' data-aos='fade'>
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
                {!isSubmitted ? <Link to={`/participant/contest/submissions/${detail}`}><button color="success">Submit your work</button></Link> : null}
              </Col>
            </Row>
            <Row>
              <Col className='submissions' data-aos='fade'>
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
        <ModalBody className='modalBody' style={{paddingBottom:'20px'}}>
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
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous}/>
              <CarouselControl direction="next" directionText="Next" onClickHandler={next}/>
            </Carousel>
          </div>
          <h4>by {subName}</h4>
          <p>{subDesc}</p>
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

export default connect(mapStateToProps, mapDispatchToProps) (ContestDetail);
import react, { useState, useEffect } from 'react';
import Navbar from './header';
import { Link, Redirect, useHistory } from "react-router-dom";
import { Form, FormGroup, Input, Button } from 'reactstrap';
import '../../Assets/styles/landing-Page.scss';
import AOS from "aos"

// images
import img1 from '../../Assets/images/what.svg';
import img2 from '../../Assets/images/role.svg';
import img3 from '../../Assets/images/provider.svg';
import img4 from '../../Assets/images/participant.svg';
import create from '../../Assets/images/edit.png';
import apply from '../../Assets/images/camera.png';
import collect from '../../Assets/images/folder.png';
import wait from '../../Assets/images/promotion.png';
import winner from '../../Assets/images/win.png';
import prize from '../../Assets/images/trophy.png';

// actions
import {postSearchAll} from '../../reduxthunk/actions/postSearchAllActions';
import { useDispatch } from 'react-redux';

function LandingPage() {

  const [search, setSearch] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const submit = (e) => {
    e.preventDefault();
    dispatch(postSearchAll({contest: search}, 1));
    history.push(`/search/${search}`);
  }

  // role
  const [expand, setExpand] = useState({
    expand1: false,
    expand2: false
  })
  const showRole = e => {
    // e.target.parentElement.parentElement.lastElementChild.classList.toggle('showRole');
    // console.log(e.target.parentElement)
    setExpand({
      ...expand,
      [e.currentTarget.id]: !expand[e.currentTarget.id]
    });
    // console.log(e.currentTarget.id, 'LOOK')
  }
  console.log(expand, 'EXPAND');

  const [offset, setOffset] = useState(0);

  //Aos scroll animation
  useEffect(() => {
    AOS.init({ duration: 500 });
    window.onscroll = () => {
      setOffset(window.pageYOffset)
    }
  }, []);

  console.log(offset, 'LOOK')

  return (
   <>
    <div className="landing-parent">
      <div data-aos="fade-right" className="row ">
        <div className="landing-center col-lg-6">
          <h1>Find the perfect contest for you</h1>
          <p className='landingDesc' style={{padding:'0', fontWeight:'400', fontSize:'16px'}}>We are entering a new digital era where business are growing in an enormous rates. The appearance of new business/company at the rate of second has skyrocketed the demand of new, creative, and representing logo.</p>
          <div className="input-group mb-3">
            <form onSubmit={submit}>
              <Input style={{width:'300px'}} type="text" className="form-control" placeholder="Find design contest" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={e => setSearch(e.target.value)} />
              <button className='searchIcon'><i className="fas fa-search" title='Search Contest'></i></button>
            </form>
            <p>or</p>
            <div className="input-group-append">
              <Link to='/signin'><Button className="btn btn-outline-secondary smallBtn" type="submit" title='Create Contest'>Create Contest</Button></Link>
            </div>
          </div>
        </div>
        <div data-aos="fade-left" className="col-lg-6">
          {/* <img classname="favourite-image" src={Img} alt="achieving goal" /> */}
        </div>
      </div>
    </div>
    <div className='landingWhat'>
      <div className='imageContainer'>
        <img src={img1} />
      </div>
      <div className='descContainer'>
        <h1>What is RealizDea?</h1>
        <h4>RealizDea is an online design/creative platform where you can realize your design/idea.</h4>
        <p>Our main goal is to connect people who are having trouble finding customize design to their desires and people who are looking for a creative platform to channel their creativity. By Doing so, we are creating a win-win solution for both sides and realizing many and many more of design ideas.</p>
      </div>
    </div>
    <div className='landingRole'>
      <div className='roleDesc'>
        <h1>Choose Your Role ...</h1>
        <div className='roleContainer'>
          <div className='roleProvider'>
            <div className='roleTitle' id='expand1' onClick={showRole}>
              <h5><i className={`fas fa-chevron-right ${expand.expand1 ? 'rotate' : null}`}></i>Provider</h5>
            </div>
            <div className={`roleDesc ${expand.expand1 ? 'showRole' : null}`}>
              <p>You can create contest and communicate your ideas through the contest's title and description and wait for participants to submit their design based on your ideas.</p>
            </div>
          </div>
          <div className='roleParticipant'>
            <div className='roleTitle' id='expand2' onClick={showRole}>
              <h5><i className={`fas fa-chevron-right ${expand.expand2 ? 'rotate' : null}`}></i>Participant</h5>
            </div>
            <div className={`roleDesc ${expand.expand2 ? 'showRole' : null}`}>
              <p>You can search for contest that are align with your design idea and participate by submitting 1-5 of your design before the contest due date.</p>
            </div>
          </div>
        </div>
      </div>
      <div className='roleImage'>
        <img src={img2} />
      </div>
    </div>
    <div className='landingHow'>
      <h1>How We Can Help You?</h1>
      <div className='howContainer'>
        <div className='howPanel'>
          <img src={img3} />
          <h5>Having trouble finding custom design with a minimal cost ?</h5>
          <p>Register as a "Provider" and checkout the opportunity we can provide to you.</p>
        </div>
        <div className='howPanel'>
          <img src={img4} />
          <h5>Looking for platform to channel your creativity ?</h5>
          <p>Register as a "Participant" and checkout the opportunity we can provide to you.</p>
        </div>
      </div>
    </div>
    <div className='landingWork'>
      <h1>How Does It Work ?</h1>
      <div className='workContainer'>
        <div className='workFarOuter' style={{padding:'120px 0 0'}}>
          <div className='workContent' style={offset > 1530 ? {animation:'slideDown 0.5s 3.5s forwards'} : null}>
            <h5>Apply Contest</h5>
            <p>Participant apply for contest and submit their best design</p>
          </div>
          <div className='workContent' style={offset > 1530 ? {animation:'slideDown 0.5s 8s forwards'} : null}>
            <h5>Wait Announcement</h5>
            <p>Wait till the contest winner to be announced on the designated date</p>
          </div>
          <div className='workContent' style={{margin:'0', animation:`${offset > 1530 ?'slideDown 0.5s 12.5s forwards' : null}`}}>
            <h5 style={{paddingTop:'17px'}}>Get the Prize</h5>
            <p>Contest winner will get the contest prize</p>
          </div>
        </div>
        <div className='workOuter' style={{padding:'120px 0 0'}}>
          <div className='circle' style={offset > 1530 ? {animation:'fadeIn 0.5s 2.75s forwards'} : null}>
            <img src={apply} style={offset > 1530 ? {animation:'zoomIn 0.25s 3.25s forwards'} : null}/>
          </div>
          <div className='circle' style={offset > 1530 ? {animation:'fadeIn 0.5s 7.25s forwards'} : null}>
            <img src={wait} style={offset > 1530 ? {animation:'zoomIn 0.25s 7.75s forwards'} : null}/>
          </div>
          <div className='circle' style={{margin:'0', animation:`${offset > 1530 ? 'fadeIn 0.5s 11.75s forwards' : null}`}}>
            <img src={prize} style={offset > 1530 ? {animation:'zoomIn 0.25s 12.25s forwards'} : null}/>
          </div>
        </div>
        <div className='workMiddleSide'>
          <div className='workDot'></div>
          <div className='workLine'></div>
          <div className='workDot' style={{padding:'0 5px'}}>
            <div className='lineLeftUp' style={{float:'right', animation:`${offset > 1530 ? 'lineSide 0.25s 2.5s forwards' : null}`}}></div>
            <div className='lineLeftDown'></div>
          </div>
          <div className='workLine'></div>
          <div className='workDot'></div>
          <div className='workLine'></div>
          <div className='workDot' style={{padding:'0 5px'}}>
            <div className='lineLeftUp' style={{float:'right', animation:`${offset > 1530 ? 'lineSide 0.25s 7s forwards' : null}`}}></div>
            <div className='lineLeftDown'></div>
          </div>
          <div className='workLine'></div>
          <div className='workDot'></div>
          <div className='workLine'></div>
          <div className='workDot' style={{padding:'0 5px'}}>
            <div className='lineLeftUp' style={{float:'right', animation:`${offset > 1530 ? 'lineSide 0.25s 11.5s forwards' : null}`}}></div>
            <div className='lineLeftDown'></div>
          </div>
        </div>
        <div className='workMiddle'>
          <div className='workDot'>
            <div className='dot' style={offset > 1530 ? {animation:'zoomIn 0.25s forwards'} : null}></div>
          </div>
          <div className='workLine'>
            <div className='lineMiddleLeft' style={offset > 1530 ? {animation:'lineMiddle 0.5s 1.75s forwards'} : null}></div>
            <div className='lineMiddleRight' style={offset > 1530 ? {animation:'lineMiddle 0.5s 1.75s forwards'} : null}></div>
          </div>
          <div className='workDot'>
            <div className='dot' style={offset > 1530 ? {animation:'zoomIn 0.25s 2.25s forwards'} : null}></div>
          </div>
          <div className='workLine'>
            <div className='lineMiddleLeft' style={offset > 1530 ? {animation:'lineMiddle 0.5s 4s forwards'} : null}></div>
            <div className='lineMiddleRight' style={offset > 1530 ? {animation:'lineMiddle 0.5s 4s forwards'} : null}></div>
          </div>
          <div className='workDot'>
            <div className='dot' style={offset > 1530 ? {animation:'zoomIn 0.25s 4.5s forwards'} : null}></div>
          </div>
          <div className='workLine'>
            <div className='lineMiddleLeft' style={offset > 1530 ? {animation:'lineMiddle 0.5s 6.25s forwards'} : null}></div>
            <div className='lineMiddleRight' style={offset > 1530 ? {animation:'lineMiddle 0.5s 6.25s forwards'} : null}></div>
          </div>
          <div className='workDot'>
            <div className='dot' style={offset > 1530 ? {animation:'zoomIn 0.25s 6.75s forwards'} : null}></div>
          </div>
          <div className='workLine'>
            <div className='lineMiddleLeft' style={offset > 1530 ? {animation:'lineMiddle 0.5s 8.5s forwards'} : null}></div>
            <div className='lineMiddleRight' style={offset > 1530 ? {animation:'lineMiddle 0.5s 8.5s forwards'} : null}></div>
          </div>
          <div className='workDot'>
            <div className='dot' style={offset > 1530 ? {animation:'zoomIn 0.25s 9s forwards'} : null}></div>
          </div>
          <div className='workLine'>
            <div className='lineMiddleLeft' style={offset > 1530 ? {animation:'lineMiddle 0.5s 10.75s forwards'} : null}></div>
            <div className='lineMiddleRight' style={offset > 1530 ? {animation:'lineMiddle 0.5s 10.75s forwards'} : null}></div>
          </div>
          <div className='workDot'>
            <div className='dot' style={offset > 1530 ? {animation:'zoomIn 0.25s 11.25s forwards'} : null}></div>
          </div>
        </div>
        <div className='workMiddleSide'>
          <div className='workDot' style={{padding:'0 5px'}}>
            <div className='lineLeftUp' style={offset > 1530 ? {animation:'lineSide 0.25s 0.25s forwards'} : null}></div>
            <div className='lineLeftDown'></div>
          </div>
          <div className='workLine'></div>
          <div className='workDot'></div>
          <div className='workLine'></div>
          <div className='workDot' style={{padding:'0 5px'}}>
            <div className='lineLeftUp' style={offset > 1530 ? {animation:'lineSide 0.25s 4.75s forwards'} : null}></div>
            <div className='lineLeftDown'></div>
          </div>
          <div className='workLine'></div>
          <div className='workDot'></div>
          <div className='workLine'></div>
          <div className='workDot' style={{padding:'0 5px'}}>
            <div className='lineLeftUp' style={offset > 1530 ? {animation:'lineSide 0.25s 9.25s forwards'} : null}></div>
            <div className='lineLeftDown'></div>
          </div>
          <div className='workLine'></div>
          <div className='workDot'></div>
        </div>
        <div className='workOuter'>
          <div className='circle' style={offset > 1530 ? {animation:'fadeIn 0.5s 0.5s forwards'} : null}>
            <img src={create} style={offset > 1530 ? {animation:'zoomIn 0.25s 1s forwards'} : null}/>
          </div>
          <div className='circle' style={offset > 1530 ? {animation:'fadeIn 0.5s 5s forwards'} : null}>
            <img src={collect} style={offset > 1530 ? {animation:'zoomIn 0.25s 5.5s forwards'} : null}/>
          </div>
          <div className='circle' style={offset > 1530 ? {animation:'fadeIn 0.5s 9.5s forwards'} : null}>
            <img src={winner} style={offset > 1530 ? {animation:'zoomIn 0.25s 10s forwards'} : null}/>
          </div>
        </div>
        <div className='workFarOuter' style={{textAlign:'left'}}>
          <div className='workContent' style={offset > 1530 ? {animation:'slideDown 0.5s 1.25s forwards'} : null}>
            <h5>Create Contest</h5>
            <p>Provider creates a contest and completes all the requirements</p>
          </div>
          <div className='workContent' style={offset > 1530 ? {animation:'slideDown 0.5s 5.75s forwards'} : null}>
            <h5>Collect Design</h5>
            <p>Provider will collect all design that has been submitted by participant</p>
          </div>
          <div className='workContent' style={{margin:'0', animation:`${offset > 1530 ? 'slideDown 0.5s 10.25s forwards' : null}`}}>
            <h5>Pick Winner</h5>
            <p>Provider close the contest and pick the winner</p>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default LandingPage;

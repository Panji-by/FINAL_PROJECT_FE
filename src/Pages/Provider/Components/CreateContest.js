import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Container,
  Col,
  Row,
  Spinner,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import AOS from 'aos';

// actions
import { postCreateContest } from "../../../reduxthunk/actions/postCreateContest";
import { useDispatch, useSelector } from "react-redux";

function CreateContest(props) {
  const dispatch = useDispatch();
  let history = useHistory();

  const [input, setInput] = useState({
    due_date: null,
    prize: null,
    title: "",
    announcement: "",
    description: "",
    poster: null,
  });

  const handleChange = (name, value) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handlePoster = (e) => {
    setInput({
      ...input,
      poster: e.target.files[0]
    })
  }
 

  const submit = (e) => {
    e.preventDefault();
   let formData = new FormData();
   formData.append('due_date' ,input.due_date)
   formData.append('prize' ,input.prize)
   formData.append('title' ,input.title)
   formData.append('announcement' ,input.announcement)
   formData.append('description' ,input.description)
   formData.append('poster' ,input.poster)
  



    // console.log(data);
    dispatch(
      postCreateContest(
        formData,
        JSON.parse(atob(localStorage.getItem("token").split(".")[1])).user.id
      )
    );
  };

  const dataCreate = useSelector(state => state.postCreateContest.dataJson);
  const errors = useSelector((state) => state.postCreateContest.error);
  const loading = useSelector(state => state.postCreateContest.loading);
  console.log(dataCreate ? dataCreate : null, 'WKWK');
  if(dataCreate) {
    history.push(`/provider/contest/waitpayment/${dataCreate.id}`);
  }

  let errorTitle, errorPrize, errorDue_date, errorAnnouncement, errorDescription;
  if(errors) {
    if(errors.title) {
      errorTitle = errors.title.msg;
    }
    if(errors.prize) {
      errorPrize = errors.prize.msg;
    }
    if(errors.due_date) {
      errorDue_date = errors.due_date.msg;
    }
    if(errors.announcement) {
      errorAnnouncement = errors.announcement.msg;
    }
    if(errors.description) {
      errorDescription = errors.description.msg;
    }
  }

  // error date
  let date1, date2;
  if(input.due_date) {
    let arr = input.due_date.split('-');
    date1 = parseInt(arr[0]) * 365 + parseInt(arr[1]) * 30 + parseInt(arr[2]); 
  }
  if(input.announcement) {
    let arr = input.announcement.split('-');
    date2 = parseInt(arr[0]) * 365 + parseInt(arr[1]) * 30 + parseInt(arr[2]);
  }
  console.log(input.due_date, 'DUE DATE');
  console.log(date1, 'RESULT 1');
  console.log(input.announcement, 'ANNOUNCEMENT');
  console.log(date2, 'RESULT 2');
  // error date ends

  //Aos scroll animation
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <>
      <Container className="formTemplate" style={{minHeight:'750px'}} data-aos='fade' >
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <h1>Create Contest</h1>
            <form>
              <div className="inputContainer">
                <div>
                  <label for="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Contest Title"
                    onChange={(e) => handleChange("title", e.target.value)}
                    className={errorTitle ? 'errorInput' : null}
                  />
                  <p className="errorText errorCreate">{errorTitle}</p>
                </div>
                <div>
                  <label for="prize">Prize</label>
                  <input
                    type="number"
                    id="prize"
                    name="prize"
                    placeholder="5000000"
                    onChange={(e) => handleChange("prize", e.target.value)}
                    className={errorPrize ? 'errorInput' : null}
                  />
                  <p className="errorText errorCreate">{errorPrize}</p>
                </div>
                <div>
                  {" "}
                  <label for="date">Due Date</label>
                  <input
                    type="date"
                    id="date"
                    name="due_date"
                    placeholder="YYYY-MM-DD"
                    onChange={(e) => handleChange("due_date", e.target.value)}
                    className={errorDue_date ? 'errorInput' : null}
                  />
                  <p className="errorText errorCreate">{errorDue_date}</p>
                </div>
                <div>
                  <label for="announcement">Announcement</label>
                  <input
                    type="date"
                    id="announcement"
                    name="announcement"
                    placeholder="YYYY-MM-DD"
                    onChange={(e) =>
                      handleChange("announcement", e.target.value)
                    }
                    className={errorAnnouncement || date2 <= date1 ? 'errorInput' : null}
                  />
                  <p className="errorText errorCreate">{date1 && date2 && date2 <= date1 ? 'Announcement date must be later than due date' : errorAnnouncement ? errorAnnouncement : null}</p>
                </div>
                <div className="photo">
                  <label for="poster">Poster</label>
                  <input
                    type="file"
                    id="poster"
                    name="poster"
                    placeholder="poster"
                onChange= {handlePoster} 
                    className={errorAnnouncement ? 'errorInput' : null}
                  />
                  <p className="errorText errorCreate">{errorAnnouncement}</p>
                </div>
                <div className="description">
                  <label for="desc">Description</label>
                  <textarea
                    id="desc"
                    name="desc"
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    className={errorDescription ? 'errorInput' : null}
                  />
                  <p className="errorText">{errorDescription}</p>
                </div>
              </div>
                <button className="button createButton" onClick={submit} disabled={loading ? 'true' : ''} style={{cursor:`${loading ? 'not-allowed' : 'pointer'}`, backgroundColor:`${loading ? '#A8CC74' : '#8FBD4B'}`}} title='Create Contest'>
                  {loading ? <Spinner size="sm" color="light" className='spinner'/> : 'Create'}
                </button>
            </form>
          </Col>
        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateContest);

import React, {useState, useEffect} from 'react';
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import {connect, useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Container, Row, Col, Spinner, Button} from 'reactstrap';
import AOS from 'aos';

// actions
import {postSubmission} from '../../../reduxthunk/actions/postSubmission';

function ContestSubmissions(props) {

  const dispatch = useDispatch();
  let history = useHistory();
  let {submissions} = useParams();
  const [desc, setDesc] = useState('');
  const [pic, setPic] = useState(null);
  const handlePicture = (e) => {
    const obj = e.target.files;
    let files = [];
    for(let i in obj) {
      if(i < e.target.files.length) {
        files.push(obj[i]);
      }
    }
    setPic(files);
  };
  console.log('PICTURE', pic);
  const dataSubmission = useSelector(state => state.postSubmission.dataJson);
  const error = useSelector(state => state.postSubmission.error);
  const loading = useSelector(state => state.postSubmission.loading);
  const submit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if(pic !== [] && pic !== null) {
      pic.map(file => formData.append("image", file));
    }
    formData.append("description", desc);
    console.log(formData, 'BODY');
    dispatch(postSubmission(submissions, JSON.parse(atob(localStorage.getItem("token").split(".")[1])).user.id, formData));
  }
  if(dataSubmission) {
    history.push(`/provider/contest/detail/${submissions}`);
  }

  let errorDesc, errorImage;
  if(error) {
    if(error.description) {
      errorDesc = error.description.msg;
    }
    if(error.images) {
      errorImage = error.images.msg
    }
  }
  console.log('ERROR', error);

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  console.log(pic, 'GAMBAR');
  console.log(pic ? pic[0] : null, 'GAMBAR ke 0');
  console.log(pic ? pic[0].name : null, 'GAMBAR ke 0');

  return (
    <div>
      <Container className='contestSubmissions' style={{minHeight:'750px'}} data-aos='fade'>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <form>
              <div className='inputContainer' title='Upload Files'>
                <label for='input'>UPLOAD</label>
                <input type='file' name='pic1' id='input' onChange={handlePicture} multiple/>
                <div className={`inputDisplay ${pic ? pic.length > 5 || errorImage ? 'errorInput' : null : null}`}>
                  <h5 style={{marginTop:'40px', marginBottom:'50px'}}>Upload your files</h5>
                  {/* <h5>or</h5>
                  <h5>Drag & Drop your file</h5> */}
                  <div className='inputBoxes1'>
                    <div className='box1'>
                      <p>{pic ? pic[0] ? pic[0].name : null : null}</p>
                    </div>
                    <div className='box1'>
                      <p>{pic ? pic[1] ? pic[1].name : null : null}</p>
                    </div>
                    <div className='box1'>
                      <p>{pic ? pic[2] ? pic[2].name : null : null}</p>
                    </div>
                    <div className='box1'>
                      <p>{pic ? pic[3] ? pic[3].name : null : null}</p>
                    </div>
                    <div className='box1'>
                      <p>{pic ? pic[4] ? pic[4].name : null : null}</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className='errorText'>{pic ? pic.length > 5 ? `You selected ${pic.length} files, you are allowed only to upload maximum 5 files.` : errorImage ? errorImage : null : null}</p>
              <p style={{fontWeight:'300'}}>Only upload files with format jpg, jpeg, png, or pdf; maximum upload is 5 files with maximum size of 10MB.</p>
              <label for='desc' style={{marginTop:'20px'}}>Description</label>
              <textarea id='desc' name='desc' value={desc} onChange={e => setDesc(e.target.value)} className={errorDesc ? 'errorInput' : null}/>
              <p className='errorText'>{errorDesc ? errorDesc : null}</p>
              <button type='submit' onClick={submit} className='button' disabled={loading ? 'true' : ''} style={{cursor:`${loading ? 'not-allowed' : 'pointer'}`, backgroundColor:`${loading ? '#A8CC74' : '#8FBD4B'}`}} title='Submit your Submissions'>
                {loading ? <Spinner size="sm" color="light" /> : 'Submit'}
              </button>
            </form>
          </Col>
        </Row>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps) (ContestSubmissions);
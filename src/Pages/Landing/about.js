import React, { useEffect } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FavImg from "../../AssetsSaras/orang.jpg";
import Img from "../../Assets/images/landing.svg";
import AOS from "aos";
import Panji from "../../Assets/images/member/Panji.jpg";
import Zuhry from "../../Assets/images/member/Zuhry.jpg";
import Saras from "../../Assets/images/member/Saras.jpg";
import Wawan from "../../Assets/images/member/wawan.jpeg";
import Seli from "../../Assets/images/member/Seli.jpg";
import Tommy from "../../Assets/images/member/Tommy.jpg";
import Arwin from "../../Assets/images/member/Arwin.png";
import Yohanes from "../../Assets/images/member/Yohan.png";
import Angel from "../../Assets/images/member/mbakAngel.png"


const member = [
  {
    name: "Panji Bayu",
    image: Panji,
    stack: "Front-End Developer",
    Linkedin: "https://www.linkedin.com/in/panji-bayu-prasena/",
  },
  {
    name: "Zuhry Abdi Rahmani",
    image: Zuhry,
    stack: "Front-End Developer",
    Linkedin: "https://www.linkedin.com/in/zuhryabdirahmani/",
  },
  {
    name: "Dewi Saraswati",
    image: Saras,
    stack: "Front-End Developer",
    Linkedin: "https://www.linkedin.com/in/dewi-saraswati-2b31091a1/",
  },
  {
    name: "Wawan",
    image: Wawan,
    stack: "Back-End Developer",
    Linkedin: "https://www.linkedin.com/in/wawan-setiawan-fr/",
  },
  {
    name: "Seli Rosriana",
    image: Seli,
    stack: "Back-End Developer",
    Linkedin: "https://www.linkedin.com/in/selirosriana/",
  },
  {
    name: "Tommy Asni",
    image: Tommy,
    stack: "Back-End Developer",
    Linkedin: "https://www.linkedin.com/in/tommy-asni/",
  },
  {
    name: "Yohanes Anom",
    image: Yohanes,
    stack: "React Native Developer",
    Linkedin: "https://www.linkedin.com/in/yohanes-pratitis-980205a5/",
  },
  {
    name: "Arwinsyah Putra Developer",
    image: Arwin,
    stack: "React-Native",
    Linkedin: "https://www.linkedin.com/in/arwinsyah-putra-072b37153/",
  },
];

const AboutUs = () => {
  //Aos Animation
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <>
      <div className="about-background">
        <h1 data-aos="fade-down" className="judul-center">
          About RealizDea
        </h1>
        <div className="flexy" style={{paddingTop:'40px'}}>
          <div data-aos="fade-left" className="about-body col-lg-6">
            <h6 className="hahaha6">Goals</h6>
            <p>
              RealizDea was made to collaborate creative projects to provider
              business owners, brands and participant to release the ideas, Our
              main goal is to connect people who are having trouble finding
              customize design to their desires and people who are looking for a
              creative platform to channel their creativity. By Doing so, we are
              creating a win-win solution for both sides and realizing many and
              many more of design ideas.{" "}
            </p>
            <h6 className="hahaha6">Contributors</h6>
            <p>
              This product was created by: Panji, Zuhry and Saras as Front-end,
              Tommy, Seli and Wawan as Back-end, and Yohanes and Arwin as
              React-native developer. we collaborate with supervision and
              guidance from our product owner, Mrs Angelria Purnamasari.{" "}
            </p>
          </div>
          <div
            className="favourite-img mx-auto"
            // style={{
            //   backgroundImage: 'url("../../AssetsSaras/about-page.jpg")',
            // }}
          >
            <img className="img-small mx-auto" src={Img} />
          </div>
        </div>
        <div data-aos="fade-in" className="card-0 card-tengah col-lg-2 mx-auto">
          <Card className="">
            <CardImg
              top
              width="100%"
              className="h card-about"
              src={Angel}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h5">Angelria Purnamasari</CardTitle>
              <CardText>
                <p>Product Owner of RealizDea</p>
                <p>LinkedIn profile : <a href="https://www.linkedin.com/in/angel-ria-purnama-sari-39a671aa/" target="blank">Linkedin</a></p>
              </CardText>
            </CardBody>
          </Card>
        </div>
        <div data-aos="fade-in" className="row card-tengah card-tengah-sibling">
          {member.map((data, idx) => {
            return (
                <div key={idx} className=" card border-0 crad mx-auto" style={{width: "200px", marginBottom: "25px"}}>
                  <CardImg
                    top
                    width="100%"
                    className="h card-about"
                    src={data.image}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardTitle tag="h5">{data.name}</CardTitle>
                    <CardText>
                      {data.stack}
                    <p>LinkedIn profile : <a href={data.Linkedin} target="blank">Linkedin</a></p>
                      
                    </CardText>
                  </CardBody>
                </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AboutUs;

import React, { useState } from 'react';
import { Modal } from './../modal/modal';
import { utils } from './../../scripts/utils';
import { CountryRowDivider } from '../country-list/countryRowDivider';
import { Col, Row } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

interface AboutProps {
  translations: any;
}

export const About = (props: AboutProps) => {
  const { translations } = props;
  const [modalVisible, setVisible] = useState(true);

  const toggleModal = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  // calculate the width and height of the modal
  const width = utils.getPixelWidthByPercent(0.75);
  const height = utils.getPixelHeightByPercent(0.75);

  return (
    <div>
      <p className="text" onClick={toggleModal}>
        {translations['about']}
      </p>
      <Modal
        visible={modalVisible}
        onClose={toggleModal}
        width={width}
        height={height}>
        <div className="container">
          <h3 className="headline centered white">About the COVID Dashboard</h3>
          <div className="container">
            <h4 className="centered">Assumptions made when Displaying Data</h4>
            <p>
              <ul>
                <li>
                  <p>
                    <b className="white">Immunity Percent:</b> This percentage
                    is assumes that the patient has received their first dose of
                    the vaccine and has planned to receive the second in the
                    recommended amount of time after.
                  </p>
                </li>
                <li>
                  <p>
                    <b className="white">Trending / Hotspot Countries:</b>{' '}
                    Countries with low populations or extremely low COVID counts
                    are not weighted as heavily when displaying the biggest
                    changes. Population size plays as the biggest factor in
                    these calculations.
                  </p>
                </li>
                <li>
                  <p>
                    <b className="white">Viewable Countries:</b> We've
                    selectively chosen what countries can be viewed based on the
                    reliability of the data submitted. Therefore not all
                    countries are represented here.
                  </p>
                </li>
              </ul>
            </p>
            <h4 className="centered">Works Cited</h4>
            <p>
              To ensure you get the freshest data available, below are the APIs
              used to create this dashboard and the organizations that log this
              data.
            </p>
            <ul>
              <li>
                <p>
                  <b className="white">COVID Cases and Deaths: </b> Data is
                  gathered using the Covid19Api{' '}
                  <a href="https://covid19api.com/">(Link)</a> and is backed by{' '}
                  <a href="https://github.com/CSSEGISandData/COVID-19">
                    Johns Hopkins CSSE.
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <b className="white">Vaccination Data: </b> Data is maintained
                  by Our World in Data{' '}
                  <a href="https://ourworldindata.org/covid-vaccinations">
                    (Link).
                  </a>
                </p>
              </li>
            </ul>
            <h4 className="centered">About the Author</h4>
            <div className="social-media">
              <a href="https://github.com/bhafenrichter" target="_blank">
                <FaGithub></FaGithub>
              </a>
              <a
                href="https://www.linkedin.com/in/brandon-hafenrichter-56344785/"
                target="_blank">
                <FaLinkedin></FaLinkedin>
              </a>
            </div>
            <Row>
              <Col lg="2">
                <img
                  src="http://localhost:3001/static/png/nerd.png"
                  className="image rounded"
                />
              </Col>
              <Col lg="10">
                <p>
                  Oh yeah, I'm Brandon. I'm a Technical Project Lead / Software
                  Developer based in Berlin, Germany. I hope this Dashboard can
                  help you navigate through this pandemic and give you a concise
                  snapshot of how we are looking so you can worry less and start
                  living more. If you have any feedback about how to make this
                  project better, hit me up on any of the links below. God
                  bless.
                </p>
              </Col>
            </Row>
          </div>
        </div>
      </Modal>
    </div>
  );
};

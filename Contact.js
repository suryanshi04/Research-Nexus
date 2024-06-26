import React from 'react';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.js';
import Chatbot from './Chatbot.js'
import Modal from 'react-modal';

Modal.setAppElement('#root')
export default function Contact() {
  const [isChange, setIsChange] = React.useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [name, setname] = React.useState('');
  const [email, setemail] = React.useState('');
  const [subject, setsubject] = React.useState('');
  const [text, settext] = React.useState('');
  const [emailData, setEmailData] = useState({
    from: "lablnk_help@outlook.com",
    to: '',
    subject: 'Research Nexus Information Request Initiated',
    html: 'Dear user, Thank you for initiating your request. We have recorded it in our database. We aim to reply within 1 business year, but time may vary depending on the availability. We appreciate your interest!',
  });
  const handleButtonClick = () => {
    setIsChange(!isChange);
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const showModal = (message) => {
    setModalMessage(message);
    setModalIsOpen(true);
  }

  const showErrorModal = (message) => {
    setModalMessage(message);
    setErrorModalIsOpen(true);
  }


  const validateFields = () => {
    if (!name || !email || !subject || !text) {
      showModal('All fields are required. Please fill them out before submitting.');
      return false;
    }
    return true;
  }

  async function fetchData(netID, password) {
    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                field1: name,
                field2: email,
                field3: subject,
                field4: text
            }),
        });



        const statusCode = response.status;

        if (statusCode >= 200 && statusCode < 300) {  // Successful response range
            const responseData = await response.json();
            setData(responseData);
            setLoading(false);
        } else {
            let errorMessage;
            try {
                const errorData = await response.text();  // Try parsing JSON first
                errorMessage = errorData;
            } catch {
                errorMessage = "Message sent failed. Please try again.";  // If not JSON, then parse as text
            }
            throw new Error(errorMessage);
        }

    } catch (error) {
        //console.error('Error during registration:', error.message);
        console.log(error.message);
        //alert(error.message);  // Display the error message in an alert
    }
}

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    fetchData(name,email,subject,text);  // Call fetchData with netID and password
    const emailToSend = {
      ...emailData,  // Previous email data state
      to: email,  // Setting 'to' field with the user's input email
      html: 'Dear user, Thank you for initiating your request. We have recorded it in our database. We aim to reply within 1 business year, but time may vary depending on the availability. We appreciate your interest!'
    };
    try {
      // Send a POST request to the serverless function
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailToSend),
      });
      // Error handling with the response
      if (!res.ok) {
        //alert('Network response was not ok');
      }

      // Update state with the success response (can be customized based on your backend response)
      alert('Email sent successfully!');

      // Optionally, clear the form after successful submission
      setEmailData({
        from: "lablnk_help@outlook.com",
        to: '',
        subject: 'Research Nexus Password Reset',
        html: 'Dear user, Thank you for initiating your request. We have recorded it in our database. We aim to reply within 1 business year, but time may vary depending on the availability. We appreciate your interest!',
      });
    } catch (error) {
      // Update state with error message
      alert(`There was an error sending the email: ${error.message}`);
    }
    showModal('Thank you for sending a query');


  };

  useEffect(() => {
    // fetchData();  // Removed this because we now fetch data on form submit
  }, []);


  const navigate = useNavigate();
    return (
      <>
        <div className="site-mobile-menu">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close">
              <span className="icofont-close js-menu-toggle"></span>
            </div>
          </div>
          <div className="site-mobile-menu-body"></div>
        </div>

        <Navbar/>

        <div className="untree_co-hero overlay">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-12">
                <div className="row justify-content-center ">
                  <div className="col-lg-6 text-center ">
                    <h1 className="mb-4 heading text-white" data-aos="fade-up" data-aos-delay="100">Contact Us</h1>
                    <div className="mb-5 text-white desc mx-auto" data-aos="fade-up" data-aos-delay="200">
                      <p><em><h2>"Welcome to Research Nexus!"</h2></em></p>
                      <p>Whether you're a student looking to join a research project, a professor eager to showcase your work, or someone with a general inquiry, we're here to help.</p>
                    </div>
                    <p className="mb-0" data-aos="fade-up" data-aos-delay="300">
                      <a href="#Contact_concrete" className="btn btn-secondary">Contact Research Nexus</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>




        <div className="untree_co-section" id="Contact_concrete">
          <div className="container">

            <div className="row mb-5">
              <div className="col-lg-4 mb-5 order-2 mb-lg-0" data-aos="fade-up" data-aos-delay="100">
                <div className="contact-info">

                  <div className="address mt-4">
                    <i className="icon-room"></i>
                    <h4 className="mb-2">Location:</h4>
                    <p>Bennett University</p>
                  </div>

                  <div className="open-hours mt-4">
                    <i className="icon-clock-o"></i>
                    <h4 className="mb-2">Open Hours:</h4>
                    <p>
                      Monday-Friday:<br/>
                      09:00 AM - 05:00 PM
                    </p>
                  </div>

                  <div className="email mt-4">
                    <i className="icon-envelope"></i>
                    <h4 className="mb-2">Email:</h4>
                    <p>nexus@gmail.com</p>
                  </div>

                  <div className="phone mt-4">
                    <i className="icon-phone"></i>
                    <h4 className="mb-2">Call:</h4>
                    <p>+91 9305792979</p>
                  </div>

                </div>
              </div>
              <div className="col-lg-7 mr-auto order-1" data-aos="fade-up" data-aos-delay="200">
                <form onSubmit={handleFormSubmit}>
                {/* Notification Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Notification Modal"
        style={
          {
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)'
            },
            content: {
              color: 'lightsteelblue'
            }
          }
        }
      >
        <h2>Notification</h2>
        <p>{modalMessage}</p>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>

      {/* Error Modal */}
      <Modal
        isOpen={errorModalIsOpen}
        onRequestClose={() => setErrorModalIsOpen(false)}
        contentLabel="Error Modal"
        style={
          {
            overlay: {
              backgroundColor: 'rgba(255, 0, 0, 0.75)' // Reddish overlay for errors
            },
            content: {
              color: 'salmon'  // Reddish text for errors
            }
          }
        }
      >
        <h2>Error</h2>
        <p>{modalMessage}</p>
        <button onClick={() => setErrorModalIsOpen(false)}>Close</button>
      </Modal>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <input type="text" className="form-control" placeholder="Your Name" value = {name} onChange={e => setname(e.target.value)}  />
                    </div>
                    <div className="col-6 mb-3">
                      <input type="email" className="form-control" placeholder="Your Email" value = {email} onChange={e => setemail(e.target.value)}  />
                    </div>
                    <div className="col-12 mb-3">
                      <input type="text" className="form-control" placeholder="Subject" value = {subject} onChange={e => setsubject(e.target.value)} />
                    </div>
                    <div className="col-12 mb-3">
                      <textarea name="" id="" cols="30" rows="7" className="form-control" placeholder="Message" value = {text} onChange={e => settext(e.target.value)} ></textarea>
                    </div>

                    <div className="col-12">
                      <input type="submit" value="Send Message" className="btn btn-primary"/>
                    </div>
                  </div>
                </form>
              </div>
            </div>


          </div>
        </div>


        <div style={{ zIndex: 9999 }}>
          <Chatbot />
        </div>




            <div className="site-footer">


      <div className="container">

        <div className="row">
          <div className="col-lg-3 mr-auto">
            <div className="widget">
              <h3>About Us<span className="text-primary"></span> </h3>
              <p>A group of Bennett students.</p>
            </div>
          </div>

          <div className="col-lg-3 ml-auto">
            <div className="widget">
              <h3>Learn More</h3>
              <ul className="list-unstyled float-left links">
                <li><a href="https://github.com/bianshuyang/LabLink"></a></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="widget">
              <h3>Ongoing Projects</h3>
              <ul className="instafeed instagram-gallery list-unstyled">
                <li><a className="instagram-item" href="images/DDIHTS_cover.jpg" data-fancybox="gal"><img src="images/DDIHTS_cover.jpg" alt="" width="72" height="72"/></a>
                </li>
                <li><a className="instagram-item" href="images/Simbiosys_cover.jpg" data-fancybox="gal"><img src="images/Simbiosys_cover.jpg" alt="" width="72" height="72"/></a>
                </li>
                <li><a className="instagram-item" href="images/data_mining_cover.jpg" data-fancybox="gal"><img src="images/data_mining_cover.jpg" alt="" width="72" height="72"/></a>
                </li>
              </ul>
            </div>
          </div>


          <div className="col-lg-3">
            <div className="widget">
              <h3>Get in Touch</h3>
              <address>Bennett University</address>
              <ul className="list-unstyled links mb-4">
                <li><a href="tel://4047276123">+919305792979</a></li>
                <li><a href="email://jeff.epstein@Research Nexus.edu">nexus@gmail.com</a></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="row mt-5">
          <div className="col-12 text-center">
            <p>Copyright &copy;<script>document.write(new Date().getFullYear());</script>. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
              </>
)}

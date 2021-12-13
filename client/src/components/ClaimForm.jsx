import React from "react";
import styled from 'styled-components';
import Submit from '../shared/SubmitCancelButton.jsx';
import InputLabel from '../shared/InputLabel.jsx';
import { useState, useEffect } from "react";
const api = require('../../api/index.js');

const ClaimForm = ({ listingId, toggleModal }) => {

  const initialClaimInfo = {
    listingId: listingId || 1,
    claimed: true,
    claimerName: '',
    claimerPhone: '',
    claimerEmail: '',
    status: 'pending'
  }
  const [claimInfo, setClaimInfo] = useState(initialClaimInfo);

  const handleInputChange = (e) => {
    setClaimInfo((prevState) => (
      {...prevState, [e.target.name]: e.target.value }
      ))
  }

  const handleSubmit = (claimInfo) => {
    api.claimDonationListing(claimInfo)
    .then((results) => {
      console.log(results)
    })
    .catch((err) => {
      console.log('ERROR IN ClaimForm handle submit: ', err)
    })
  }

  return (
    <div>
      <Title> Please submit your info for the donator </Title>
      <Form onChange={handleInputChange}>
        <InputLabel label={"Name"} input={"claimerName"} />
        <InputLabel label={"Email"} input={"claimerEmail"} />
        <InputLabel label={"Phone"} input={"claimerPhone"} />
      </Form>
      <Submit handleSubmit={() => {handleSubmit(claimInfo)}} handleCancel={toggleModal}/>
    </div>
  )

};

export default ClaimForm;

const Title = styled.h3`
  text-align: center;
  //margin-top: 20px;
`;

const Form = styled.div`
  height: 50vh;
  width: 100%;
  //border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

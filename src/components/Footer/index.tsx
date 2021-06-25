import React from 'react'
import styled from 'styled-components'

const FooterFrame = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  bottom: 0;
  position: relative;
  height: 400px;
  background-color: #efe4e4;
`
const InfoFooter = styled.div`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 3rem;
`
const InfoWithSearch = styled.div`
  p {
    color: #04040599;
    cursor: pointer;
  }
  .search {
    background: rgb(255, 255, 255);
    height: 48px;
    border-radius: 48px;
    transition: all 0.12s ease-in-out 0s;
    -webkit-box-align: stretch;
    align-items: stretch;
    padding: 0px 95px 0px 20px;
    flex-direction: row;
    border: 0px;
  }
  .btnSend {
    cursor: pointer;
    background-color: #0066ff;
    overflow: hidden;
    height: 48px;
    width: 60px;
  }
`
const InfoWithText = styled.div`
  p {
    color: #04040599;
    cursor: pointer;
    font-weight: 600;
  }
  p:hover {
    color: #000;
  }
`
const SocialFooter = styled.div``
export default function Footer() {
  return (
    <FooterFrame>
      <InfoFooter>
        <InfoWithSearch>
          <h4>Get the latest Rarible updates</h4>
          <div className="search">
            <input></input>
            <div className="btnsearch"></div>
          </div>
        </InfoWithSearch>
        <InfoWithText>
          <h4>MaketPlace</h4>
          <p>Expole</p>
          <p>Stats</p>
          <p>Mint</p>
          <p>Studio</p>
        </InfoWithText>
        <InfoWithText>
          <h4>Community</h4>
          <p>RARI Token</p>
          <p>Discussion</p>
          <p>Voting</p>
          <p>Suggest feature</p>
        </InfoWithText>
        <InfoWithSearch>
          <h4>Language</h4>
          <div className="search">
            <input placeholder="TEXT"></input>
          </div>
        </InfoWithSearch>
      </InfoFooter>
      <SocialFooter></SocialFooter>
    </FooterFrame>
  )
}

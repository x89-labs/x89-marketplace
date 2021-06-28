import React from 'react'
import styled from 'styled-components'
import * as Asset from 'assets'

const FooterFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  bottom: 0;
  position: relative;
  height: auto;
  background-color: #fff;
`
const InfoFooter = styled.div`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 3rem;
  margin-bottom: 4rem;
`
const InfoWithSearch = styled.div`
  margin-bottom: 40px;
  p {
    color: #04040599;
    cursor: pointer;
  }
  .search {
    background: #f0f0f0;
    height: 48px;
    border-radius: 48px;
    transition: all 0.12s ease-in-out 0s;
    -webkit-box-align: stretch;
    align-items: stretch;
    padding: 0px 20px;
    display: flex;
    flex-direction: row;
    border: 0px;
  }
  input {
    border: none;
    outline: none;
    background: #f0f0f0;
  }
  .btnSend {
    cursor: pointer;
    background: #0066ff;
    align-self: center;
    font-weight: 700;
    color: #fff;
    padding: 14px 24px;
    border-radius: 48px;
    margin-right: -20px;
  }
`
const InfoWithText = styled.div`
  p {
    color: rgba(4, 4, 5, 0.6);
    cursor: pointer;
    font-weight: 700;
  }
  p:hover {
    color: #000;
  }
`
const SocialFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
  border-top: 1px solid #ccc;
  font-size: 12px;
  * {
    display: flex;
    flex-direction: row;
  }
  .term {
    padding: 12px;
    width: 50%;
    .policy {
      margin-left: 20px;
      font-weight: 700;
      cursor: pointer;
    }
    .policy:hover {
      opacity: 0.5;
    }
  }
  .social {
    padding: 12px;
    align-items: center;
  }
  .image {
    margin: 0 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .image:hover {
    opacity: 0.5;
  }
`
export default function Footer() {
  return (
    <FooterFrame>
      <InfoFooter>
        <InfoWithSearch>
          <h4>Get the latest Rarible updates</h4>
          <div className="search">
            <input placeholder="Your e-mail"></input>
            <div className="btnSend">Im in</div>
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
          <p>X89 Token</p>
          <p>Discussion</p>
          <p>Voting</p>
          <p>Suggest feature</p>
        </InfoWithText>
        <InfoWithSearch>
          <h4>Language</h4>
          <div className="search">
            <input placeholder="Language"></input>
          </div>
        </InfoWithSearch>
      </InfoFooter>
      <SocialFooter>
        <div className="term">
          <p> @Nmb, Inc. All rights reserved</p>
          <p className="policy"> Terms</p>
          <p className="policy"> Private</p>
        </div>
        <div className="social">
          <Asset.Twitter className="image" />
          <Asset.Telegram className="image" />
          <Asset.Instagram className="image" />
          <Asset.Youtube className="image" />
        </div>
      </SocialFooter>
    </FooterFrame>
  )
}

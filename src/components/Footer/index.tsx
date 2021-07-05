import React from 'react'
import styled from 'styled-components'
import * as Asset from 'assets'
import { useIsDarkMode } from 'state/user/hooks'
import { NavLink } from 'react-router-dom'
import { ExternalLink } from '../../theme'

const FooterFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  bottom: 0;
  background-color: ${({ theme }) => theme.bg3};
  .infoFooter {
    padding: 0 8rem;
  }
`
const InfoFooter = styled.div`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
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
    width: 293px;
    border-radius: 48px;
    padding-left: 20px;
    display: flex;
    flex-direction: row;
  }
  input {
    border: none;
    outline: none;
    background: #f0f0f0;
  }
  .btnSend {
    cursor: pointer;
    background: #7d7272;
    align-self: center;
    font-weight: 700;
    color: #fff;
    padding: 14px 24px;
    border-radius: 48px;
  }
`
const InfoWithText = styled.div`
  p {
    color: ${({ theme }) => theme.text5};
    cursor: pointer;
    font-weight: 700;
  }
  p:hover {
    opacity: 0.7;
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
const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  outline: none;
  text-decoration: none;
`

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName,
})<{ isActive?: boolean }>`
  outline: none;
  text-decoration: none;
  :hover {
    text-decoration: none;
  }
`

export default function Footer() {
  const darkMode = useIsDarkMode()
  return (
    <FooterFrame>
      <div className="infoFooter">
        <InfoFooter>
          <InfoWithSearch>
            <h4>Get the latest Maketplace updates</h4>
            <div className="search">
              <input placeholder="Your e-mail"></input>
              <div className="btnSend">{`I'm in`}</div>
            </div>
          </InfoWithSearch>
          <InfoWithText>
            <h4>MaketPlace</h4>
            <StyledNavLink id={`explore-nav-link`} to={'/explore'}>
              <p>Explore</p>
            </StyledNavLink>
            <StyledNavLink id={`explore-nav-link`} to={'/stats'}>
              <p>Stats</p>
            </StyledNavLink>
            <StyledNavLink id={`explore-nav-link`} to={'/create'}>
              <p>Mint</p>
            </StyledNavLink>
            <StyledExternalLink id={`stake-nav-link`} href={'https://ink-studio.nmb.com.vn'}>
              <p>Studio</p>
            </StyledExternalLink>
            <StyledExternalLink id={`stake-nav-link`} href={'https://vr-art.nmb.com.vn'}>
              <p>Exhibitions</p>
            </StyledExternalLink>
          </InfoWithText>
          <InfoWithText>
            <h4>Community</h4>
            <StyledNavLink id={`explore-nav-link`} to={'.'}>
              <p>X89 Token</p>
            </StyledNavLink>
            <p>Discussion</p>
            <p>Voting</p>
            <p>Suggest feature</p>
          </InfoWithText>
        </InfoFooter>
      </div>
      <SocialFooter>
        <div className="term">
          <p> @Nmb, Inc. All rights reserved</p>
          <p className="policy"> Terms</p>
          <p className="policy"> Private</p>
        </div>
        <div className="social">
          <StyledExternalLink id={`stake-nav-link`} href={'https://twitter.com/x89_nft'}>
            <Asset.Twitter className="image" fill={darkMode ? '#fff' : '#000'} />
          </StyledExternalLink>
          <StyledExternalLink id={`stake-nav-link`} href={'https://t.me/joinchat/6oNOOAqXlJo0ZmM1'}>
            <Asset.Telegram className="image" fill={darkMode ? '#fff' : '#000'} />
          </StyledExternalLink>
          <StyledExternalLink id={`stake-nav-link`} href={''}>
            <Asset.Instagram className="image" fill={darkMode ? '#fff' : '#000'} />
          </StyledExternalLink>
          <StyledExternalLink id={`stake-nav-link`} href={''}>
            <Asset.Youtube className="image" fill={darkMode ? '#fff' : '#000'} />
          </StyledExternalLink>
        </div>
      </SocialFooter>
    </FooterFrame>
  )
}

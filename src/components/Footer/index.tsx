import React from 'react'
import styled from 'styled-components'
import * as Asset from 'assets'
import { useIsDarkMode } from 'state/user/hooks'
import { NavLink } from 'react-router-dom'
import { ExternalLink } from '../../theme'
import { Color } from 'styles'

const FooterFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  bottom: 0;
  background: ${({ theme }) => theme.bg2};
  padding: 0 120px;
`
const Header = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dashed #ccc;
`
const Title = styled.p`
  font-size: 24px;
  margin: 0;
  color: #35dfb1;
`
const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
`
const InfoWithSearch = styled.div`
  width: 300px;
  margin-bottom: 40px;
  color: #fff;
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f0f0f0;
    border-radius: 48px;
    padding-left: 20px;
    margin-top: 1rem;
  }
  input {
    padding: 20px 0;
    width: 80%;
    height: 20px;
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
  display: flex;
  flex-direction: column;
  .image {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .image:hover {
    opacity: 0.5;
  }
`
const FooterPolicy = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px 0;
  border-top: 1px dashed #ccc;
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
  display: flex;
  align-items: center;
  :hover {
    text-decoration: none;
  }
`
const Text = styled.p`
  color: #777e90;
  font-size: 14px;
  margin: 8px 0;
`
const BoldText = styled.h4`
  color: ${({ theme }) => theme.text1};
  margin: 24px 0;
  font-size: 24px;
`
const Term = styled.p`
  margin: 8px 20px;
  color: ${({ theme }) => theme.text1};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

export default function Footer() {
  const darkMode = useIsDarkMode()
  return (
    <FooterFrame>
      <Header>
        <img src={Asset.SrcLogo} width={28} height={27} />
        <Title style={{ margin: '0 40px 0 10px', fontWeight: 'bold' }}>POLRARE </Title>
        <Title>NFT Maketplace</Title>
      </Header>
      <Content>
        <InfoWithSearch>
          <BoldText>Join Maketplace</BoldText>
          <Text>
            Join our mailing list to stay in the loop with our newest feature releases, tips and tricks for NFT.
          </Text>
          <div className="search">
            <input placeholder="Your e-mail"></input>
            <Asset.BtnFooter width={32} height={32} style={{ paddingRight: 5 }} />
          </div>
        </InfoWithSearch>
        <InfoWithText>
          <BoldText>Polrare</BoldText>
          <StyledNavLink id={`explore-nav-link`} to={'/explore'}>
            <Text>Explore</Text>
          </StyledNavLink>
          <StyledNavLink id={`explore-nav-link`} to={'/stats'}>
            <Text>Stats</Text>
          </StyledNavLink>
          <StyledNavLink id={`explore-nav-link`} to={'/create'}>
            <Text>Mint</Text>
          </StyledNavLink>
          <StyledExternalLink id={`stake-nav-link`} href={'https://builder.polrare.co'}>
            <Text>Builder</Text>
          </StyledExternalLink>
          <StyledExternalLink id={`stake-nav-link`} href={'https://musuem.polrare.co'}>
            <Text>Museum</Text>
          </StyledExternalLink>
          <StyledExternalLink id={`stake-nav-link`} href={'#'}>
            <Text>Become a partner</Text>
          </StyledExternalLink>
        </InfoWithText>
        <InfoWithText>
          <BoldText>Community</BoldText>
          <StyledNavLink id={`explore-nav-link`} to={'.'}>
            <Text>Polrare Token</Text>
          </StyledNavLink>
          <Text>Discussion</Text>
          <Text>Voting</Text>
          <Text>Suggest feature</Text>
        </InfoWithText>
        <InfoWithText>
          <BoldText>Find Us on</BoldText>
          <StyledExternalLink id={`stake-nav-link`} href={'https://twitter.com/x89_nft'}>
            <Asset.Twitter className="image" fill={darkMode ? '#fff' : Color.neutral.green} />
            <Text>Twitter</Text>
          </StyledExternalLink>
          <StyledExternalLink id={`stake-nav-link`} href={'https://t.me/joinchat/6oNOOAqXlJo0ZmM1'}>
            <Asset.Telegram className="image" fill={darkMode ? '#fff' : Color.neutral.green} />
            <Text>Telegram</Text>
          </StyledExternalLink>
          <StyledExternalLink id={`stake-nav-link`} href={''}>
            <Asset.Instagram className="image" fill={darkMode ? '#fff' : Color.neutral.green} />
            <Text>Instagram</Text>
          </StyledExternalLink>
          <StyledExternalLink id={`stake-nav-link`} href={''}>
            <Asset.Youtube className="image" fill={darkMode ? '#fff' : Color.neutral.green} />
            <Text>Youtube</Text>
          </StyledExternalLink>
        </InfoWithText>
      </Content>
      <FooterPolicy>
        <Text> @ POLRARE | All rights reserved 2021</Text>
        <Term> Privacy Policy</Term>
        <Term> {`Term & Conditions`}</Term>
      </FooterPolicy>
    </FooterFrame>
  )
}

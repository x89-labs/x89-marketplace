import React from 'react'
import styled from 'styled-components'
import * as Asset from 'assets'
import { useIsDarkMode } from 'state/user/hooks'
import { NavLink } from 'react-router-dom'
import { ExternalLink } from '../../theme'
import { Color, Outline, Typography } from 'styles'

const FooterFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  bottom: 0;
  background: ${({ theme }) => theme.bg2};
  padding: 0 10%;
  @media only screen and (max-width: 700px) {
    padding-bottom: 4rem;
  }
`
// const Header = styled.div`
//   display: flex;
//   width: 100%;
//   height: 100px;
//   justify-content: center;
//   align-items: center;
//   border-bottom: 1px dashed #ccc;
// `
// const Title = styled.p`
//   ${{ ...Typography.fontSize.x50 }};
//   color: ${Color.neutral.green};
//   margin: 0;
// `
const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  padding: 2rem 0;
`
const InfoWithSearch = styled.div`
  width: 300px;
  margin-bottom: 40px;
  color: #fff;
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${({ theme }) => theme.bg3};
    border-radius: 48px;
    padding-left: 20px;
    margin-top: 1rem;
    ${{ ...Outline.border.gray }}
  }
  input {
    color: ${({ theme }) => theme.text1};
    padding: 20px 0;
    width: 80%;
    height: 20px;
    border: none;
    outline: none;
    background: ${({ theme }) => theme.bg3};
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
  @media only screen and (max-width: 700px) {
    width: 100%;
    display: flex;
    align-items: center;
  }
`
const FooterPolicy = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px 0;
  border-top: 1px dashed #ccc;
  @media only screen and (max-width: 700px) {
    padding: 0;
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
  display: flex;
  align-items: center;
  :hover {
    text-decoration: none;
  }
`
const Text = styled.p`
  color: ${Color.neutral.gray};
  ${{ ...Typography.fontSize.x20 }};
  margin: 8px 0;
`
const BoldText = styled.h4`
  color: ${({ theme }) => theme.text1};
  ${{ ...Typography.fontSize.x50 }};
  margin: 24px 0;
`

export default function Footer() {
  const darkMode = useIsDarkMode()
  return (
    <FooterFrame>
      {/* <Header>
        <img src={Asset.SrcLogo} width={28} height={27} />
        <Title style={{ margin: '0 40px 0 10px', fontWeight: 'bold' }}>POLRARE </Title>
        <Title>NFT Maketplace</Title>
      </Header> */}
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
        </InfoWithText>
        <InfoWithText>
          <BoldText>Community</BoldText>
          <StyledNavLink id={`explore-nav-link`} to={'.'}>
            <Text>Polrare Token</Text>
          </StyledNavLink>
          <Text>Discussion</Text>
          <Text>Voting</Text>
          <Text>Suggest feature</Text>
          <StyledExternalLink id={`stake-nav-link`} href={'#'}>
            <Text>Become a partner</Text>
          </StyledExternalLink>
        </InfoWithText>
        <InfoWithText>
          <BoldText>Find Us on</BoldText>
          <StyledExternalLink id={`stake-nav-link`} href={'https://twitter.com/polrare'}>
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
      </FooterPolicy>
    </FooterFrame>
  )
}

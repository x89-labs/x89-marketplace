import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Color, Typography } from 'styles'

export const StandardPageWrapper = styled.div`
  padding-top: 160px;
  width: 100%;
`
export const ButtonLink = styled(NavLink)`
  padding: 10px 20px;
  border-radius: 0.25rem !important;
  border: 1px solid #04eced;
  color: ${({ theme }) => theme.blue1};
  background: ${({ theme }) => theme.btn};
  text-decoration: none;
`
export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 0.25rem !important;
  border: 1px solid #04eced;
  color: ${({ theme }) => theme.blue1};
  background: ${({ theme }) => theme.btn};
  text-decoration: none;
`
export const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
`
export const SubTitle = styled.p`
  color: ${({ theme }) => theme.text5};
`
export const LabelInput = styled.p`
  font-size: 16px;
  font-weight: bolder;
`
export const TextInput = styled.div`
  margin-top: 15px;
  width: 100%;
  .text-input {
    position: relative;
    margin-top: 10px;
    background: ${({ theme }) => theme.bg1};
    height: 48px;
    display: flex;
    border: 1px solid #ccc;
    justify-content: space-between;
    border-radius: 10px;
  }
  input {
    background: ${({ theme }) => theme.bg1};
    color: ${({ theme }) => theme.text1};
    width: 100%;
    border: none;
    outline: none;
    margin: 10px;
  }
`
export const TextDescription = styled.small`
  ${{ ...Typography.fontSize.x20 }}
  color: ${({ theme }) => theme.text2};
`
export const NavTab = styled.div`
  .nav .active {
    background: ${({ theme }) => theme.active};
  }
  .tab-content::-webkit-scrollbar {
    display: none;
  }
  .tab-content {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`
export const ErrorMessage = styled.div`
  color: red;
  ${{ ...Typography.fontSize.x20 }}
  ${{ ...Typography.fontWeight.bold }}
`

export const Around = styled.div`
  text-align: center;
  margin-top: 10px;
  height: auto;
  border: 1px dashed ${Color.neutral.gray};
  display: flex;
  justify-content: center;
  padding: 30px 0;
  border-radius: 16px;
  position: relative;
  background: ${({ theme }) => theme.lgbg1};
  @media only screen and (max-width: 700px) {
    width: 100%;
  }
`
export const FlexAround = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`

import styled from 'styled-components/macro'

export const StandardPageWrapper = styled.div`
  padding-top: 160px;
  width: 100%;
`
export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 0.25rem !important;
  border: 1px solid #04eced;
  color: ${({ theme }) => theme.blue1};
  background: ${({ theme }) => theme.btn};
`

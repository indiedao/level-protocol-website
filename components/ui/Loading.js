import styled from "styled-components";

const Loading = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  background-color: #8F8D76;
  margin: 0 16px;
  animation: flashTwo 1s steps(1,end) infinite normal;

  &::before, &::after {
    position: absolute;
    content: '';
    width: 16px;
    height: 16px;
    background-color: #8F8D76;
  }

  &::before {
    left: -32px;
    animation: flashOne 1s steps(1,end) infinite normal;
  }

  &::after {
    left: 32px;
    animation: flashThree 1s steps(1,end) infinite normal;
  }

  @keyframes flashOne {
    25%,
    100% {
      background-color: #FFFCD8;
    }
  }

  @keyframes flashTwo {
    50%,
    100% {
      background-color: #FFFCD8;
    }
  }

  @keyframes flashThree {
    75%,
    100% {
      background-color: #FFFCD8;
    }
  }
`

export default Loading;
import styled from "@emotion/styled";

const Intro = styled.section`
  background-color: rgba(97, 98, 71, 1);
  color: #ffffff;
  margin-bottom: 48px;
  overflow: hidden;
  padding: 104px;
  position: relative;
  text-align: center;
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 0;
    border-width: 0 0 64px 100vw;
    border-style: solid;
  }
  &:before {
    border-bottom-color: rgba(97, 98, 71, 1);
    top: 0;
  }
  &:after {
    border-left-color: rgba(97, 98, 71, 1);
    bottom: 0;
  }
`;

export default Intro;

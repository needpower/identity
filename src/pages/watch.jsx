import React from "react"
import Helmet from "react-helmet"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/Layout"
import config from "../../data/SiteConfig"

const WatchProcess = () => {
  return (
    <Layout>
      <Helmet>
        <title>{`Наблюдаем за процессом | ${config.siteTitle}`}</title>
      </Helmet>
      <CategoriesContainer>
        <Category to="/watch/notes">
          <CategoryText>
            <CategoryTitle>Говорить</CategoryTitle>
            <div>Поговорим обо всём, что касается, интересует, волнует</div>
          </CategoryText>
        </Category>
        <BigDash>&mdash;</BigDash>
        <Category to="/watch/portfolio">
          <CategoryText>
            <CategoryTitle>Мешки ворочать</CategoryTitle>
            <div>Сборник проектов, в которых принимал участие</div>
          </CategoryText>
        </Category>
      </CategoriesContainer>
    </Layout>
  )
}

export default WatchProcess

const CategoriesContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

const Category = styled(Link)`
  border-radius: 0.4rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 15px 25px;
  display: flex;
  flex-basis: calc(99.9% * 1 / 3);
  flex-direction: column;
  justify-content: flex-end;
  height: 17rem;
  margin: 0 1.25rem 1.6rem;
  max-width: calc(99.9% * 1 / 3);
  padding: 1rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  width: calc(99.9% * 1 / 3);
  &:after {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.7) 80%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: -10;
    border-radius: 0.4rem;
  }
  &:hover {
    box-shwdow: 0 40px 45px rgba(0, 0, 0, 0.1);
    transform: scale(1.04);
  }
`

const CategoryText = styled.div`
  color: #f0f0f0;
  margin: 0 1rem 1.25rem 1.25rem;
  text-shadow: none;
`

const CategoryTitle = styled.h3`
  color: #f0f0f0;
  margin-bottom: 0.5rem;
`

const BigDash = styled.div`
  font-size: 3rem;
`

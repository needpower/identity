import React from "react"
import Helmet from "react-helmet"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/Layout"
import NonStretchedImage from "../components/NonStretchedImage"
import config from "../../data/SiteConfig"

const WatchProcess = () => {
  const data = useStaticQuery(graphql`
    query CategoiesImages {
      allFile(filter: { absolutePath: { regex: "/assets/watch/" } }) {
        edges {
          node {
            childImageSharp {
              fluid(maxWidth: 640) {
                ...GatsbyImageSharpFluid_withWebp
                presentationWidth
              }
            }
          }
        }
      }
    }
  `)
  const talkImage = data.allFile.edges.find(edge =>
    edge.node.childImageSharp.fluid.src.includes("speak")
  )
  const makeImage = data.allFile.edges.find(edge =>
    edge.node.childImageSharp.fluid.src.includes("programm")
  )
  return (
    <Layout>
      <Helmet>
        <title>{`Наблюдаем за процессом | ${config.siteTitle}`}</title>
      </Helmet>
      <CategoriesContainer>
        <CategoryItem>
          <CategoryImageWrapper>
            <CategoryImage fluid={talkImage.node.childImageSharp.fluid} />
          </CategoryImageWrapper>
          <Category to="/watch/notes">
            <CategoryText>
              <CategoryTitle>Говорить</CategoryTitle>
              <div>Поговорим обо всём, что касается, интересует и волнует</div>
            </CategoryText>
          </Category>
        </CategoryItem>
        <BigDash>&mdash;</BigDash>

        <CategoryItem>
          <CategoryImageWrapper>
            <CategoryImage fluid={makeImage.node.childImageSharp.fluid} />
          </CategoryImageWrapper>
          <Category to="/watch/portfolio">
            <CategoryText>
              <CategoryTitle>Мешки ворочать</CategoryTitle>
              <div>Сборник проектов, в которых принимал участие</div>
            </CategoryText>
          </Category>
        </CategoryItem>
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

const CategoryItem = styled.div`
  border-radius: 0.4rem;
  position: relative;
  flex-basis: calc(99.9% * 1 / 3);
  height: 17rem;
  margin: 0 1.25rem 1.6rem;
  max-width: calc(99.9% * 1 / 3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  width: calc(99.9% * 1 / 3);
  &:hover {
    box-shadow: 0 40px 45px rgba(0, 0, 0, 0.1);
    transform: scale(1.04);
  }
`

const Category = styled(Link)`
  border: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 15px 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
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
`

const CategoryImageWrapper = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  object-fit: cover;
  top: 0;
  width: 100%;
  z-index: 1;
`

const CategoryImage = styled(NonStretchedImage)`
  height: 100%;
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

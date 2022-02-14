import React from "react"
import styled from "@emotion/styled"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import UserLinks from "../components/UserLinks"
import { siteDescription } from "../../data/SiteConfig"
import { phone } from "../utils/mediaQueries"

const RootPage = () => {
  return (
    <Layout>
      <SEO title="Начало" description={siteDescription} />
      <ProfileIntro>
        <ImageWrapper>
          <ProfileImage src="/assets/profile-2.jpg" alt="Фото на паспорт" />
        </ImageWrapper>
        <IntroText>
          <p>Привет, я&nbsp;Артём.</p>
          <p>
            На этом сайте буду оставлять слепок изменений отношения
            к&nbsp;волнующим меня вещам и&nbsp;идеям.
          </p>
          <p>
            Возможно что-то найдёшь про себя, возможно что-то возмутит,
            порадует, запутает или заставит собой гордиться.
          </p>
          <p>Ещё учусь задавать вопросы? И&nbsp;отвечать.</p>
          <p>Закидываю описание проектов, в&nbsp;которых принимал участие.</p>
          <p>
            Учусь насалаждаться процессом. В&nbsp;жопу тревожную погоню
            за&nbsp;успехом, ура!
          </p>
          <UserLinks />
        </IntroText>
      </ProfileIntro>
    </Layout>
  )
}

export default RootPage

const ProfileIntro = styled.div`
  display: flex;
  justify-content: space-between;
  ${phone} {
    flex-direction: column;
  }
`
const ImageWrapper = styled.div`
  margin-right: 1rem;
  width: 30%;
  ${phone} {
    width: 100%;
  }
`
const ProfileImage = styled.img`
  border-radius: 0.4rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 15px 25px;
`
const IntroText = styled.div`
  width: 70%;
  ${phone} {
    width: 100%;
  }
`

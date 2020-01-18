import React from "react"
import Helmet from "react-helmet"
import styled from "@emotion/styled"
import Layout from "../components/Layout"
import UserLinks from "../components/UserLinks"
import config from "../../data/SiteConfig"

export default () => {
  return (
    <Layout>
      <Helmet title={`Главная | ${config.siteTitle}`} />
      <ProfileIntro>
        <ImageWrapper>
          <ProfileImage src="/assets/profile.jpg" alt="Фото на паспорт" />
        </ImageWrapper>
        <IntroText>
          <p>Привет, я&nbsp;Артём.</p>
          <p>
            На этом сайте буду оставлять слепок изменений отношения
            к&nbsp;волнующим меня вещам и&nbsp;идеям.
          </p>
          <p>
            Возможно <nobr>что-то</nobr> найдёшь про себя, возможно{" "}
            <nobr>что-то</nobr> возмутит, порадует, запутает или заставить собой
            гордиться.
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

const ProfileIntro = styled.div`
  display: flex;
  justify-content: space-between;
`
const ImageWrapper = styled.div`
  margin-right: 1rem;
  width: 30%;
`
const ProfileImage = styled.img`
  border-radius: 0.4rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 15px 25px;
`
const IntroText = styled.div`
  width: 70%;
`

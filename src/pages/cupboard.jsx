import React, { Component } from "react"
import Helmet from "react-helmet"
import Intro from "../components/Intro"
import Layout from "../components/Layout"
import config from "../../data/SiteConfig"

export default class Cupboard extends Component {
  render() {
    return (
      <Layout fullWidth>
        <Helmet title={`Шкаф | ${config.siteTitle}`} />
        <Intro>
          Ни для кого не секрет (это ирония, возможно для кого-то и секрет), что
          всё, что нас окружает, формирует наше поведение. И это нормально.
          Здесь складываются видосы, статьи, заметки, картинки, которые меня
          поддёрнули. Основная цель &mdash; уловить смену интересов. А чё,
          занятно будет глянуть, как менялся фокус.
        </Intro>
      </Layout>
    )
  }
}

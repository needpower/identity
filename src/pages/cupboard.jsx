import React, { Component } from "react"
import Intro from "../components/Intro"
import Layout from "../components/Layout"

export default class Cupboard extends Component {
  render() {
    return (
      <Layout fullWidth>
        <Intro>
          Ни для кого не секрет (это ирония, возможно для кого-то и секрет), что
          всё, что нас окружает, формирует наше поведение. И это нормально.
          Здесь складываются видосы, статьи, заметки, картинки, которые меня
          поддёрнули. Основная цель &mdash; уловить смену интересов. А чё,
          занятно будет глянуть через время, как менялся фокус.
        </Intro>
      </Layout>
    )
  }
}

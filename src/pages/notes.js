import React from "react"
import { Layout } from "../components/Layout"
import { Intro } from "../components/Intro"
import styled from "@emotion/styled"

export default () => (
  <Layout fullWidth>
    <Intro>
      <p>
        Если только херачить не оглядываясь, по методу just... do it!, могу
        забыть, зачем вообще начинал. Беру на себя ответственность оглянуться
        через любое время, и вместо того, чтобы говорить: &laquo;да, быстро
        время летит&raquo; &mdash; увидеть &laquo;вот так-то проходит
        время&raquo;
      </p>
      <p>Добро пожаловать в хронику, где показываю, что узнал и что делаю.</p>
    </Intro>
    <Articles>
      <Article>
        <ArticleMeta>25 июля 2019</ArticleMeta>
        <header>
          <ArticleHeader>
            <a href="#">
              Лестница: делаем одно до конца &mdash; берёмся за другое
            </a>
          </ArticleHeader>
        </header>
        <ArticleBrief>
          Во время перерывов делаю перерыв, а не переключаюсь на другую работу
        </ArticleBrief>
      </Article>
      <Article>
        <ArticleMeta>2 июля 2019</ArticleMeta>
        <header>
          <ArticleHeader>
            <a href="#">Чистая повесть</a>
          </ArticleHeader>
        </header>
        <ArticleBrief>В закладках куча чтива, но руки не доходят</ArticleBrief>
      </Article>
      <Article>
        <ArticleMeta>4 июня 2019</ArticleMeta>
        <header>
          <ArticleHeader>
            <a href="#">Про мысли о привычках</a>
          </ArticleHeader>
        </header>
        <ArticleBrief>Новая привычка по методу Иссона-Масленкова</ArticleBrief>
      </Article>
      <Article>
        <ArticleMeta>29 мая 2019</ArticleMeta>
        <header>
          <ArticleHeader>
            <a href="#">Заиграла в слова</a>
          </ArticleHeader>
        </header>
        <ArticleBrief>
          И запела в ряд с сосновой установкой под песчаной утрамбовкой
        </ArticleBrief>
      </Article>
    </Articles>
  </Layout>
)

const Articles = styled.section`
  margin: 0 auto;
  max-width: 1280px;
  padding: 0 16px;
`
const Article = styled.article`
  margin-bottom: 4rem;
`
const ArticleHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
`
const ArticleMeta = styled.footer`
  color: rgba(0, 0, 0, 0.4);
`
const ArticleBrief = styled.p``

import React, { Component } from "react"
import Intro from "../../components/Intro"
import Layout from "../../components/Layout"
import SEO from "../../components/SEO"
import CVExplorerGame from "./game/CVExplorer"

export default class CV extends Component {
  render() {
    return (
      <CVExplorerGame />
      // <Layout fullWidth>
      //   <SEO
      //     title="CV"
      //     description="Explain my professional experience as never before - through the game!"
      //   />
      //   <Intro>
      //     <p>
      //       This page is for people who want to collaborate with the dedicated
      //       and passionate web developer :)
      //     </p>
      //     <p>
      //       A job application process goes to the next level! Here you can play
      //       the 5-minutes adventure game where you explore my professional
      //       experience. CV is also available in the .pdf format, so the choice
      //       is yours.
      //     </p>
      //     <p>Have fun, and I wish you all the best in the world!</p>
      //   </Intro>

      // </Layout>
    )
  }
}

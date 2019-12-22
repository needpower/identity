import React from "react"
import Helmet from "react-helmet"

import Layout from "../components/Layout"
import config from "../../data/SiteConfig"

export default () => (
  <Layout>
    <Helmet title={`Главная | ${config.siteTitle}`} />

    <section>
      <h1>Экс-граф? Плюш изъят. Бьём чуждый цен хвощ!</h1>
      <div>
        Эй, жлоб! Где туз? Прячь юных съёмщиц в шкаф. Любя, съешь щипцы, —
        вздохнёт мэр, — кайф жгуч. Аэрофотосъёмка ландшафта уже выявила земли
        богачей и процветающих крестьян. Съешь ещё этих мягких французских
        булок, да выпей [же] чаю. 1234567890.
      </div>
    </section>
  </Layout>
)

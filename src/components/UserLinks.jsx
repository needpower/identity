import React from "react"
import styled from "@emotion/styled"
import config from "../../data/SiteConfig"

const UserLinks = () => (
  <ContactsList>
    <h3>Как со мной связаться:</h3>
    {config.userLinks.map(link => (
      <ContactsListItem>
        <a href={link.url}>{link.label}</a>
        &nbsp;
        {link.description}
      </ContactsListItem>
    ))}
  </ContactsList>
)

const ContactsList = styled.section`
  padding: 1rem;
  background-color: #f5f5f5;
  h3 {
    margin-top: 0;
  }
`

const ContactsListItem = styled.p``

export default UserLinks

import React from "react"
import styled from "@emotion/styled"

const UserLinks = () => (
  <ContactsList>
    <h3>Как со мной связаться:</h3>
    <ContactsListItem>
      <a href="https://vk.com/id91858750">VKontakte</a>
    </ContactsListItem>
    <ContactsListItem>
      <a href="mailto:artemlyubchuk@mail.ru">Email</a>
      &nbsp;artemlyubchuk@mail.ru (лучше сюда, просматриваю регулярно)
    </ContactsListItem>
    <ContactsListItem>
      <a href="https://www.linkedin.com/in/artem-lyubchuk-88185414a/">
        LinkedIn
      </a>
    </ContactsListItem>
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

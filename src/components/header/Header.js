import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

//zonder curly brackets kan je query niet gebruiken
const Header = ({ siteTitle }) => {
  const {
      wpcontent: {menuItems},
  } = useStaticQuery(graphql`
  query{
    wpcontent {
    menuItems {
      edges {
        node {
          label
          path
        }
      }
    }
  }
  }
  `)
  console.log(menuItems, 'menu items')
return <div>Header</div>
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

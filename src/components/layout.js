/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, {useState} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Hamburger from "./header/Hamburger"
import OverlayMenu from "./header/OverlayMenu"
import Header from "./header/Header"
import "./layout.css"

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOverlayMenu = () => setMenuOpen(!menuOpen)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Hamburger handleOverlayMenu={handleOverlayMenu}/>
      <OverlayMenu handleOverlayMenu={handleOverlayMenu} menuOpen={menuOpen}/>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: "auto",
          padding: `0`,
          paddingBottom: "2rem",
        }}
      >
        <main>{children}</main>
       
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

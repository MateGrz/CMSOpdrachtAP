import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper, Image, BottomEdgeDown, BottomEdgeUp, Film} from "./pageStyles/pageStyles"
import {COLORS} from "../constants"

const IndexPage = () => {
  const {
    wpcontent:{
      page: {
        homeMeta: {
          homePageHeaderTitle,
          homePageDescription,
          homePageFeaturedProducts,
          homePageBannerFoto
        }
      }
    }
  } = useStaticQuery(graphql`
  query{
    wpcontent{
    page(id: "home", idType: URI) {
      homeMeta{
        homePageHeaderTitle
        homePageDescription
        homePageFeaturedProducts {
          ... on WPGraphql_Film {
            id
            filmMeta{
              title
              releaseDate
              distributedBy
              runningTime
              releasePoster {
                sourceUrl
                altText
                imageFile{
                  childImageSharp{
                    fluid(quality:100){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
        homePageBannerFoto{
          sourceUrl
          altText
          imageFile{
            childImageSharp{
              fluid(quality:100){
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
}
`)
  return (<Layout>
    <SEO title="Home" />
    <Wrapper>
      <div className="banner">
        <Image fluid={homePageBannerFoto.imageFile.childImageSharp.fluid} alt={homePageBannerFoto.altText}/>
        {/* <div className="inner-div">
          <p className="header-title">{homePageHeaderTitle}</p>
        </div> */}
        <BottomEdgeDown color={COLORS.BLACK}/>
      </div>
      <div className="description">
        <p>{homePageDescription}</p>
        <BottomEdgeUp color={COLORS.PRIMARY}/>
      </div>
      <div className="films">
        <h2>Featured Films</h2>
        <div className="film-items">
          {homePageFeaturedProducts.map(({filmMeta, slug})=> (
            <Film to={`/${slug}`}>
<Image fluid={filmMeta.releasePoster.imageFile.childImageSharp.fluid} altText={filmMeta.releasePoster.altText}/>
<div className="film-info">
  <p>{filmMeta.title}</p>
  <p>{filmMeta.distributedBy}</p>
</div>
            </Film>
          ))}
        </div>
      </div>
    </Wrapper>
  </Layout>
)}

export default IndexPage

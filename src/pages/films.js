import React from 'react'
import {useStaticQuery, graphql} from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {
    Wrapper,
    Image,
    BottomEdgeDown,
    BottomEdgeUp,
    Film,
} from "../pageStyles/pageStyles"
import {COLORS} from "../constants"

const FilmsPage = () => {
    const {
    wpcontent:{
        page:{
            productsMeta: {productsPageDescription, productsPageBannerPhoto},
    },
        films:{edges: films},
}} = useStaticQuery(graphql`
    query ArtistsPageQuery {
        wpcontent {
          page(id: "films", idType: URI) {
            productsMeta {
              productsPageDescription
              productsPageBannerPhoto {
                sourceUrl
                imageFile{
                    childImageSharp{
                    fluid(quality:75){
                        ...GatsbyImageSharpFluid_withWebp
                    }
                    }
                }
                altText
              }
            }
          }
          films {
            edges {
              node {
                filmMeta {
                    title
                    releaseDate
                    distributedBy
                    runningTime
                  releasePoster {
                    altText
                    sourceUrl
                    imageFile{
                      childImageSharp{
                        fluid(quality:50,grayscale:true){
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                  }
                }
                slug
              }
            }
          }
        }
      }
      
    `)
    return (
        <Layout>
            <SEO title="Films"/>
            <Wrapper filmsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
                <div className="banner">
                    <Image fluid={productsPageBannerPhoto.imageFile.childImageSharp.fluid}alt={productsPageBannerPhoto.altText}/>
                    <BottomEdgeDown color={COLORS.SECONDARY}/>
                </div>
                <div className="description">
                    <h2>CMS Taak</h2>
                    <p>{productsPageDescription}</p>
                    <BottomEdgeUp color={COLORS.BLACK}/>
                </div>
                <div className="films">
                    <h2>Our recommended films</h2>
                    <div className="film-items">
                        {films.map(({node: {filmMeta, slug}})=>(
                            <Film to={`/${slug}`} key={slug}>
                                <Image fluid={filmMeta.releasePoster.imageFile.childImageSharp.fluid} alt={filmMeta.releasePoster.altText}/>
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
    )
}
export default FilmsPage
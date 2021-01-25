import React from 'react'
import {graphql} from 'gatsby';
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import {Wrapper, Image} from './templateStyles/filmStyles'

const FilmTemplate = ({data:{
    wpcontent: {
        film: {
            filmMeta,
            genres: {edges: genres},
        },
    },
},
}) => {
    const {picture1} = filmMeta.releasePoster
    const pictures = {picture1}

    return (
        <Layout>
            <SEO title="Film"/>
            <Wrapper>
                <div className="film-container">
                <div className="film-image">
                    <Image fluid={filmMeta.releasePoster.imageFile.childImageSharp.fluid} alt={filmMeta.releasePoster.altText}/>
                    <div className ="genres">
                        {genres.map(({node: role}) => (
                            <div key={role.name} className="role">{role.name}</div>
                        ))}
                        </div>
                    </div>
                    <div className="film-info">
                        <h2>{filmMeta.title}</h2>
                        <h3>{filmMeta.distributedBy}</h3>
                        <p className="info">
                            <strong>Duration:</strong> {filmMeta.runningTime}
                        </p>
                        <p className="info">
                            <strong>Release:</strong> {filmMeta.releaseDate}
                        </p>
                    </div>
                </div>
            </Wrapper>
        </Layout>
    )
}

export default FilmTemplate

export const pageQuery = graphql`
query ($id: ID!) {
    wpcontent{	
        film(id: $id, idType: ID) {
		genres {
			edges {
				node {
					name
				}
			}
		}
		filmMeta {
       title
  	   releaseDate
    	 distributedBy
  		 runningTime
           releasePoster {
                sourceUrl
                altText
                imageFile{
                  childImageSharp{
                    fluid(quality:75){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
		}
		id
	}
}
}
`
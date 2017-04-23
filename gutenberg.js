"use latest"
import fetch from 'isomorphic-fetch'

export default function (ctx, done) {

  let poetryDb = 'http://poetrydb.org/author/William Shakespeare'
  let poetryOptions = {
    method: 'GET'
  }

  let shakespeareDb = 'https://api.graph.cool/simple/v1/shakespeare'
  let dbOptions = (poem) => {

    let text = ""
    poem.text.forEach( (line) => {
      text = text.concat(`\n${line}`)
    })
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          mutation {
            createPoem(
              author: "${poem.author}"
              title: "${poem.title}"
              lines: ${poem.linecount}
              text: "${text}"
            ) {
              id
            }
          }
        `
      })
    }
  }


  fetch(poetryDb, poetryOptions)
    .then(resp => resp.json())
    .then(json => {
      let poems = json
      poems.forEach( (poem) => {
        if (poem.lines.length < 40) {
          fetch(shakespeareDb, dbOptions(poem))
            .then(resp=>resp.json())
            .then(json => console.log(json))
            .catch(e => console.log(e))
        }
      })
    })



}

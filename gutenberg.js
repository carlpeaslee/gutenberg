"use latest"
import fetch from 'isomorphic-fetch'

export default function (ctx, done) {

  let poetryDb = 'http://poetrydb.org/author/William Shakespeare'
  let poetryOptions = {
    method: 'GET'
  }

  let shakespeareDb = 'https://api.graph.cool/simple/v1/shakespeare'
  let dbOptions = (poem) => {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `{
          mutation {
            createPoem(
              author: "${poem.author}"
              title: "${poem.title}"
              lines: ${poem.linecount}
              text: ${JSON.stringify(poem.lines)}
            )
          }
        }`
      })
    }
  }


  fetch(poetryDb, poetryOptions)
    .then(resp => resp.json())
    .then(json => {
      let poems = json.details
      console.log(poems)
      poems.forEach( (poem) => {
        if (poem.linecount < 50) {
          fetch(shakespeareDb, dbOptions(poem))
            .then(resp=>resp.json())
            .then(json => console.log(json))
            .catch(e => console.log(e))
        }
      })
    })



}

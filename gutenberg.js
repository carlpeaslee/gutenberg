"use latest"
import fetch from 'isomorphic-fetch'

export default function (ctx, done) {

  let poetryDb = 'http://poetrydb.org/author/William Shakespeare'
  let poetryOptions = {
    method: 'GET'
  }

  let shakespeareDb = 'https://api.graph.cool/simple/v1/shakespeare'
  let dbOptions = (poem) => {

    let json = JSON.stringify(poem.lines)
    json = json.replace('"', '\"')
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
              text: \\\"${json}\\\"
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
      console.log("poems", poems )
      poems.forEach( (poem) => {
        if (poem.lines.length < 40) {
          console.log(dbOptions(poem) )
          // fetch(shakespeareDb, dbOptions(poem))
          //   .then(resp=>resp.json())
          //   .then(json => console.log(json))
          //   .catch(e => console.log(e))
        }
      })
    })



}

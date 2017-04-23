"use latest"
import fetch from 'isomorphic-fetch'

export default function (ctx, done) {

  let top100 = 'https://www.gutenberg.org/browse/scores/top'
  let options = {
    method: 'GET'
  }

  fetch(top100, options)
    .then(resp => resp.text())
    .then(result => {
      console.log("result success")
      done(result)
    })
  .catch((e)=>{
    console.log("error")
    done(e)
  })

}

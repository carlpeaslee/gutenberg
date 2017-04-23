"use latest"
import fetch from 'isomorphic-fetch'

export default function (ctx, done) {

  let url = 'http://poetrydb.org/author/William Shakespeare'
  let options = {
    method: 'GET'
  }

  fetch(url, options)
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
      done(json)
    })



}

"use latest"
import fetch from 'node-fetch'

export default function (ctx, done) {

  let top100 = 'https://www.gutenberg.org/browse/scores/top'
  let options = {
    method: 'GET'
  }

  fetch(top100, options).then(resp => resp.json()).then(result => {
    console.log(result)
  })

  done('we done')
}
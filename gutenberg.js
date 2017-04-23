"use latest"
import jsdom from 'jsdom'

export default function (ctx, done) {

  let top100 = 'https://www.gutenberg.org/browse/scores/top'


  jsdom.env(
    top100,
    ["http://code.jquery.com/jquery.js"],
    function (err, window) {
      if (err) {
        done(err)
      }
      done(window)
    }
  )

}

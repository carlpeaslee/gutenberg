"use latest"
import jsdom from 'jsdom'

export default function (ctx, done) {

  let top100 = 'https://www.gutenberg.org/browse/scores/top'


  jsdom.env(
    {
      url: top100,
      scripts: ["http://code.jquery.com/jquery.js"],
      done: (err, window) => {
        console.log(window)
        let $ = window.$
        console.log("HN Links")
        $("td.title:not(:last) a").each(() => {
          console.log(" -", $(this).text())
        })
        done(window)
      }
    }
  )

}

const Mustache = require('mustache')
const fs = require('fs')

const DIR_NAME = './students/'
const MUSTACHE_MAIN = './main.mustache'

function generateReadMe() {
  let students = []
  const filenames = fs.readdirSync(DIR_NAME)
  filenames.forEach(function (filename) {
    if (filename === 'your_Id.txt') return

    const data = fs.readFileSync(DIR_NAME + filename, 'utf-8')
    const id = filename.split('.')[0]
    students.push({
      name: data,
      id,
    })
  })

  const studentsSorted = students.sort(function (a, b) {
    var nameA = a.name.toUpperCase()
    var nameB = b.name.toUpperCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  })

  fs.readFile(MUSTACHE_MAIN, (err, data) => {
    if (err) throw err
    const output = Mustache.render(data.toString(), {
      students: studentsSorted,
    })
    fs.writeFileSync('README.md', output)
  })
}

generateReadMe()

const http = require('http')
const fs = require('fs')
const path = require('path') // для формирования корректных путей

const PORT = 3000

const server = http.createServer((req, res) => {
    console.log('server req')

    res.setHeader('Content-Type', 'text/html')

    const createPath = (page) => path.resolve(__dirname, 'pages', `${page}`)
    // для чего: некоторые файловые системы используют прямую косую черту, а некоторые обратную!
    let basePath = ''

    // базовая имплементация роутинга
    switch (req.url) {
        case '/':
        case '/main':
        case '/home':
        case '/page':
            basePath = createPath(`base.json`)
            res.statusCode = 200
            break
        case '/page4':
            basePath = createPath('page4.html')
            res.statusCode = 200
            break
        case '/page1':
            basePath = createPath('page1.html')
            res.statusCode = 200
            break
        case '/page2':
            res.statusCode = 301
            res.setHeader('Location', '/fixing')
            res.end()
        case '/fixing':
            basePath = createPath('fixing.html')
            res.statusCode = 200
            break
        default:
            basePath = createPath('error.html')
            res.statusCode = 404
            break
    }

    fs.readFile(basePath, (err, data) => {
        if (err) {
            console.log(err)
            res.statusCode = 500 //Внутренняя серверная ошибка
            res.end()
        }
        else {
            res.write(data)
            res.end()
        }
    })

})

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})
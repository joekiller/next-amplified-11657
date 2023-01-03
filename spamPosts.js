const fs = require('fs');
const fsPromises = fs.promises;
const http = require('node:http');

/**
 * post a todo
 * @param {Todo} todo
 * @param {string} steamid
 * @return {Promise<void>}
 */
async function post(todo) {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: `/api/todo`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            const buffer = [];
            res.on('data', (d) => {
                buffer.push(d)
            });
            res.on('end', () => {
                if(res.statusCode !== 200) {
                    console.log('statusCode:', res.statusCode);
                    console.log(req.path);
                }
                resolve(buffer.toString());
            });
        }).on('error', (e) => {
            reject(e);
        });
        req.write(JSON.stringify(todo));
        req.end();
    })
}

/**
 * clobber the api
 * @return {Promise<void>}
 */
async function mainSpam() {
    const started = new Date();
    const contents = JSON.parse(await fsPromises.readFile('generated-data.json', 'utf8'));
    for (const todoIdx of Object.keys(contents)) {
        const result = await post(contents[todoIdx]);
        console.log(result);
    }
    const finished = new Date();
    console.log("started", started)
    console.log("finished", finished)
    console.log("took", Math.floor((finished.getTime() - started.getTime())/1000))
}

mainSpam().catch(e => console.error(e));
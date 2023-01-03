const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

async function saveFile(f, data) {
    return new Promise((r, e) => {
        fs.writeFile(f, data, (err) => {
            if (err) e(err);
            console.log(`saved ${f}`);
            r(data);
        })
    });
}

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function generateTodos() {
    return {
        id: uuidv4(),
        name: makeid(48),
        description: makeid(4096)
    }
}

async function main() {
    const data = [];
    for ( var i = 0; i < 6000; i++ ) {
        data.push(generateTodos())
    }
    await saveFile('generated-data.json', JSON.stringify(data));
}

main().catch((e) => console.error(e))
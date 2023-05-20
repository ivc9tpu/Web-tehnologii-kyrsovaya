const allowed = [
    '-','_'
]

function allowedToString() {
    let str = ''
    allowed.forEach(c => {
        str = str + '\'' + c +'\','
    });

    str.slice(0, str.length - 1)
    return str
}

function isInAlphabet(c) {
    const res = (c.toLowerCase() >= 'a' &
    c.toLowerCase() <= 'z')
    //console.log('isInAlphabet: ' + res)
    return res
}

function isInNumber(c) {
    const res =  (c >= '0' & c <= '9')
    //console.log('isInNumber: ' + res)
    return res
}

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        let {username} = req.body
        //console.log(username)
        if (username.length < 4 || username.length > 20) {
            return res.status(400).json({error:{message:'Имя пользователя должно содержать от 4 до 20 символов'}})
        }

        for(let i = 0; i < username.length; i++) {
            //console.log(username[i] + ' >> ')
            //const bool1 = allowed.includes(username[i])
            //console.log('allowed.includes(username[i]): ' + bool1)
            if (!(allowed.includes(username[i]) ||
                isInAlphabet(username[i]) ||
                isInNumber(username[i]))) {
                    return res.status(400).json({error:{message: 'Имя пользователя может содержать: буквы английского алфавита, цифры и спецсимволы (' + allowedToString() + ')'}})
                }
            }
        next()
    } catch(e) {
        console.log(e)
        return res.status(403).json({error: {message: "Внутренняя ошибка сервера"}})
    }
}
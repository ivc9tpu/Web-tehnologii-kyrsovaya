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
    return (c.toLowerCase() >= 'a' &
    c.toLowerCase() <= 'z')
}

function isInNumber(c) {
    return (c >= '0' & c <= '9')
}

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        let {password} = req.body
        //console.log(password)
        if (password.length < 4 || password.length > 20) {
            return res.status(400).json({error:{message:'Пароль должен содержать от 4 до 20 символов'}})
        }
        
        for(let i = 0; i < password.length; i++) {
            if (!(allowed.includes(password[i]) ||
                isInAlphabet(password[i]) ||
                isInNumber(password[i]))) {
                    return res.status(400).json({error:{message: 'Пароль может содержать: буквы английского алфавита, цифры и спецсимволы (' + allowedToString() + ')'}})
            }
        }

        next()
    } catch(e) {
        console.log(e)
        return res.status(403).json({error: {message: "Внутренняя ошибка сервера"}})
    }
}
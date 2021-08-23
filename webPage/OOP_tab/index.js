var that1, that2, li
var li_num = 0
class Body {
    constructor() {
        this.header = document.querySelector('#header')
        this.doing = document.querySelector('#doing')
        this.notes = document.querySelector('#notes')
        this.num = this.doing.querySelector('span:last-child')

        this.ifHideNote()
        window.onscroll = this.backImgfixed
    }
    ifHideNote() {
        if (this.num.innerHTML === '0') {
            doing.style.display = 'none'
        }
        else if (this.num.innerHTML !== '0') {
            doing.style.display = 'block'
        }
    }
    backImgfixed() {
        document.body.style.backgroundPositionY = document.documentElement.scrollTop + 'px'
    }
}

class Note extends Body {
    constructor() {
        super()
        that1 = this

        this.li = []
    }
    init() {
        this.li = that1.notes.querySelectorAll('li')
        this.num.innerHTML = this.li.length + ''
        for (var i = 0; i < this.li.length; i++) {
            this.li[i].index = i
        }
    }
    bindEvent() {
        this.li.forEach(function (item, i) {
            item.index = i
            item.querySelector('.fr').onclick = that1.removeNote
            item.onanimationend = function () {
                this.className = ''
            }
        })
    }
    
    updateNote() {
        this.init()
        this.bindEvent()
        this.li.forEach(function (item, i) {
            item.className = (i === 0 ? 'currentLi' : 'downLi')
        })
        this.ifHideNote()
    }
    removeNote() {
        var idx = this.parentNode.index
        that1.li.forEach(function (item, i) {
            if (i >= idx) {
                item.className = (i === idx ? 'removeLi' : 'upLi')
            }
            if (i === idx) {
                item.onanimationend = function () {
                    that1.li[idx].remove()
                    that1.init()
                    that1.bindEvent()
                    that1.ifHideNote()
                }
            }
        })         
    }
}

class Input extends Note {
    constructor() {
        super()
        that2 = this

        this.addText = this.header.querySelector('span')
        this.addText.onclick = this.addNote
        this.inputText = this.header.querySelector('input')
        this.inputText.onkeyup = function (e) {
            if (e.code === 'Enter') {
                that2.addNote()
            }
        }
    }
    addNote() {
        var str = that2.inputText.value
        if (str === '') {
            alert('输入不能为空')
            return
        }
        var li = '<li><span>' + str + '</span><span class="fr"></span></li>'
        that1.notes.querySelector('ol').insertAdjacentHTML('afterbegin', li)
        that1.updateNote()
        that2.clearInput()
    }
    clearInput() {
        that2.inputText.value = ''
    }
}

new Body()
new Note()
new Input()
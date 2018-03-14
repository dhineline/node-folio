//GRAB THE CSS AND TRANSPILE AND BUNDLE IT TOO
import './../scss/app.scss'

//ie10 viewport hack for surface/desktop windows 8
import './ie10-viewport-bug-workaround'


let testFunction = (msg) => {
  console.log(msg)
}

testFunction('bundle being created');

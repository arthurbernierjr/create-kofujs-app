import {
  Komponent,
  render
} from "../../framework/lib/kofu-framework/index.js";

class Example extends Komponent{
  constructor (props)  {
    super (props)
    const styles = {
      mainPageHeading: {
        backgroundColor: 'red'
      }
    }
    this.classes = this.setStyles(styles).classes
  }

  komponentDidMount () {
    console.log('Hello world')
  }

  present () {
    return (
        <h1 className={`${this.classes.mainPageHeading}`}> Hello World</h1>
    )
  }
}

render(<Example />, document.getElementById('app'))

import { Komponent , render} from 'kofujs'

const styles = {
  mainPageHeading: {
    backgroundColor: 'red'
  }
}

class Example extends Komponent{
  constructor (props)  {
    super (props)

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
